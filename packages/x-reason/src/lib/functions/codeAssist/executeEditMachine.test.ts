import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

// Mock ts-morph BEFORE importing SUT.
jest.mock('ts-morph', () => {
    const real = jest.requireActual('ts-morph');
    class MockProject extends real.Project {
        constructor(options?: any) {
            // Force in-memory FS; avoid any real tsconfig reads.
            super({
                useInMemoryFileSystem: true,
                manipulationSettings: options?.manipulationSettings,
            });
        }
    }
    return { ...real, Project: MockProject };
});

import { Project, SourceFile } from 'ts-morph';
// Adjust this to your actual path:
import { executeEditMachine } from './executeEditMachine';
import type { EditOp, ApplyResult } from '@codestrap/developer-foundations-types';

// --- helpers to avoid the “implicit any on this” & shadowing errors --
function makeAddSourceFileAtPathMock(baseDir: string, VFS: Record<string, string>) {
    // Explicit `this` annotation silences TS2683 and keeps correct call-site binding.
    return function addSourceFileAtPathMock(
        this: Project,
        abs: string
    ): SourceFile {
        const rel = path.posix.normalize(path.relative(baseDir, abs).replace(/\\/g, '/'));
        const txt = VFS[abs] ?? VFS[rel];
        if (txt == null) throw new Error(`Test VFS missing source for: ${abs}`);
        // Use the real instance method on the mocked Project instance.
        return (this as any).createSourceFile(abs, txt, { overwrite: true });
    };
}

describe('executeEditMachine (mocked FS, in-memory ts-morph)', () => {
    const baseDir = '/virtual';
    const fileRel = 'src/mod.ts';
    const fileAbs = path.resolve(baseDir, fileRel);

    const seed = `
import { something } from 'x';
export interface User { id: string }
type Status = 'Active' | 'Suspended';
const cfg = { version: 'v0' }
export function add(a: number, b: number): number { return a + b; }
export class Greeter { greet(name: string) { return 'hi ' + name } }
const hidden = 1;
`;

    const VFS: Record<string, string> = {
        [fileRel]: seed,
        // [fileAbs]: seed, // also ok if you prefer absolute key
    };

    let existsSpy: jest.SpyInstance;
    let readSpy: jest.SpyInstance;
    let writeSpy: jest.SpyInstance;
    let addSourceSpy: jest.SpyInstance;
    let saveSpy: jest.SpyInstance;
    let prettierSpy: jest.SpyInstance;

    beforeEach(() => {
        // Only acknowledge existence of our single virtual file.
        existsSpy = jest.spyOn(fs, 'existsSync').mockImplementation((p: fs.PathLike) => {
            return path.resolve(String(p)) === fileAbs;
        });
        // Block any accidental disk access.
        readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error('readFileSync should not be called');
        });
        writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('writeFileSync should not be called');
        });

        // Hydrate from our VFS instead of disk.
        addSourceSpy = jest
            .spyOn(Project.prototype as any, 'addSourceFileAtPath')
            .mockImplementation(makeAddSourceFileAtPathMock(baseDir, VFS) as any);

        // No-op save (still lets us assert call counts).
        saveSpy = jest.spyOn(Project.prototype as any, 'save').mockResolvedValue(undefined);

        // Let prettier run but return identity; assert it was called with our virtual filepath.
        prettierSpy = jest.spyOn(prettier, 'format').mockImplementation((text: string) => text);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('applies ops fully in-memory with mocked FS and is idempotent', async () => {
        const ops: EditOp[] = [
            { kind: 'ensureImport', file: fileRel, from: 'zod', names: ['z'] },
            {
                kind: 'insertInterfaceProperty',
                file: fileRel,
                interfaceName: 'User',
                propertySig: 'email?: string',
            },
            { kind: 'addUnionMember', file: fileRel, typeName: 'Status', member: "'Deleted'" },
            {
                kind: 'upsertObjectProperty',
                file: fileRel,
                exportName: 'cfg',
                key: 'enabled',
                valueExpr: 'true',
            },
            {
                kind: 'replaceFunctionBody',
                file: fileRel,
                exportName: 'add',
                body: '{ return a - (-b); }',
            },
            { kind: 'ensureExport', file: fileRel, name: 'hidden' },
            { kind: 'renameSymbol', file: fileRel, oldName: 'Greeter', newName: 'Speaker' },
        ];

        // First run — should change once and call save once
        const res1: ApplyResult = await executeEditMachine(ops, {
            baseDir,
            tsconfigPath: '/virtual/tsconfig.json', // ignored by mocked Project
            dryRun: false,
            write: true,
            format: true,
            onLog: (msg: string) => { console.log(msg) },
        } as any);

        // FS sanity: existence checked once for that file, no reads/writes
        expect(existsSpy).toHaveBeenCalledTimes(1);
        expect(existsSpy).toHaveBeenCalledWith(fileAbs);
        expect(readSpy).not.toHaveBeenCalled();
        expect(writeSpy).not.toHaveBeenCalled();

        // ts-morph hydrated from VFS
        expect(addSourceSpy).toHaveBeenCalledTimes(1);
        expect(addSourceSpy).toHaveBeenCalledWith(fileAbs);

        // prettier used with our virtual path
        expect(prettierSpy).toHaveBeenCalled();
        const prettierOpts = prettierSpy.mock.calls[0]?.[1] ?? {};
        expect(prettierOpts).toMatchObject({ filepath: fileAbs });

        // one save on first run
        expect(saveSpy).toHaveBeenCalledTimes(1);

        // outputs
        expect(res1.diagnosticsText).toBeNull();
        expect(res1.changedFiles).toEqual([fileAbs]);

        const diff1 = res1.diffByFile[fileAbs]!;
        expect(diff1).toContain(`+++ ${fileAbs}`);
        expect(diff1).toMatch(/import\s*\{\s*z\s*\}\s*from 'zod'/);
        expect(diff1).toMatch(/interface\s+User[\s\S]*email\?:\s*string/);
        expect(diff1).toMatch(/type\s+Status[\s\S]*'Deleted'/);
        expect(diff1).toMatch(/const\s+cfg\s*=\s*\{[\s\S]*enabled:\s*true/);
        expect(diff1).toMatch(/export function add\([\s\S]*\)\s*:\s*number\s*\{[\s\S]*return a - \(-b\);/);
        expect(diff1).toMatch(/class\s+Speaker\b/);
        expect(diff1).toMatch(/export\s+const\s+hidden\s*=/);

        // Second run — idempotent: no changes and no extra save
        const res2: ApplyResult = await executeEditMachine(ops, {
            baseDir,
            tsconfigPath: '/virtual/tsconfig.json',
            dryRun: false,
            write: true,
            format: true,
            onLog: (msg: string) => { console.log(msg) },
        } as any);

        expect(existsSpy).toHaveBeenCalledTimes(1); // still only one exists check total
        expect(saveSpy).toHaveBeenCalledTimes(1);   // no second save
        expect(res2.changedFiles).toHaveLength(0);
        expect(res2.diffByFile[fileAbs]).toBeUndefined();
        expect(res2.diagnosticsText).toBeNull();
    });
});
