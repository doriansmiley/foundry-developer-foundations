// src/render/markdown.ts
import { ReadmeInputForTemplate } from '@codestrap/developer-foundations-types';
import * as fs from 'fs';
import * as path from 'path';

function escPipes(s: string | undefined | null): string {
        if (!s) return '';
        return String(s).replace(/\|/g, '\\|');
}

function readTextSafe(p?: string): string | undefined {
        if (!p) return;
        try {
                return fs.readFileSync(p, 'utf8');
        } catch {
                return;
        }
}

function codeFenceFor(p: string): string {
        const ext = path.extname(p).toLowerCase();
        if (ext === '.json') return 'json';
        if (ext === '.ts' || ext === '.cts' || ext === '.mts') return 'ts';
        if (ext === '.js' || ext === '.cjs' || ext === '.mjs') return 'js';
        if (ext === '.yaml' || ext === '.yml') return 'yaml';
        if (ext === '.md') return 'md';
        return ''; // plaintext
}

type EnvKey = { name: string; description?: string };

// Parse .env-style content → keys only (no values), take trailing `# comment` as description if present
function parseEnvKeys(content: string): EnvKey[] {
        const out: EnvKey[] = [];
        const lines = content.split(/\r?\n/);
        for (const raw of lines) {
                const line = raw.trim();
                if (!line || line.startsWith('#')) continue;
                // Allow KEY=..., KEY: ..., export KEY=...
                const m = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*[:=]/.exec(line);
                if (m) {
                        const name = m[1];
                        // trailing comment after a space:  VAR=val  # desc
                        const cm = /#\s*(.+)$/.exec(line);
                        out.push({ name, description: cm ? cm[1].trim() : undefined });
                }
        }
        return out;
}

export function renderReadme(input: ReadmeInputForTemplate): string {
        // Optional hints (if your assembler adds them):
        const entryFile = (input as any).entryFile as string | undefined;
        const entryExportedFunctions =
                (input as any).entryExportedFunctions as string[] | undefined;

        // Normalize with fallbacks
        const apiSurface = Array.isArray(input.apiSurface) ? input.apiSurface : [];
        const envTable = Array.isArray(input.envTable) ? input.envTable : [];
        const workedSFT = Array.isArray(input.workedSFT) ? input.workedSFT : [];
        const practiceRL = Array.isArray(input.practiceRL) ? input.practiceRL : [];
        const synthGen = Array.isArray(input.syntheticGenerators) ? input.syntheticGenerators : [];
        const gapsAQ = Array.isArray(input.gapsAndQuestions) ? input.gapsAndQuestions : [];
        const nx = input.nxSummary ?? null;
        const cfg = input.projectConfig ?? undefined;

        // ---- PUBLIC API (functions exported by entry) ----
        // Prefer exact list from `entryExportedFunctions`; else fallback to all `function` exports.
        let publicFns = apiSurface.filter((e) => e.kind === 'function');

        if (entryExportedFunctions && entryExportedFunctions.length) {
                const set = new Set(entryExportedFunctions);
                publicFns = publicFns.filter((e) => set.has(e.name));
        } else if (entryFile) {
                // Heuristic: include functions whose symbol ultimately flows through the entry module.
                // If your extractor sets e.sourceFile, allow different sourceFile (re-export), but keep functions that were marked exportedViaEntry=true if present.
                publicFns = publicFns.filter((e: any) =>
                        e.exportedViaEntry === true ||
                        e.sourceFile === entryFile
                );
                // If nothing remains after heuristic, keep all functions (so the section doesn’t go empty).
                if (!publicFns.length) {
                        publicFns = apiSurface.filter((e) => e.kind === 'function');
                }
        }

        const apiRows = publicFns
                .map((e) => {
                        const sig = e.signature ? `\`${escPipes(e.signature)}\`` : '';
                        const doc = e.jsDoc ? escPipes(e.jsDoc).replace(/\s+/g, ' ') : '';
                        return `| \`${escPipes(e.name)}\` | ${escPipes(e.kind)} | ${sig} | ${doc} |`;
                })
                .join('\n');

        // ---- ENV VAR TABLE (code usage) ----
        const envRows = envTable.map((v) => {
                const files = Array.isArray(v.files) ? v.files.map((f) => `\`${escPipes(f)}\``).join('<br/>') : '';
                return `| \`${escPipes(v.name)}\` | ${v.required ? 'yes' : 'no'} | ${escPipes(v.defaultValue)} | ${files} | ${escPipes(v.notes)} |`;
        }).join('\n');

        const worked = workedSFT
                .map((w) => `- **${escPipes(w.title)}** — _${escPipes(w.file)}_`)
                .join('\n');

        const toolTasks = Array.isArray(input.toolCallingTasks) ? input.toolCallingTasks : [];
        const practice = `
${toolTasks.length ? toolTasks.map(t =>
                `**Q:** ${t.question}
**A:**
\`\`\`typescript
${t.answerCode}
\`\`\`
${t.notes ? `> _${t.notes}_` : ''}`
        ).join('\n\n')
                        : '_No practice tasks synthesized._'
                }
