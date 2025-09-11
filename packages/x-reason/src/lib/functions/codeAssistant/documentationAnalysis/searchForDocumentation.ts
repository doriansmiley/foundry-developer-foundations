import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { parseLLMJSONResponse } from '../utils/parseResponse';
import { google } from 'googleapis';
import { readConversation } from '../../../storage/conversationStore';

export const searchForDocumentation = async (
  conversationId?: string,
  designSpec?: string
) => {
  // Step A: Call Gemini (or other LLM service) to resolve intent
  const systemPrompt = `
You are an search engine expert in Google Workspace REST APIs and Googleapis library.
Given the design spec from the previous conversation, create search query to find the most relevant documentation.

If there is more than one search query, return an array of strings. E.g if you need to 
find gmail API and drive API, return an array with two queries for each API.
Search queries should take into account to search for REST API or for Typescript / JavaScript documentation only.

You are always responding in JSON format with the following fields:
  - searchQueries: string[]
`;

  const previous = await readConversation(conversationId);
  const previousContext = previous
    .map((m) => `[${m.role}] ${m.content}`)
    .join('\n');

  const userPrompt = `
  ${previousContext ? `Previous conversation: ${previousContext}` : ''}
  ${designSpec ? `Design spec: ${designSpec}` : ''}
  `;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);
  const response = await geminiService(systemPrompt, userPrompt);

  const result = parseLLMJSONResponse<{
    searchQueries: string[];
  }>(response);

  if (!result) {
    throw new Error('LLM could not resolve intent.');
  }

  // Step B: Build a query string from intent
  const { searchQueries } = result;

  // example queries I got and Didn't get results
  /*
[
  'googleapis gmail users.messages.send',
  'googleapis drive files.get alt=media',
  'gmail api multipart/mixed attachment',
  'gmail api create mime message with attachments googleapis',
  'google drive api download file content googleapis',
  'gmail api base64url encode message googleapis',
  'googleapis gmail api typescript example'
]
  */

  console.log('Search queries:', searchQueries);

  // Step C: Run a programmable search API call using googleapis
  const customSearch = google.customsearch('v1');

  try {
    // TODO I need to figure out why it is not returing results
    const results: any[] = [];
    searchQueries.forEach(async (query: string) => {
      const response = await customSearch.cse.list({
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID!,
        q: query,
        auth: process.env.GOOGLE_SEARCH_API_KEY!,
        siteSearch: 'developers.google.com', // Focus on primary API documentation site
        siteSearchFilter: 'i', // include results from this site
        num: 2, // Get the 2 most accurate results
        hl: 'en',
      });

      results.push(...(response.data.items ?? []));
    });

    console.log('results', results);
    return results.map((item: any) => item.link);
  } catch (error) {
    console.error('Google Custom Search API error:', error);
    throw new Error(`Custom Search API failed: ${error}`);
  }
};
