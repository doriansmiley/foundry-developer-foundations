import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { parseLLMJSONResponse } from '../utils/parseResponse';
import { google } from 'googleapis';

type IntentResult = {
  functionIntent:
    | 'create'
    | 'get'
    | 'update'
    | 'delete'
    | 'list'
    | 'patch'
    | 'copy'
    | 'send'
    | 'insert';
  module:
    | 'docs'
    | 'sheets'
    | 'slides'
    | 'drive'
    | 'calendar'
    | 'gmail'
    | 'forms';
};

export const searchForGoogleDocsLinks = async (functionName: string) => {
  // Step A: Call Gemini (or other LLM service) to resolve intent
  const systemPrompt = `
You are an expert in Google Workspace REST APIs.
Given a function name like "listDriveFiles" or "createGoogleDoc",
return a JSON object with the intended REST API operation and module.
- functionIntent: one of create, get, update, delete, list, patch, copy, send, insert
- module: one of docs, sheets, slides, drive, calendar, gmail, forms
  `;

  const userPrompt = `Function name: ${functionName}`;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);
  const response = await geminiService(systemPrompt, userPrompt);

  const result = parseLLMJSONResponse<IntentResult>(response);

  if (!result) {
    throw new Error('LLM could not resolve intent.');
  }

  // Step B: Build a query string from intent
  const { functionIntent, module } = result;

  const label = {
    docs: 'Google Docs',
    sheets: 'Google Sheets',
    slides: 'Google Slides',
    drive: 'Google Drive',
    calendar: 'Google Calendar',
    gmail: 'Gmail',
    forms: 'Google Forms',
  }[module];

  // Resource mapping is optional – you can keep it simple and let search do the heavy lifting
  const resourceGuess = {
    docs: 'documents',
    sheets: 'spreadsheets',
    slides: 'presentations',
    drive: 'files',
    calendar: 'events',
    gmail: 'users.messages',
    forms: 'forms',
  }[module];

  // Step C: Run a programmable search API call using googleapis
  const customSearch = google.customsearch('v1');

  const searchQuery = `${label} REST API ${resourceGuess}.${functionIntent}`;

  try {
    const response = await customSearch.cse.list({
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID!,
      q: searchQuery,
      auth: process.env.GOOGLE_SEARCH_API_KEY!,
      siteSearch: 'developers.google.com', // Focus on primary API documentation site
      siteSearchFilter: 'i', // include results from this site
      num: 2, // Get the 2 most accurate results
      hl: 'en',
    });

    return (response.data.items ?? []).map((item: any) => item.link);
  } catch (error) {
    console.error('Google Custom Search API error:', error);
    throw new Error(`Custom Search API failed: ${error}`);
  }
};
