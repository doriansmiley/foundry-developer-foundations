// src/machine/readmeMachine.ts
import { Machine, assign } from 'xstate';
import { Ctx } from '@codestrap/developer-foundations-types';
import { findOwningProject, readNxDeps } from '../assets/nxGraph';
import { buildProgramGraph } from '../assets/tsProgram';
import { extractPublicApi } from '../assets/exports';
import { discoverWorkedExamples, toPracticeProblems } from '../assets/workedExamples';
import { discoverEnv } from '../assets/env';
import { assembleReadmeContext } from '../assets/context';
import { renderReadme } from '../assets/markdown';

type Ev =
    | { type: 'START' }
    | { type: 'ENGINEER_INPUT'; payload: string }
    | { type: 'RETRY' }
    | { type: 'CANCEL' };

export const readmeMachine = Machine<Ctx, any, Ev>({
    id: 'readme',
    initial: 'init',
    states: {
        init: {
            on: { START: 'owningProject' },
        },

        // Use async/Promise services for one-shot work; rely on onDone/onError
        owningProject: {
            invoke: {
                src: async (ctx) => {
                    const found = findOwningProject(ctx.entryFile);
                    if (!found) throw new Error('Could not find owning Nx project for entry file.');
                    ctx.projectRoot = found.projectRoot;

                    // crude repoRoot fallback: go two directories up from projectRoot; else cwd
                    const repoRoot =
                        found.projectRoot.split('/').slice(0, -2).join('/') || process.cwd();

                    ctx.nx = readNxDeps(found.projectName, repoRoot);
                },
                onDone: 'resolveProgram',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        resolveProgram: {
            invoke: {
                src: async (ctx) => {
                    const pg = buildProgramGraph(ctx.entryFile, ctx.tsconfigPath);
                    ctx.importTree = pg.importTree;
                    ctx.files = pg.files;
                },
                onDone: 'extractApi',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        extractApi: {
            invoke: {
                src: async (ctx) => {
                    ctx.apiSurface = extractPublicApi(ctx.files);
                },
                onDone: 'discoverExamples',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        discoverExamples: {
            invoke: {
                src: async (ctx) => {
                    const ex = discoverWorkedExamples(ctx.projectRoot || process.cwd());
                    ctx.worked = ex;
                    ctx.practice = toPracticeProblems(ex);
                },
                onDone: 'discoverEnv',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        discoverEnv: {
            invoke: {
                src: async (ctx) => {
                    ctx.env = discoverEnv(ctx.projectRoot || process.cwd());
                },
                onDone: 'synthesize',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        synthesize: {
            invoke: {
                src: async (ctx) => {
                    const readmeCtx = {
                        entry: {
                            entryFile: ctx.entryFile,
                            projectRoot: ctx.projectRoot || process.cwd(),
                            tsconfigPath: ctx.tsconfigPath,
                        },
                        files: ctx.files,
                        importTree: ctx.importTree,
                        nx: ctx.nx || null,
                        env: ctx.env,
                        worked: ctx.worked,
                        practice: ctx.practice,
                        exposition: { purpose: 'Auto-generated; refine with engineer input.' },
                        unknowns: [],
                    };
                    ctx.readmeInput = await assembleReadmeContext(
                        ({} as unknown) as any,
                        readmeCtx,
                        { askUserIfInsufficient: true }
                    );
                },
                onDone: 'render',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        render: {
            invoke: {
                src: async (ctx) => {
                    ctx.readmeMarkdown = renderReadme(ctx.readmeInput!);
                },
                onDone: 'done',
                onError: {
                    target: 'error',
                    actions: assign({ error: (_: Ctx, e: any) => String(e.data || e) }),
                },
            },
        },

        error: {
            on: { RETRY: 'init', CANCEL: 'done' },
        },

        done: { type: 'final' },
    },
});
