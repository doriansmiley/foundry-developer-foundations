// src/render/markdown.ts
import { ReadmeInputForTemplate } from '@codestrap/developer-foundations-types';

export function renderReadme(input: ReadmeInputForTemplate): string {
    const apiRows = input.apiSurface.map(e => {
        const sig = e.signature ? `\`${e.signature}\`` : '';
        const doc = e.jsDoc ? e.jsDoc.replace(/\s+/g, ' ') : '';
        return `| \`${e.name}\` | ${e.kind} | ${sig} | ${doc} |`;
    });

    const envRows = input.envTable.map(v => {
        const files = v.files.map(f => `\`${f}\``).join('<br/>');
        return `| \`${v.name}\` | ${v.required ? 'yes' : 'no'} | ${v.defaultValue ?? ''} | ${files} | ${v.notes ?? ''} |`;
    });

    const worked = input.workedSFT.map(w => `- **${w.title}** — _${w.file}_`).join('\n');
    const practice = input.practiceRL.map(p => `- **${p.title}** — ${p.description}`).join('\n');
    const synth = input.syntheticGenerators.map(g =>
        `- **${g.name}** — ${g.description}\n  - Params: ${Object.entries(g.params).map(([k, v]) => `\`${k}\`=${v}`).join(', ')}${g.oracleDescription ? `\n  - Oracle: ${g.oracleDescription}` : ''}`
    ).join('\n');

    const nx = input.nxSummary
        ? `**Project:** \`${input.nxSummary.projectName}\`\n\n- Depends on: ${input.nxSummary.dependencies.map(d => `\`${d}\``).join(', ') || '_none_'}\n- Dependents: ${input.nxSummary.dependents.map(d => `\`${d}\``).join(', ') || '_none_'}\n${input.nxSummary.notes ?? ''}`
        : '_No Nx graph available._';

    const gaps = input.gapsAndQuestions?.length
        ? input.gapsAndQuestions.map(g => `- ${g}`).join('\n')
        : '_None_';

    return [
        `# Overview

${input.expositionMd}`,

        `## Quickstart (Worked Examples) <!-- anchor: worked_examples -->
${worked || '_No worked examples detected._'}`,

        `## Public API (Exports) <!-- anchor: public_api -->
| export | kind | signature | description |
|---|---|---|---|
${apiRows.join('\n') || '| _none_ | _ | _ | _ |'}`,

        `## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._`,

        `## Configuration & Environment <!-- anchor: configuration_env -->
| name | required | default | files | notes |
|---|---|---|---|---|
${envRows.join('\n') || '| _none_ | _ | _ | _ | _ |'}`,

        `## Dependency Topology (Nx) <!-- anchor: deps_topology -->
${nx}`,

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
