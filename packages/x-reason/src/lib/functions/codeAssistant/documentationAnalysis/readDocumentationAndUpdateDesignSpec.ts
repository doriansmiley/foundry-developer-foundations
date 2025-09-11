import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { parseLLMJSONResponse } from '../utils/parseResponse';
import {
  appendMessage,
  readConversation,
} from '../../../storage/conversationStore';
import FirecrawlApp from '@mendable/firecrawl-js';

export const readDocumentationAndUpdateDesignSpec = async (
  documentationLinks: string[],
  conversationId?: string
) => {
  const systemPrompt = `
You are Google Service Expert Architect. Your job is to update design spec
based on the provided documentation. You should update only API references
and if auth scopes. If there is major inconsistency in the design spec,
you should update the design spec accordingly.

Do not change the structure of the design spec. Update links and other fields if required.
If there is no information about how API under given link works - create such spec so there won't be a need to open the link anymore.
All needed information should be in the design spec.
`;

  const previous = await readConversation(conversationId);
  const previousContext = previous
    .map((m) => `[${m.role}] ${m.content}`)
    .join('\n');

  const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is not defined!');
  }
  const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

  const docsMap: Record<string, string> = {};

  // rate-limit to 2 concurrent Firecrawl requests (free tier)
  for (let i = 0; i < documentationLinks.length; i += 2) {
    const batch = documentationLinks.slice(i, i + 2);
    const scrapePromises = batch.map((link) =>
      app.scrapeUrl(link, { formats: ['markdown'] })
    );

    const results = await Promise.allSettled(scrapePromises);

    results.forEach((res, idx) => {
      const link = batch[idx];
      if (res.status === 'fulfilled' && res.value.success) {
        docsMap[link] = res.value.markdown ?? '';
      } else {
        const reason =
          res.status === 'rejected'
            ? (res.reason as Error)?.message
            : (res.value as any)?.error;
        docsMap[link] = `Failed to fetch content: ${reason ?? 'unknown error'}`;
      }
    });
  }

  const docsAsText = Object.entries(docsMap)
    .map(([link, content]) => `[${link}]: ${content}`)
    .join('\n\n');

  const userPrompt = `
  ${
    previousContext
      ? `Previous conversation containing design spec: ${previousContext}`
      : ''
  }

  Documentations:
  ${docsAsText}
  `;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);
  const response = await geminiService(systemPrompt, userPrompt);

  if (conversationId) {
    await appendMessage(
      conversationId,
      'assistant',
      `Final design spec after reading documentation:
      ${response}
      `
    );
  }
  return response;
};
