import {
  Context,
  MachineEvent,
  OfficeServiceV2,
  DriveSearchOutput,
  DriveSearchParams,
  DriveDateField,
} from '@codestrap/developer-foundations-types';
import { 
  extractJsonFromBackticks,
  nowInTZ,
  buildDateWindow,
} from '@codestrap/developer-foundations-utils';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';

export async function searchTranscripts(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<DriveSearchOutput> {
  const TZ = 'America/Los_Angeles';
  const nowPT = nowInTZ(TZ, new Date()); // wall-clock PT "now"

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

    The current day/time in the user's time zone (${TZ}) is:
    ${nowPT}

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

  const { startDate: searchStartDate, endDate: searchEndDate } = buildDateWindow(timeframe, nowPT);

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

  return result;
}
