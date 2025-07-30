import { Context, MachineEvent } from '@xreason/reasoning/types';
import { extractJsonFromBackticks } from '@xreason/utils';
import { container } from '@xreason/inversify.config';
import { GeminiService, TYPES } from '@xreason/types';

export interface MeetingNotes {
  summary: string;
  actionItems: string[];
  transcriptExcerpt?: string;
}

export interface MeetingNotesContext {
  transcript: string;
}

//Parses transcript from the previous state in the context stack.
 //Throws if transcript is missing.
function parseMeetingNotesContext(context: Context): { transcript: string } | null {
  if (!context?.stack?.length) return null;
  const lastStackKey = context.stack[context.stack.length - 2];
  if (!lastStackKey || !context[lastStackKey]) return null;
  const data = context[lastStackKey];
  if (!data?.transcript) throw new Error('Transcript is required to generate meeting notes!');
  return { transcript: data.transcript };
}

// generates meeting notes from a transcript in the context, and returns a structured summary and action items
export async function generateMeetingNotes(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<MeetingNotes> {
  const notesContext = parseMeetingNotesContext(context as Context);
  if (!notesContext) throw new Error('No transcript found in context.');

  const userPrompt = `
You are an expert executive assistant, skilled at listening to meeting transcripts and producing clear, professional meeting notes.

Your task is to:
- Summarize the meeting transcript clearly and concisely.
- Extract all action items as a bullet list.
- Format the output as JSON with two fields: "summary" and "actionItems".

Meeting Transcript:
"""
${notesContext.transcript}
"""

Your response must be valid JSON in this exact format:

{
  "summary": "<Concise summary of the meeting>",
  "actionItems": [
    "First action item",
    "Second action item"
  ]
}

Use a professional tone and be concise.
`;

  const systemPrompt = `You are an AI meeting assistant producing clean JSON outputs for meeting notes.`;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);
  const response = await geminiService(userPrompt, systemPrompt);

  // Clean and parse JSON from LLM output
  const extractedJson = extractJsonFromBackticks(response ?? '{}');
  const parsed = JSON.parse(extractedJson);

  const result: MeetingNotes = {
    summary: parsed.summary || 'No summary generated.',
    actionItems: parsed.actionItems || [],
    transcriptExcerpt: notesContext.transcript.slice(0, 500),
  };

  context.meetingNotes = result;

  return result;
}
