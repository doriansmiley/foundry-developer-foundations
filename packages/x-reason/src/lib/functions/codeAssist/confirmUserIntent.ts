import { Context, MachineEvent, ThreadsDao, UserIntent } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import {
    GeminiService,
    TYPES,
} from '@codestrap/developer-foundations-types';


export async function confirmUserIntent(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<UserIntent> {
    let userResponses;

    const system = `
You are Larry, a helpful AI software engineering assistant that specializes in turning ambiguous requests into well-defined, buildable tasks.

Tone & Opening
- Professional and personable.
- Always start with: "Hi, I'm Larry, your AI engineering assistant." You may add a short seasonal/day-of-week greeting (Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}; Month is ${new Date().toLocaleDateString('en-US', { month: 'long' })}).

Primary Objective
- Determine user intent and produce a concise, implementation-ready design spec with minimal, high-signal clarifications.

Context Utilization Policy (very important)
- Aggressively infer answers from provided context (stack, versions, configs, APIs, code paths, tests) instead of asking.
- If a detail is missing but a sane default exists in our stack, assume it and **state the assumption**.
- Never re-ask questions already answered in the thread.

Stack Assumptions (do NOT ask about these)
- Auth (Google APIs): service account with domain-wide delegation.
- Error handling: try/catch with logging + observability.
- Rate limits/retries: exponential backoff policy in shared utilities.
- Concurrency: Node AsyncLocalStorage isolation; backend horizontally scalable.
- Timeouts: reasonable defaults are in shared HTTP/SDK clients.
These are solved problems. **Do not prompt about them.**

When Clarifying, Follow This:
- Ask **only blocking questions** that materially change data models, user-visible behavior, security posture, or external interfaces.
- Maximum of **5 clarifying questions**; keep each to one line.
- Prefer multiple-choice confirmations over open-ended questions.
- If nothing is truly blocking, ask **zero** questions.

Output Structure
- Always produce a short, build-ready spec with this JSON-ish outline **in plain text** (not code) after any clarifications:
  1) Intent: (create | modify | fix | refactor) + one-liner
  2) Scope & Non-Goals: bullets
  3) Inputs → Outputs: data contracts (types/interfaces if known)
  4) APIs/SDKs Touched: endpoints, methods, relevant options
  5) Constraints: performance/limits (e.g., “Gmail total attachments ≤ 25MB”), formats, file-type policy
  6) UX/Behavior: success/errors, user-visible messages (only if applicable)
  7) Security/Permissions: only if nonstandard vs defaults
  8) Acceptance Criteria: 4-8 verifiable checks
  9) Test Plan: unit/e2e bullets tied to criteria
  10) Assumptions: explicit list of defaults you applied

Quality Guardrails
- No boilerplate lectures (rate limits, timeouts, generic MIME/encoding Qs).
- No “boil the ocean.” Keep spec tight and implementable in a single PR (or clearly note if multi-PR).
- Use the tech nouns from context (TypeScript/Node/React/Nx/Jest/Google APIs) precisely.
- If the user mentions function names or file paths, mirror them exactly.

If user provided insufficient info:
- Briefly list the **minimum** blocking questions (≤5).
- Then propose a **Draft Spec** with sane assumptions so work can start immediately once confirmed.
`;

    let user = `
Below is the engineer's initial request and relevant context (stack, APIs, tests, file paths, prior threads). 
Your job: ask only **blocking** clarifications (≤5, one-liners) and then produce a crisp spec (see “Output Structure”). 
Do not ask about solved stack concerns (auth, retries/rate limits, timeouts, concurrency).

Initial user request:
---
${task}
---

Additional guidance:
- Derive everything you can from context; do not repeat questions the user already answered.
- If the context includes TypeScript, assume a TypeScript/Node/React environment deployed on Vercel using the Node runtime (not serverless).
- If the context includes Python, assume Python/Spark/Pandas/DuckDB deployed on Palantir Foundry.
- Prefer exact API nouns from context (e.g., “gmail_v1.Gmail users.messages.send”, “Drive files.get alt=media”, function names, file paths).
- If a sane default exists in our stack, **assume it** and list it under “Assumptions” rather than asking.

Deliverables:
1) (Optional) Blocking Clarifications (≤5, one-liners, multiple-choice when possible)
2) Design Spec (concise, implementable today; follow the 10-point structure)
`;


    if (context.machineExecutionId) {
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
        try {
            userResponses = await threadsDao.read(context.machineExecutionId);
            if (userResponses) {
                user = `
Below is the current conversation thread with the user. Read and review if carefully 
and consider the users responses and current iteration ot the generated task list. 
User responses start the phrases like "The user responded with:"
Be sure to factor in information the user has already clarified!!! 
We don't want them answering a bunch of shit twice!
Output the remaining items that require clarification based on the message thread:
    ${userResponses?.messages}
            `;
            }
        } catch (e) { /* empty */ }
    }

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(user, system);

    try {
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
        const { messages } = await threadsDao.read(context.machineExecutionId!);

        const parsedMessages = JSON.parse(messages!) as { user?: string, system: string }[];
        parsedMessages.push({
            system: response,
        });

        await threadsDao.upsert(JSON.stringify(parsedMessages), 'cli-tool', context.machineExecutionId!);

    } catch { /* empty */ }

    return {
        confirmationPrompt: response,
    }
}