`.trim();

        const synth = synthGen.map((g) => {
                const params = Object.entries(g.params ?? {}).map(([k, v]) => `\`${escPipes(k)}\`=${escPipes(v)}`).join(', ');
                const oracle = g.oracleDescription ? `\n  - Oracle: ${escPipes(g.oracleDescription)}` : '';
                return `- **${escPipes(g.name)}** — ${escPipes(g.description)}\n  - Params: ${params}${oracle}`;
        }).join('\n');

        // ---- Nx summary ----
        const nxBlock = nx
                ? `**Project:** \`${escPipes(nx.projectName)}\`\n\n- Depends on: ${(nx.dependencies || []).length
                        ? nx.dependencies.map((d) => `\`${escPipes(d)}\``).join(', ')
                        : '_none_'
                }\n- Dependents: ${(nx.dependents || []).length
                        ? nx.dependents.map((d) => `\`${escPipes(d)}\``).join(', ')
                        : '_none_'
                }\n${nx.notes ? escPipes(nx.notes) : ''}`
                : '_No Nx graph available._';

        const gaps = gapsAQ.length ? gapsAQ.map((g) => `- ${escPipes(g)}`).join('\n') : '_None_';

        // ---- Project configuration & inline contents ----
        const pkg = cfg?.packageJson;
        const depCount = pkg
                ? Object.keys(pkg.dependencies || {}).length
                + Object.keys(pkg.devDependencies || {}).length
                + Object.keys(pkg.peerDependencies || {}).length
                : 0;

        const pkgHeader = pkg
                ? [
                        `**package.json**: \`${escPipes(pkg.path)}\``,
                        `- name: \`${escPipes(pkg.name) || '-'}\``,
                        `- version: \`${escPipes(pkg.version) || '-'}\``,
                        `- private: \`${pkg.private ?? false}\``,
                        `- scripts: ${pkg.scripts && Object.keys(pkg.scripts).length
                                ? Object.keys(pkg.scripts).slice(0, 12).map((s) => `\`${escPipes(s)}\``).join(', ')
                                : '_none_'
                        }`,
                        `- deps: ${depCount}`,
                ].join('\n')
                : '_No package.json found._';

        const pkgContents = pkg?.path ? readTextSafe(pkg.path) : undefined;
        const pkgBlock = pkgContents
                ? `\n**contents**\n\`\`\`${codeFenceFor(pkg.path)}\n${pkgContents.trim()}\n\`\`\``
                : '';

        const tsBlocks = (cfg?.tsconfigs || []).map((t) => {
                const co: any = t.compilerOptions || {};
                const pathsKeys = co.paths ? Object.keys(co.paths).length : 0;
                const head = `- \`${escPipes(t.path)}\`${t.extends ? ` (extends: \`${escPipes(t.extends)}\`)` : ''} — baseUrl: \`${escPipes(co.baseUrl) || '-'}\`, target: \`${escPipes(co.target) || '-'}\`, module: \`${escPipes(co.module) || '-'}\`, paths: ${pathsKeys}`;
                const txt = readTextSafe(t.path);
                const body = txt ? `\n\`\`\`${codeFenceFor(t.path)}\n${txt.trim()}\n\`\`\`` : '';
                return `${head}${body}`;
        }).join('\n') || '_No tsconfig files found._';

        const pj = cfg?.projectJson;
        const pjHeader = pj
                ? `**project.json**: \`${escPipes(pj.path)}\`
- name: \`${escPipes(pj.name) || '-'}\`, sourceRoot: \`${escPipes(pj.sourceRoot) || '-'}\`, tags: ${(pj.tags || []).length ? pj.tags.map((t) => `\`${escPipes(t)}\``).join(', ') : '_none_'
                }
