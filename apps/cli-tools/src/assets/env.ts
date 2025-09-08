// src/analyzers/env.ts
import * as fs from 'fs';
import * as path from 'path';
import { EnvVar } from '@codestrap/developer-foundations-types';

function walk(dir: string, acc: string[] = []): string[] {
    const ents = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of ents) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
            walk(p, acc);
        } else {
            if (/\.(t|j)sx?$/.test(p)) acc.push(p);
        }
    }
    return acc;
}

export function discoverEnv(projectRoot: string): EnvVar[] {
    const vars = new Map<string, EnvVar>();
    const files = walk(projectRoot);

    for (const f of files) {
        const text = fs.readFileSync(f, 'utf8');
        const rx = /process\.env\.([A-Z0-9_]+)/g;
        let m: RegExpExecArray | null;
        const seenInFile = new Set<string>();
        while ((m = rx.exec(text))) {
            const name = m[1];
            if (!vars.has(name)) {
                vars.set(name, { name, required: false, files: [], notes: undefined });
            }
            if (!seenInFile.has(name)) {
                vars.get(name)!.files.push(f);
                seenInFile.add(name);
            }
        }
        // naive "required" heuristic: if code throws when missing
        if (/process\.env\.[A-Z0-9_]+\s*==\s*undefined|throw\s+new\s+Error\(.+env/i.test(text)) {
            for (const v of seenInFile) {
                vars.get(v)!.required = true;
            }
        }
    }

    // default values heuristic: look for `?? 'value'` directly after env
    for (const [name, ev] of vars.entries()) {
        for (const f of ev.files) {
            const text = fs.readFileSync(f, 'utf8');
            const rx = new RegExp(`process\\.env\\.${name}\\s*\\?\\?\\s*(['"\`])(.*?)\\1`);
            const m = rx.exec(text);
            if (m) {
                ev.defaultValue = ev.defaultValue ?? m[2];
            }
        }
    }

    return Array.from(vars.values()).sort((a, b) => a.name.localeCompare(b.name));
}
