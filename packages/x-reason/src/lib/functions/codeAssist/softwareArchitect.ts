export async function softwareArchitect(
    user: string,
    num = 5,
    dateRestrict?: string,
    siteSearch?: string,
    siteSearchFilter?: string,
    searchEngineId?: string
): Promise<string> {
    const system = `
You are a helpful AI engineering architect that specializes in creating the final design specification based on the design specification created by the requirements team.
Your job is to create a clean specification grounded in the provided specification with the code to be written. You must generate the proposed code!
The specification includes citations to ground you in the sources of documentation to be used

### User Inputs Include
- A “Design Specification Conversation Thread” that may include:
  - API surface (functions, types, file paths)
  - Tech stack (languages, frameworks, SDKs, library names and versions)
  - Test names and error phrases
  - Environment/build tools (Nx, Jest, Next.js, ts-jest, Google APIs, etc.)
  - Explicit constraints (e.g., “25 MB total attachment size”)
- A user task/question.

You always carefully evaluate user input before generating your response.
  `;

    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-5-mini',
            input: [
                { role: 'system', content: [{ type: 'input_text', text: system }] },
                { role: 'user', content: [{ type: 'input_text', text: user }] },
            ],
            reasoning: { "effort": "low" },
            text: { verbosity: 'low' },
            tools: [
                {
                    type: 'web_search',
                    user_location: { type: 'approximate', country: 'US' },
                },
            ],
            store: true,
        }),
    });

    const data = (await response.json()) as any;

    // Robustly collect all assistant text from the new Responses API shape
    const outputItems: any[] = Array.isArray(data?.output) ? data.output : [];
    const textChunks: string[] = [];
    const annotations: any[] = [];

    for (const item of outputItems) {
        if (item?.type === 'message' && Array.isArray(item.content)) {
            for (const c of item.content) {
                if (typeof c?.text === 'string') textChunks.push(c.text);
                if (Array.isArray(c?.annotations)) annotations.push(...c.annotations.filter(Boolean));
            }
        }
    }

    // Some SDKs expose a convenience concatenation; use as a fallback if present
    const mainText = (typeof data?.output_text === 'string' && data.output_text.trim().length > 0)
        ? data.output_text
        : textChunks.join('\n\n').trim();

    // Extract URL citations from annotations (GPT-5 emits `type: "url_citation"`)
    type UrlCitation = { type?: string; url?: string; title?: string | null | undefined };
    const urlCitations: UrlCitation[] = annotations.filter(
        (a: UrlCitation) => (a?.type ?? '').toLowerCase() === 'url_citation' && a?.url
    );

    // Dedupe by URL
    const deduped = Array.from(new Map(urlCitations.map((c) => [c.url!, c])).values());

    // Build "Sources" markdown
    const sourcesMd =
        deduped.length > 0
            ? `\n\n---\n### Sources\n${deduped
                .map((c, i) => {
                    const url = c.url!;
                    let title = (c.title || '').trim();
                    if (!title) {
                        try {
                            const { hostname } = new URL(url);
                            title = hostname.replace(/^www\./, '');
                        } catch {
                            title = url;
                        }
                    }
                    return `${i + 1}. [${title}](${url})`;
                })
                .join('\n')}\n`
            : '';

    return `${mainText}${sourcesMd}`;
}
