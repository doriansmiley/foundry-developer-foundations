import { Context, MachineEvent } from "@xreason/reasoning/types";
import { extractJsonFromBackticks } from "@xreason/utils";
import { container } from "@xreason/inversify.config";
import { GeminiService, TYPES } from "@xreason/types";
import FirecrawlApp from "@mendable/firecrawl-js";



export async function readWebPage(context: Context, event?: MachineEvent, task?: string): Promise<{ result: string }> {
    const system = `You are a helpful virtual ai assistant tasked with extracting the url from user queries.`;

    const userPrompt = `
    Using the user query below output the URL contained in the user query. If the URL does not include the protocol (https://) use must include it

    The user query is:
    ${task}

    You can only respond in JSON in the following format:
    {
        url: string,
    }

    For example if the ask from the user is:
    Q: "1. **Read Web Page** - Read the following web page: codestrap.com
    A: {
        "url": "https://codestrap.com"
    }

    Q: "1. **Read Web Page** - Read the following web page: https://codestrap.com
    A: {
        "url": "https://codestrap.com"
    }
    `;

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(userPrompt, system);
    // eslint-disable-next-line no-useless-escape
    const extractedResponse = extractJsonFromBackticks(response.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}");
    const { url } = JSON.parse(extractedResponse) as { url: string };

    const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

    if (!FIRECRAWL_API_KEY) {
        throw new Error('FIRECRAWL_API_KEY is not defined!');
    }

    const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

    const pageContents = await app.scrapeUrl(url, {
        formats: ['markdown'],
    });

    if (pageContents.success && pageContents.markdown) {
        return { result: pageContents.markdown };
    }

    return { result: `Failed to load ${url}\n${pageContents.error}` };
}