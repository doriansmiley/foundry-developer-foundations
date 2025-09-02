// scheduler.ts
import { calendar_v3 } from 'googleapis';

type Busy = { start: string; end: string };
export type Slot = { start: string; end: string; score?: number };

type WorkingHours = { start_hour: number; end_hour: number };

export type FindArgs = {
  calendar: calendar_v3.Calendar;
  attendees: string[];
  timezone: string; // IANA, e.g. "America/Los_Angeles"
  windowStartLocal: Date; // local “wall clock” start (e.g., PT start)
  windowEndLocal: Date;   // local “wall clock” end   (e.g., PT end)
  durationMinutes: number;
  workingHours: WorkingHours;
  slotStepMinutes?: number; // default 30
  skipFriday?: boolean;     // default false
  fallbackOffsetMinutes?: number; // e.g. -480/-420
};

export async function findOptimalMeetingTimeV2({
  calendar,
  attendees,
  timezone,
  windowStartLocal,
  windowEndLocal,
  durationMinutes,
  workingHours,
  slotStepMinutes = 30,
  skipFriday = false,
  fallbackOffsetMinutes = -420,
}: FindArgs): Promise<Slot[]> {
  // Convert wall-clock window into UTC instants (DST-safe, host-agnostic)
  const windowStartUTC = toUTCFromWallClock(windowStartLocal, timezone, fallbackOffsetMinutes);
  const windowEndUTC = toUTCFromWallClock(windowEndLocal, timezone, fallbackOffsetMinutes);

  // Pull busy blocks via FreeBusy in UTC
  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: windowStartUTC.toISOString(),
      timeMax: windowEndUTC.toISOString(),
      timeZone: 'UTC',
      items: attendees.map((id) => ({ id })),
    },
  });

  const calendars = fb.data.calendars ?? {};
  const allBusy: Busy[] = [];
  for (const calId in calendars) {
    const periods = calendars[calId]?.busy ?? [];
    for (const p of periods) {
      if (p.start && p.end && !isNaN(Date.parse(p.start)) && !isNaN(Date.parse(p.end))) {
        allBusy.push({ start: p.start, end: p.end });
      }
    }
  }

  const mergedBusy = mergeBusyIntervals(allBusy);

  // Build per-day working windows as UTC instants, iterating days in `timezone`
  const dailyWorkWindowsUTC = buildWorkingWindowsUTC(
    windowStartLocal,
    windowEndLocal,
    timezone,
    workingHours,
    skipFriday,
    fallbackOffsetMinutes
  );

  // Subtract busy from those windows (all UTC instants)
  const freeIntervals = subtractBusyFromWindows(dailyWorkWindowsUTC, mergedBusy);

  // Slice into candidate slots, score, and format with zone offset suffix
  const slots = sliceIntoSlots(freeIntervals, durationMinutes, slotStepMinutes)
    .map((s) => ({
      start: toZonedISOString(s.start, timezone, fallbackOffsetMinutes),
      end: toZonedISOString(s.end, timezone, fallbackOffsetMinutes),
      score: simpleHeuristicScore(s.start),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return slots;
}

/* ========================= TZ-ROBUST CORE HELPERS ========================= */

/** Safe TZ parts: tries Intl; on failure, uses fallback offset minutes. */
function partsInTZSafe(
  d: Date,
  tz: string,
  fallbackOffsetMinutes: number
): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    });
    const p = Object.fromEntries(dtf.formatToParts(d).map(x => [x.type, x.value]));
    return {
      year: +p['year'], month: +p['month'], day: +p['day'],
      hour: +p['hour'], minute: +p['minute'], second: +p['second'],
    };
  } catch {
    // Fallback: represent the instant shifted by the fallback offset, then read UTC fields
    const local = new Date(d.getTime() + fallbackOffsetMinutes * 60_000);
    return {
      year: local.getUTCFullYear(),
      month: local.getUTCMonth() + 1,
      day: local.getUTCDate(),
      hour: local.getUTCHours(),
      minute: local.getUTCMinutes(),
      second: local.getUTCSeconds(),
    };
  }
}

/** Offset (minutes) for a given UTC instant in tz. Positive if tz AHEAD of UTC, negative if behind. */
function getOffsetForUTCInstant(tz: string, utc: Date, fallback = -420): number {
  try {
    const map = partsInTZSafe(utc, tz, fallback);
    const asIfUTC = Date.UTC(map.year, map.month - 1, map.day, map.hour, map.minute, map.second);
    return Math.round((asIfUTC - utc.getTime()) / 60000);
  } catch {
    return fallback;
  }
}

