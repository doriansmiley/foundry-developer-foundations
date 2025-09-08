// src/assets/tasksFromApi.ts
import { container } from '@codestrap/developer-foundations-di';
import {
    GeminiService,
    TYPES,
    ExportedSymbol,
    WorkedExample,
    PracticeProblem,
    EnvVar,
    ReadmeInputForTemplate,
    ToolCallingTask,
} from '@codestrap/developer-foundations-types';
import {
    extractJsonFromBackticks,
} from '@codestrap/developer-foundations-utils';

/**
 * Ask the LLM to synthesize tool-calling tasks (Q/A) from the assembled docs.
 * - Domain agnostic
 * - Only uses public API (restricted by include[] if provided)
 * - Emits TypeScript code blocks that look like actual tool calls
 */
export async function generateToolCallingTasksLLM(opts: {
    apiSurface: ExportedSymbol[];
    workedSFT?: WorkedExample[];
    practiceRL?: PracticeProblem[];
    expositionMd?: string;
    envTable?: EnvVar[];
    nxSummary?: ReadmeInputForTemplate['nxSummary'];
    projectConfig?: ReadmeInputForTemplate['projectConfig'];
    includeFunctionNames?: string[];          // restrict to functions exported by the entry module
    currentUserEmail?: string;                // hint for defaults
    maxTasksPerFunction?: number;             // default 2
    totalTaskBudget?: number;                 // global cap; default 12
}): Promise<ToolCallingTask[]> {
    const {
        apiSurface,
        workedSFT = [],
        practiceRL = [],
        expositionMd = '',
        envTable = [],
        nxSummary,
        projectConfig,
        includeFunctionNames,
        currentUserEmail,
        maxTasksPerFunction = 2,
        totalTaskBudget = 12,
    } = opts;

    // Filter to public *functions* only; optionally restrict by include list (entry exports)
    const functions = apiSurface.filter(s => s.kind === 'function');
    const includeSet = includeFunctionNames && includeFunctionNames.length
        ? new Set(includeFunctionNames)
        : null;
    const publicFunctions = includeSet
        ? functions.filter(f => includeSet.has(f.name))
        : functions;

    if (!publicFunctions.length) return [];

    // Prepare concise, model-friendly context
    const fnBrief = publicFunctions.map(f => ({
        name: f.name,
        signature: f.signature || '',
        doc: (f.jsDoc || '').slice(0, 600),
    }));

    const envBrief = envTable.slice(0, 40).map(e => ({
        name: e.name,
        required: e.required,
        defaultValue: e.defaultValue ?? null,
    }));

    const workedBrief = workedSFT.slice(0, 15).map(w => ({
        title: w.title,
        file: w.file,
    }));

    const practiceBrief = practiceRL.slice(0, 15).map(p => ({
        title: p.title,
        description: p.description,
    }));

    const nxBrief = nxSummary ? {
        projectName: nxSummary.projectName,
        dependencies: (nxSummary.dependencies || []).slice(0, 20),
    } : null;

    const pkgPath = projectConfig?.packageJson?.path;

    const system = `
You are generating *tool-calling tasks* for engineers and agents.
Your job: From the provided public API (function names, signatures, short docs), produce practical NL questions (Q) and exact TypeScript call snippets (A) that invoke those functions as tools.

CRITICAL RULES
- Domain-agnostic: DO NOT invent domain rules; derive usage from function names, signatures, and provided docs/examples only.
- Use ONLY functions listed in "publicFunctions".
- Prefer realistic values grounded in signatures and any example hints; avoid placeholders when possible.
- Each answer must be a single TypeScript code block that could compile in a normal project (no comments inline other than necessary).
- Keep arguments minimal but correct; include key/required fields; skip noise.
- If a "currentUserEmail" hint is provided, use it when an email/user is required.
- Do not include explanatory prose in the code block.
- Output strict JSON (array of tasks) using the schema below

SCHEMA
type ToolCallingTask = {
  tool: string;         // function name
  question: string;     // natural language instruction
  answerCode: string;   // notional function invocation, do not fence with backticks!!!
  notes?: string;       // brief assumptions (optional)
};

For example:
[
  {
    "tool": "sendEmail",
    "question": "Send an email to Connor Deeks <connor.deeks@codestrap.me> letting him know I am running late for our call.",
    "answerCode": "sendEmail({ \n  from: 'dsmiley@codestrap.me', \n  recipients: ['connor.deeks@codestrap.me'], \n  subject: 'running late', \n  message: 'I will be a few minutes late for our meeting', \n });",
    "notes": "Assuming current user is Dorian Smiley <dsmiley@codestrap.me>"
  },
]
`;

    const user = JSON.stringify({
        publicFunctions: fnBrief,
        workedExamples: workedBrief,
        practiceExamples: practiceBrief,
        expositionMd: expositionMd.slice(0, 4000),
        env: envBrief,
        nx: nxBrief,
        packageJsonPath: pkgPath || null,
        hints: {
            currentUserEmail: currentUserEmail || null,
            maxTasksPerFunction,
            totalTaskBudget,
        }
    });

    const gemini = container.get<GeminiService>(TYPES.GeminiService);
    const raw = await gemini(user, system);

    // Try to parse strict JSON; if wrapped, salvage
    let parsed: any;
    try {
        parsed = JSON.parse(extractJsonFromBackticks(raw));
    } catch {
        throw new Error('LLM did not return JSON array for ToolCallingTask');
    }

    // Validate & clamp
    const tasks: ToolCallingTask[] = [];
    const budget = Math.max(1, totalTaskBudget);
    for (const t of parsed) {
        if (!t || typeof t !== 'object') continue;
        if (!t.tool || !t.question || !t.answerCode) continue;
        // restrict to known public functions
        if (!publicFunctions.some(f => f.name === t.tool)) continue;
        tasks.push({
            tool: String(t.tool),
            question: String(t.question),
            answerCode: String(t.answerCode),
            notes: t.notes ? String(t.notes) : undefined,
        });
        if (tasks.length >= budget) break;
    }

    return tasks;
}