- targets: ${(pj.targets || []).length ? pj.targets.map((t) => `\`${escPipes(t)}\``).join(', ') : '_none_'}`
                : '_No project.json found._';
        const pjContents = pj?.path ? readTextSafe(pj.path) : undefined;
        const pjBlock = pjContents ? `\n**contents**\n\`\`\`${codeFenceFor(pj.path)}\n${pjContents.trim()}\n\`\`\`` : '';

        const jestBlocks = (cfg?.jestConfigs || []).length
                ? cfg!.jestConfigs!.map((pth) => {
                        const txt = readTextSafe(pth);
                        const head = `- \`${escPipes(pth)}\``;
                        const body = txt ? `\n\`\`\`${codeFenceFor(pth)}\n${txt.trim()}\n\`\`\`` : '';
                        return `${head}${body}`;
                }).join('\n')
                : '_No Jest config found._';

        const eslintBlocks = (cfg?.eslintConfigs || []).length
                ? cfg!.eslintConfigs!.map((pth) => {
                        const txt = readTextSafe(pth);
                        const head = `- \`${escPipes(pth)}\``;
                        const body = txt ? `\n\`\`\`${codeFenceFor(pth)}\n${txt.trim()}\n\`\`\`` : '';
                        return `${head}${body}`;
                }).join('\n')
                : '_No ESLint config found._';

        // Environment files: list keys (no values)
        const envFilesBlocks = (cfg?.envFiles || []).length
                ? cfg!.envFiles!.map((pth) => {
                        const txt = readTextSafe(pth) || '';
                        const keys = parseEnvKeys(txt);
                        const table = keys.length
                                ? `\n| variable | description |\n|---|---|\n${keys.map(k => `| \`${escPipes(k.name)}\` | ${escPipes(k.description) || ''} |`).join('\n')}`
                                : '\n_No variables detected in this file._';
                        return `- \`${escPipes(pth)}\`\n${table}`;
                }).join('\n')
                : '_No .env files detected._';

        const projectConfigSection = `
## Project Configuration <!-- anchor: project_configuration -->

${pkgHeader}${pkgBlock}

### TypeScript Configs
${tsBlocks}

### Nx Project
${pjHeader}${pjBlock}

### Jest
${jestBlocks}

### ESLint
${eslintBlocks}

### Environment Files
${envFilesBlocks}
`.trim();

        const overview = input.expositionMd?.trim() || '_Overview pending._';

        return [
                `# Overview\n\n${overview}`,

                `## Quickstart (Worked Examples) <!-- anchor: worked_examples -->
${worked || '_No worked examples detected._'}`,

                `## Public API (Exports) <!-- anchor: public_api -->
| export | kind | signature | description |
|---|---|---|---|
${apiRows || '| _none_ | _ | _ | _ |'}`,

                `## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._`,

                `## Configuration & Environment <!-- anchor: configuration_env -->
| name | required | default | files | notes |
|---|---|---|---|---|
${envRows || '| _none_ | _ | _ | _ | _ |'}`,

                projectConfigSection,

                `## Dependency Topology (Nx) <!-- anchor: deps_topology -->
${nxBlock}`,

                `## Import Graph (File-level) <!-- anchor: import_graph -->
_Text-only representation intentionally omitted in this version; agents can walk files from API surface._`,

                `## Practice Tasks (for Agents/RL) <!-- anchor: practice_tasks -->
${practice || '_No practice tasks synthesized._'}`,

                `## Synthetic Variations <!-- anchor: synthetic_variations -->
${synth || '_No generators proposed._'}`,

                `## Guardrails & Quality <!-- anchor: guardrails_quality -->
_Include test coverage & invariants if available (future enhancement)._`,

                `## Open Questions / Needs from Engineer <!-- anchor: questions_for_engineer -->
${gaps}`,

                `## Appendix <!-- anchor: appendix -->
- Stable section anchors provided for agent navigation.
- IDs: Prefer path-based IDs for files and export names for API items.`
        ].join('\n\n');
}
