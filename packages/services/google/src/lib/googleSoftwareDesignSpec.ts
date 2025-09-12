import { GenerateContentResponse, GoogleGenAI } from '@google/genai';

function addCitations(response: GenerateContentResponse) {
    let text = response.text;
    const supports = response.candidates?.[0].groundingMetadata?.groundingSupports;
    const chunks = response.candidates?.[0].groundingMetadata?.groundingChunks;

    // Sort supports by end_index in descending order to avoid shifting issues when inserting.
    const sortedSupports = [...supports || []].sort(
        (a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0),
    );

    for (const support of sortedSupports) {
        const endIndex = support.segment?.endIndex;
        if (endIndex === undefined || !support.groundingChunkIndices?.length) {
            continue;
        }

        const citationLinks = support.groundingChunkIndices
            .map(i => {
                const uri = chunks?.[i]?.web?.uri;
                if (uri) {
                    return `[${i + 1}](${uri})`;
                }
                return null;
            })
            .filter(Boolean);

        if (citationLinks.length > 0) {
            const citationString = citationLinks.join(", ");
            text = text?.slice(0, endIndex) + citationString + text?.slice(endIndex);
        }
    }

    return text;
}

export async function googleSoftwareDesignSpec(
    userInput: string,
    num = 5,
    dateRestrict?: string,
    siteSearch?: string,
    siteSearchFilter?: string,
    searchEngineId?: string
): Promise<string> {
    const system = `
You are a helpful AI engineering architect assistant that specializes in formulating design specification from user input.
Your job is to search the web and create a clean specification grounded in your search results and knowledge that solves for the user inputs.

### User Inputs Include
- A “Design Specification Conversation Thread” that may include:
  - API surface (functions, types, file paths)
  - Tech stack (languages, frameworks, SDKs, library names and versions)
  - Test names and error phrases
  - Environment/build tools (Nx, Jest, Next.js, ts-jest, Google APIs, etc.)
  - Explicit constraints (e.g., “25 MB total attachment size”)
- A user task/question.

You always carefully evaluate user input before crafting your search queries and obey all search rules provided by the user.
  `;

    const user = `
Generate a design specification that solves for the user input by searching the web for relevant documentation.

### Hard Rules for Web Search
1) **Extract-and-use entities** from the thread. Build queries that contain:
   - Languages (TypeScript/JavaScript), frameworks (Node.js/Next.js), tools (Nx, Jest),
   - SDKs/APIs/libraries with exact names and relevant endpoints (e.g., "gmail users.messages.send", "Drive files.get alt=media", "Base64Url"),
   - Function names from the API surface (e.g., sendEmail), and design constraints (e.g., 25 MB limit, allowed MIME types).
2) **No vague queries.** Avoid generic terms like “javascript create mime message”. Queries must be tight, technical, and context-anchored.
3) **Multiple facets**, split into separate queries:
   - (A) Official API how-to and endpoints
   - (B) MIME construction specifics for attachments
   - (C) Limits/quotas/payload size and encoding
   - (D) Language/framework integration (TypeScript/Node)
   - (E) Edge cases: allowed MIME types (docx/pdf/png/jpg/gif), multi-part boundaries, Base64URL vs Base64, size aggregation
4) **De-duplicate & normalize.** Prefer exact phrases in quotes for endpoint names, use operators (\`site: \`, quotes, AND).
5) **Respect the stack.** If the thread shows \`googleapis\` v149 and Gmail/Drive, target those. Do **not** introduce unrelated libs unless present.
6) **Keep each query ≤ 12 words** when possible. No punctuation unless required for exact phrases or operators.

### Heuristics
- Prefer queries that would land on: API reference pages, official guides, or well-known example pages (not forums) for first pass.
- When an endpoint is clearly implicated, include its exact path in quotes.
- Include concrete constraint terms (e.g., "25 MB", "Base64url", "multipart/related").

# Hard Rules for Answer Synthesis
Be sure you have captured changes that are required for the existing public API such as new parameters, methods, etc
Be sure you prevent developer foot gunning by designing the solution to handle errors, retries, and backoff policies
Do not over engineer the solution, engineer for a v0
Organize your code such that you don't nest function declarations or type definitions inside functions
Include optional suggested enhancements over the v0 solution

# User Input
${userInput}
  `;

    // Configure the client
    const ai = new GoogleGenAI({});

    // Define the grounding tool
    const groundingTool = {
        googleSearch: {},
    };

    // Configure generation settings
    const config = {
        tools: [groundingTool],
    };

    // Make the request
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${system}\n${user}`,
        config,
    });

    const answer = addCitations(response);

    return answer ?? "Could not synthesize an answer."

}
