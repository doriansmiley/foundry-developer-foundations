import {
  Context,
  MachineEvent,
  OfficeServiceV2,
  Summaries,
} from '@codestrap/developer-foundations-types';
import { 
  extractJsonFromBackticks,
  nowInTZ,
  buildDateWindow,
  startOfDay,
  addDays,
} from '@codestrap/developer-foundations-utils';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';

export async function summarizeCalendars(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<Summaries> {
  const TZ = 'America/Los_Angeles';
  const nowPT = nowInTZ(TZ, new Date()); // wall-clock PT “now”

  const system = `You are a helpful virtual ai assistant tasked with extracting the time frame for a calendar queries.`;

  const userPrompt = `
    Using the task from the end user below classify the time frame for the calendar query into one of the following:
    1. today (default)
    2. tomorrow
    3. this week
    4. next week

    The task from the end user:
    ${task}

    The current day/time in the user's time zone (${TZ}) is:
    ${nowPT}

    You can only respond in JSON in the following format:
    {
        timeframe: string,
        emails: string[]
    }

    For example if the ask from the user is:
    Q: "1. **Summarize Calendars** - Summarize calendars for Bob Jones <bob@codestrap.me>"
    A: {
        "timeframe": "today",
        "emails": ["bob@codestrap.me"]
    }

    Q: "1. **Summarize Calendars** - Summarize calendars for Bob Jones <bob@codestrap.me> and Jane Doe <jane@codestrap.me> for tomorrow"
    A: {
        "timeframe": "tomorrow",
        "emails": ["bob@codestrap.me", "jane@codestrap.me"]
    }

    Q: "1. **Summarize Calendars** - Summarize calendars for Bob Jones <bob@codestrap.me> for the week"
    A: {
        "timeframe": "this week",
        "emails": ["bob@codestrap.me"]
    }

    Q: "1. **Summarize Calendars** - Summarize calendars for Bob Jones <bob@codestrap.me> for next week"
    A: {
        "timeframe": "next week",
        "emails": ["bob@codestrap.me"]
    }
    `;

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  const response = await geminiService(userPrompt, system);

  const clean = extractJsonFromBackticks(response);

  const { timeframe, emails } = JSON.parse(clean) as {
    timeframe: string;
    emails: string[];
  };

  const { startDate, endDate } = buildDateWindow(timeframe, nowPT);
  
  const windowStartLocal = startDate ?? startOfDay(nowPT);
  const windowEndLocal = endDate ?? startOfDay(addDays(nowPT, 1));

  const officeService = await container.getAsync<OfficeServiceV2>(
    TYPES.OfficeService
  );

  const result = await officeService.summarizeCalendars({
    emails,
    timezone: TZ,
    windowStartLocal,
    windowEndLocal,
  });

  return result;
}
