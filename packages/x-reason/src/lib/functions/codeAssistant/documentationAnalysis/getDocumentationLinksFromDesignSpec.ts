import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { parseLLMJSONResponse } from '../utils/parseResponse';
import { readConversation } from '../../../storage/conversationStore';

export const getDocumentationLinksFromDesignSpec = async (
  conversationId?: string
) => {
  // Step A: Call Gemini (or other LLM service) to resolve intent
  const systemPrompt = `
You are Google Service Expert Architect. Based on provided design spec in conversation history get API links
and return them in JSON format.

You are always responding in JSON format with the following fields:
  - links: string[]
`;

  const previous = await readConversation(conversationId);
  const previousContext = previous
    .map((m) => `[${m.role}] ${m.content}`)
    .join('\n');

  const userPrompt = `
  ${previousContext ? `Previous conversation: ${previousContext}` : ''}
  `;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);
  const response = await geminiService(systemPrompt, userPrompt);

  const result = parseLLMJSONResponse<{
    links: string[];
  }>(response);

  if (!result) {
    throw new Error('LLM could not resolve intent.');
  }

  const { links } = result;

  return links;
};
