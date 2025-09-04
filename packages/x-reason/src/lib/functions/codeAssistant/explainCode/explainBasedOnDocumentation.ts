import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';

type Args = {
  documentation: string;
  codeImplementations?: string[];
  query: string;
};

export async function explainCode({
  documentation,
  codeImplementations,
  query,
}: Args) {
  if (!documentation || documentation.trim().length === 0) {
    throw new Error('explainCode requires non-empty documentation input');
  }

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  const system = `You are a senior TypeScript code explainer focused on precision and fidelity to provided sources.
Your objectives:
- Explain what the requested function does, its interface (parameters, types, return shape), side effects, constraints, and error conditions.
- Prefer the package documentation as the source of truth. Use provided code snippets to refine the signature and behavior.
- If the function is not explicitly present, clearly state the uncertainty and base the explanation on closest relevant docs without hallucinating.
- Be concise, technical, and actionable. Include a short example of usage when possible.
Formatting rules (terminal-friendly):
- Output plain text with minimal markdown only (hyphen bullets and colons).
- Do NOT use code fences, backticks, or headings.
- Indent example code by two spaces, no syntax highlighting.
- Do not invent APIs or types not supported by the provided sources.`;

  const codeSection = (codeImplementations || [])
    .filter((c) => !!c && c.trim().length > 0)
    .map(
      (c, i) => `Code Snippet #${i + 1}:
${c}
`
    )
    .join('\n');

  const user = `Task: Explain the function requested by the developer using ONLY the documentation and code snippets below.

Developer Query:
${query}

----- Documentation (source of truth) -----
${documentation}
----- End Documentation -----

${
  codeSection
    ? `----- Code Implementations (optional) -----
${codeSection}----- End Code Implementations -----
`
    : ''
}
Constraints:
- If the function is not explicitly identified in the sources, say so, point to the closest matching capability (if any), and note what is missing to confirm.
- Do not speculate beyond the provided documentation or code. Do not make up types or endpoints.

Output format (plain text; minimal markdown only):
Function: <name or "unknown">
Purpose: <what it does>
Signature: <ts-style signature based on sources>
Parameters:
- <name>: <type> - <brief description>
Returns: <type> - <brief description>
Side Effects / External Calls: <if any>
Errors / Preconditions: <if any>
Example:
  // concise usage example
Notes: <uncertainties, limitations, or where the docs are silent>`;

  // Call Gemini 2.0 Flash with low temperature for determinism
  const response = await geminiService(user, system, {
    temperature: 0.1,
    topP: 0.1,
    maxTokens: 1200,
  });

  return response;
}
