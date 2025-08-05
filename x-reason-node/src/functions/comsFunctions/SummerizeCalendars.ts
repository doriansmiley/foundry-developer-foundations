import { Context, MachineEvent } from "@xreason/reasoning/types";
import { extractJsonFromBackticks } from "@xreason/utils";
import { container } from "@xreason/inversify.config";
import { GeminiService, OfficeServiceV2, Summaries, TYPES } from "@xreason/types";

function nowInTZ(tz: string, ref: Date): Date {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const p = Object.fromEntries(dtf.formatToParts(ref).map(x => [x.type, x.value]));
    return new Date(
        Number(p.year),
        Number(p.month) - 1,
        Number(p.day),
        Number(p.hour),
        Number(p.minute),
        Number(p.second),
        0,
    );
}

function startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

function addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
}

function startOfWeekMonday(d: Date): Date {
    const x = startOfDay(d);
    const dow = x.getDay();             // Sun=0..Sat=6
    const delta = dow === 0 ? -6 : 1 - dow;
    return startOfDay(addDays(x, delta));
}

export async function summarizeCalendars(context: Context, event?: MachineEvent, task?: string): Promise<Summaries> {
    const system = `You are a helpful virtual ai assistant tasked with extracting the time frame for a calendar queries.`;

    const userPrompt = `
    Using the task from the end user below classify the time frame for the calendar query into one of the following:
    1. today (default)
    2. tomorrow
    3. this week

    The task from the end user:
    ${task}

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
    `;

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(userPrompt, system);
    // eslint-disable-next-line no-useless-escape
    const extractedResponse = extractJsonFromBackticks(response.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}");
    const { timeframe, emails } = JSON.parse(extractedResponse) as { timeframe: string, emails: string[] };

    /* ---------- build PT window ---------- */
    const TZ = 'America/Los_Angeles';
    const nowPT = nowInTZ(TZ, new Date());       // wall-clock PT “now”

    let windowStartLocal: Date;
    let windowEndLocal: Date;

    switch (timeframe) {
        case 'tomorrow': {
            windowStartLocal = startOfDay(addDays(nowPT, 1));          // tomorrow 00:00
            windowEndLocal = startOfDay(addDays(nowPT, 2));          // day after tomorrow 00:00
            break;
        }
        case 'this week': {
            windowStartLocal = startOfDay(nowPT);                      // today 00:00
            const nextMon = startOfWeekMonday(addDays(nowPT, 7));      // next week’s Monday 00:00
            windowEndLocal = nextMon;
            break;
        }
        case 'today':
        default: {
            windowStartLocal = startOfDay(nowPT);                      // today 00:00
            windowEndLocal = startOfDay(addDays(nowPT, 1));          // tomorrow 00:00
        }
    }

    const officeService = await container.getAsync<OfficeServiceV2>(
        TYPES.OfficeService,
    );

    const result = await officeService.summarizeCalendars({
        emails,
        timezone: TZ,
        windowStartLocal,
        windowEndLocal,
    });

    return result;
}