/** Build a UTC instant from a wall-clock Date (Y/M/D/H/M/S) in tz (DST-safe, host-agnostic) */
export function toUTCFromWallClock(localWall: Date, tz: string, fallback = -420): Date {
  const y = localWall.getFullYear();
  const m0 = localWall.getMonth(); // 0-based
  const d = localWall.getDate();
  const H = localWall.getHours();
  const M = localWall.getMinutes();
  const S = localWall.getSeconds();

  // First guess: interpret the wall clock as if it were UTC.
  const guessUTC = new Date(Date.UTC(y, m0, d, H, M, S));

  // Compute tz offset at that instant; adjust to get the true UTC instant.
  const offMin = getOffsetForUTCInstant(tz, guessUTC, fallback);
  return new Date(guessUTC.getTime() - offMin * 60_000);
}

/** ISO string for the SAME instant, formatted in target tz with ±HH:MM suffix (fallback-safe) */
export function toZonedISOString(utc: Date, tz: string, fallback = -420): string {
  const map = partsInTZSafe(utc, tz, fallback);
  const offMin = getOffsetForUTCInstant(tz, utc, fallback);
  const sign = offMin >= 0 ? '+' : '-';
  const abs = Math.abs(offMin);
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');

  return `${pad(map.year, 4)}-${pad(map.month)}-${pad(map.day)}T${pad(map.hour)}:${pad(map.minute)}:${pad(map.second)}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** Midnight of the same calendar day *in tz* (returns a UTC instant) */
function startOfDayTZ(localWall: Date, tz: string, fallback = -420): Date {
  const y = localWall.getFullYear();
  const m0 = localWall.getMonth();
  const d = localWall.getDate();
  return toUTCFromWallClock(new Date(y, m0, d, 0, 0, 0), tz, fallback);
}

/** Add whole days relative to tz’s calendar (returns midnight of resulting day as a UTC instant) */
function addDaysTZFromUTC(dayUTC: Date, days: number, tz: string, fallback = -420): Date {
  const p = partsInTZSafe(dayUTC, tz, fallback);
  return toUTCFromWallClock(new Date(p.year, p.month - 1, p.day + days, 0, 0, 0), tz, fallback);
}

/** Safe weekday string 'Sun'..'Sat' in tz; falls back using fallback offset when Intl fails */
function weekdayShortSafe(d: Date, tz: string, fallback = -420): 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' });
    return fmt.format(d) as any;
  } catch {
    const shifted = new Date(d.getTime() + fallback * 60_000);
    const dow = shifted.getUTCDay(); // 0..6
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dow] as any;
  }
}

/* =========================== BUSY/INTERVAL HELPERS =========================== */

function mergeBusyIntervals(busy: Busy[]): Busy[] {
  if (!busy.length) return [];
  const sorted = busy
    .map((b) => ({ start: new Date(b.start), end: new Date(b.end) }))
    .filter((b) => !isNaN(b.start.getTime()) && !isNaN(b.end.getTime()))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const merged: { start: Date; end: Date }[] = [];
  let cur = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    if (next.start <= cur.end) {
      if (next.end > cur.end) cur.end = next.end;
    } else {
      merged.push(cur);
      cur = next;
    }
  }
  merged.push(cur);
  return merged.map((m) => ({
    start: m.start.toISOString(),
    end: m.end.toISOString(),
  }));
}

type Interval = { start: Date; end: Date };

/** Build per-day working windows as UTC instants, iterating calendar days in `tz` (DST & fallback safe) */
function buildWorkingWindowsUTC(
  windowStartLocal: Date,
  windowEndLocal: Date,
  tz: string,
  hours: WorkingHours,
  skipFriday: boolean,
  fallbackOffset = -420
): Interval[] {
  const result: Interval[] = [];

  // Interpret provided wall-clock bounds as tz midnights & iterate by tz calendar
  const startDayUTC = startOfDayTZ(windowStartLocal, tz, fallbackOffset);
  const endDayUTC = startOfDayTZ(windowEndLocal, tz, fallbackOffset);

  // Clip bounds (convert exact local walls to UTC instants in tz)
  const clipStartUTC = toUTCFromWallClock(windowStartLocal, tz, fallbackOffset);
  const clipEndUTC = toUTCFromWallClock(windowEndLocal, tz, fallbackOffset);

  for (let dayUTC = new Date(startDayUTC); dayUTC.getTime() <= endDayUTC.getTime();) {
    const dow = weekdayShortSafe(dayUTC, tz, fallbackOffset); // 'Sun'..'Sat'
    const isWeekend = dow === 'Sat' || dow === 'Sun';
    const isFriday = dow === 'Fri';

    if (!isWeekend && !(skipFriday && isFriday)) {
      const p = partsInTZSafe(dayUTC, tz, fallbackOffset);

      const dayStartUTC = toUTCFromWallClock(
        new Date(p.year, p.month - 1, p.day, hours.start_hour, 0, 0),
        tz,
        fallbackOffset
      );
      const dayEndUTC = toUTCFromWallClock(
        new Date(p.year, p.month - 1, p.day, hours.end_hour, 0, 0),
        tz,
        fallbackOffset
      );

      const start = new Date(Math.max(dayStartUTC.getTime(), clipStartUTC.getTime()));
      const end = new Date(Math.min(dayEndUTC.getTime(), clipEndUTC.getTime()));

      if (start < end) result.push({ start, end });
    }

    // Advance exactly one calendar day in tz
    dayUTC = addDaysTZFromUTC(dayUTC, 1, tz, fallbackOffset);
  }

  return result;
}

function subtractBusyFromWindows(windows: Interval[], busy: Busy[]): Interval[] {
  const sortedWindows = windows.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
  const busyUTC = busy
    .map((b) => ({ start: new Date(b.start), end: new Date(b.end) }))
    .filter((b) => !isNaN(b.start.getTime()) && !isNaN(b.end.getTime()))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const result: Interval[] = [];
  let i = 0;

  for (const win of sortedWindows) {
    let cursor = new Date(win.start);
    while (i < busyUTC.length && busyUTC[i].end <= win.start) i++;

    for (let j = i; j < busyUTC.length; j++) {
      const b = busyUTC[j];
      if (b.start >= win.end) break;
      if (b.end <= cursor) continue;
      if (b.start > cursor) result.push({ start: cursor, end: new Date(b.start) });
      cursor = new Date(Math.max(cursor.getTime(), b.end.getTime()));
    }

    if (cursor < win.end) result.push({ start: cursor, end: new Date(win.end) });
  }

  return mergeAdjacent(result);
}

function mergeAdjacent(intervals: Interval[]): Interval[] {
  if (!intervals.length) return [];
  const sorted = intervals.slice().sort((a, b) => a.start.getTime() - b.start.getTime());
  const merged: Interval[] = [];
  let cur = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    if (next.start <= cur.end) {
      if (next.end > cur.end) cur.end = next.end;
    } else {
      merged.push(cur);
      cur = next;
    }
  }
  merged.push(cur);
  return merged;
}

function sliceIntoSlots(free: Interval[], durationMinutes: number, stepMinutes: number): Interval[] {
  const slots: Interval[] = [];
  const durMs = durationMinutes * 60_000;
  const stepMs = stepMinutes * 60_000;

  for (const f of free) {
    let t = roundUpToStepUTC(f.start, stepMinutes); // round in UTC (host-agnostic)
    while (t.getTime() + durMs <= f.end.getTime()) {
      const end = new Date(t.getTime() + durMs);
      slots.push({ start: new Date(t), end });
      t = new Date(t.getTime() + stepMs);
    }
  }
  return slots;
}

/** Round up an instant to the next step boundary in UTC (host-TZ agnostic) */
function roundUpToStepUTC(d: Date, stepMinutes: number): Date {
  const t = new Date(d.getTime());
  const mins = t.getUTCMinutes();
  const rem = mins % stepMinutes;
  if (rem !== 0) {
    t.setUTCMinutes(mins - rem + stepMinutes, 0, 0);
  } else {
    t.setUTCSeconds(0, 0);
  }
  return t;
}

/* =============================== SCORING =============================== */

function simpleHeuristicScore(startUTC: Date): number {
  const hoursFromNow = (startUTC.getTime() - Date.now()) / 3_600_000;
  return Math.max(0, 100 - Math.min(hoursFromNow * 0.5, 20));
}
