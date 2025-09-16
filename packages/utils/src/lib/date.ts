export function formatIsoDateStringForLocalDate (date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Converts a reference date to the equivalent time in a specific timezone
 * @param tz - The timezone string (e.g., 'America/Los_Angeles')
 * @param ref - The reference date to convert
 * @returns Date object representing the time in the specified timezone
 */
export function nowInTZ(tz: string, ref: Date): Date {
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
  const p = Object.fromEntries(
    dtf.formatToParts(ref).map((x) => [x.type, x.value])
  );
  return new Date(
    Number(p["year"]),
    Number(p["month"]) - 1,
    Number(p["day"]),
    Number(p["hour"]),
    Number(p["minute"]),
    Number(p["second"]),
    0
  );
}

/**
 * Returns the start of day (00:00:00) for a given date
 * @param d - The input date
 * @returns New Date object set to start of day
 */
export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * Adds a specified number of days to a date
 * @param d - The input date
 * @param days - Number of days to add (can be negative)
 * @returns New Date object with days added
 */
export function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

/**
 * Returns the start of the week (Monday) for a given date
 * @param d - The input date
 * @returns New Date object set to start of week (Monday 00:00:00)
 */
export function startOfWeekMonday(d: Date): Date {
  const x = startOfDay(d);
  const dow = x.getDay(); // Sun=0..Sat=6
  const delta = dow === 0 ? -6 : 1 - dow;
  return startOfDay(addDays(x, delta));
}

/**
 * Date window configuration for different timeframes
 */
export interface DateWindow {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

/**
 * Builds a date window based on timeframe and reference date
 * @param timeframe - The timeframe string (today, tomorrow, this week, etc.)
 * @param nowPT - The current date/time in the target timezone
 * @returns DateWindow object with start and end dates
 */
export function buildDateWindow(timeframe: string, nowPT: Date): DateWindow {
  let startDate: Date | undefined;
  let endDate: Date | undefined;

  switch (timeframe) {
    case 'tomorrow': {
      startDate = startOfDay(addDays(nowPT, 1)); // tomorrow 00:00
      endDate = startOfDay(addDays(nowPT, 2)); // day after tomorrow 00:00
      break;
    }
    case 'yesterday': {
      startDate = startOfDay(addDays(nowPT, -1)); // yesterday 00:00
      endDate = startOfDay(nowPT); // today 00:00
      break;
    }
    case 'this week': {
      startDate = startOfWeekMonday(nowPT); // this week's Monday 00:00
      endDate = startOfDay(addDays(nowPT, 1)); // tomorrow 00:00
      break;
    }
    case 'next week': {
      const nextMon = startOfWeekMonday(addDays(nowPT, 7)); // next Monday 00:00
      startDate = nextMon; // start of next week
      endDate = startOfDay(addDays(nextMon, 7)); // following Monday 00:00
      break;
    }
    case 'last week': {
      const lastWeekStart = startOfWeekMonday(addDays(nowPT, -7)); // last week's Monday 00:00
      startDate = lastWeekStart;
      endDate = startOfWeekMonday(nowPT); // this week's Monday 00:00
      break;
    }
    case 'this month': {
      const firstOfMonth = new Date(nowPT.getFullYear(), nowPT.getMonth(), 1);
      startDate = startOfDay(firstOfMonth);
      endDate = startOfDay(addDays(nowPT, 1)); // tomorrow 00:00
      break;
    }
    case 'last month': {
      const firstOfLastMonth = new Date(nowPT.getFullYear(), nowPT.getMonth() - 1, 1);
      const firstOfThisMonth = new Date(nowPT.getFullYear(), nowPT.getMonth(), 1);
      startDate = startOfDay(firstOfLastMonth);
      endDate = startOfDay(firstOfThisMonth);
      break;
    }
    case 'all time': {
      // No date restrictions
      break;
    }
    case 'today':
    default: {
      startDate = startOfDay(nowPT); // today 00:00
      endDate = startOfDay(addDays(nowPT, 1)); // tomorrow 00:00
    }
  }

  return { startDate, endDate };
}