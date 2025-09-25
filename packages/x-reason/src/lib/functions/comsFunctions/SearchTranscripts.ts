import {
  Context,
  MachineEvent,
  OfficeServiceV2,
  DriveSearchParams,
  DriveDateField,
  DriveFile,
} from '@codestrap/developer-foundations-types';
import { 
  extractJsonFromBackticks,
  buildDateWindowUTC,
} from '@codestrap/developer-foundations-utils';
import { partsInTZ, wallClockToUTC } from '@codestrap/developer-foundations-utils';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';

async function selectTopMatches(
  files: DriveFile[],
  task: string | undefined,
  geminiService: GeminiService
): Promise<DriveFile[]> {
  if (files.length <= 3) {
    return files;
  }

  const system = `You are an expert file relevance analyzer. Your job is to analyze transcript files and select the most relevant ones based on user queries.`;

  const fileMetadata = files.map((file) => ({
    id: file.id,
    name: file.name,
    createdTime: file.createdTime,
    modifiedTime: file.modifiedTime,
    description: file.description ?? '',
  }));

  const userPrompt = `
    Select the TOP 3 most relevant files for: "${task}"
    
    Files:
    ${fileMetadata.map((file) => `${file.id}: ${file.name} - ${file.createdTime} - ${file.description}`).join('\n')}
    
    Return JSON: {"selectedIds": ["id1", "id2", "id3"]}
  `;

  const response = await geminiService(userPrompt, system);
  const clean = extractJsonFromBackticks(response);
  const result = JSON.parse(clean) as { selectedIds: string[] };
  
  return result.selectedIds.map(id => files.find(file => file.id === id)!);
}

export async function searchTranscripts(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<DriveFile[]> {
  const TZ = 'America/Los_Angeles';
  const now = new Date();
  const p = partsInTZ(now, TZ);
  const nowString = `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}T${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}:${String(p.second).padStart(2, '0')}`;
  const nowUTC = wallClockToUTC(nowString, TZ);

  const system = `You are a helpful virtual ai assistant tasked with extracting search parameters for transcript queries from Google Drive.`;

  const userPrompt = `
    Using the task from the end user below, classify the time frame for the transcript search query into one of the following:
    1. today (default)
    2. yesterday
    3. this week
    4. last week
    5. this month
    6. last month
    7. all time

    The task from the end user:
    ${task}

    Current time (UTC): ${nowUTC.toISOString()}

    You can only respond in JSON in the following format:
    {
        timeframe: string,
        topicKeywords: string[]
    }

    For example if the ask from the user is:
    Q: "Give me transcript for meeting with corner last week"
    A: {
        "timeframe": "last week",
        "topicKeywords": ["corner"]
    }

    Q: "Find today's standup meeting notes"
    A: {
        "timeframe": "today",
        "topicKeywords": ["standup"]
    }

    Q: "Search for interview transcripts from this month"
    A: {
        "timeframe": "this month",
        "topicKeywords": ["interview"]
    }

    Q: "Show me all client call transcripts"
    A: {
        "timeframe": "all time",
        "topicKeywords": ["client call", "client"]
    }

    Q: "Find yesterday's budget discussion notes"
    A: {
        "timeframe": "yesterday",
        "topicKeywords": ["budget discussion", "budget"]
    }

    Q: "Search for product review meeting transcripts from this week"
    A: {
        "timeframe": "this week",
        "topicKeywords": ["product review", "product"]
    }

    Q: "Give me all quarterly planning transcripts"
    A: {
        "timeframe": "all time",
        "topicKeywords": ["quarterly planning", "quarterly"]
    }

    Q: "Find team sync notes from last month"
    A: {
        "timeframe": "last month",
        "topicKeywords": ["team sync", "sync"]
    }

    Q: "Show me today's demo session transcripts"
    A: {
        "timeframe": "today",
        "topicKeywords": ["demo session", "demo"]
    }

    Q: "Search for all onboarding meeting notes"
    A: {
        "timeframe": "all time",
        "topicKeywords": ["onboarding meeting", "onboarding"]
    }
    `;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  const response = await geminiService(userPrompt, system);

  const clean = extractJsonFromBackticks(response);

  const { timeframe, topicKeywords } = JSON.parse(clean) as {
    timeframe: string;
    topicKeywords: string[];
  };

  // Hardcoded static filename patterns
  const filenameKeywords = ["- Transcript", "- Notes by Gemini"];
  
  const keywords = [...topicKeywords, ...filenameKeywords];

  const { startDate: searchStartDate, endDate: searchEndDate } = buildDateWindowUTC(timeframe, nowUTC);

  const searchParams: DriveSearchParams = {
    keywords,
    dateRange: {
      startDate: searchStartDate,
      endDate: searchEndDate,
      field: DriveDateField.MODIFIED_TIME,
    },
    mimeType: 'application/vnd.google-apps.document',
    owner: 'me',
    trashed: false,
    pageSize: 50,
    orderBy: 'modifiedTime desc',
  };

  const officeService = await container.getAsync<OfficeServiceV2>(
    TYPES.OfficeService
  );

  const result = await officeService.searchDriveFiles(searchParams);
  const topMatches = await selectTopMatches(result.files, task, geminiService);
  
  return topMatches;
}
