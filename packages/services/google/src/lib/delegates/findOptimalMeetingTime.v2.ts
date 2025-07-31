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
  windowEndLocal: Date; // local “wall clock” end   (e.g., PT end)
  durationMinutes: number;
  workingHours: WorkingHours;
  slotStepMinutes?: number; // default 30
  skipFriday?: boolean; // default false
  fallbackOffsetMinutes?: number; // e.g. -480/-420 if you want a safe PT fallback
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
  const windowStartUTC = toUTCFromWallClock(
    windowStartLocal,
    timezone,
    fallbackOffsetMinutes
  );
  const windowEndUTC = toUTCFromWallClock(
    windowEndLocal,
    timezone,
    fallbackOffsetMinutes
  );

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
      if (
        p.start &&
        p.end &&
        !isNaN(new Date(p.start).getTime()) &&
        !isNaN(new Date(p.end).getTime())
      ) {
        allBusy.push({ start: p.start, end: p.end });
      }
    }
  }

  const mergedBusy = mergeBusyIntervals(allBusy);

  const dailyWorkWindowsUTC = buildWorkingWindowsUTC(
    windowStartLocal,
    windowEndLocal,
    timezone,
    workingHours,
    skipFriday,
    fallbackOffsetMinutes
  );

  const freeIntervals = subtractBusyFromWindows(
    dailyWorkWindowsUTC,
    mergedBusy
  );

  const slots = sliceIntoSlots(freeIntervals, durationMinutes, slotStepMinutes)
    .map((s) => ({
      start: toZonedISOString(s.start, timezone, fallbackOffsetMinutes),
      end: toZonedISOString(s.end, timezone, fallbackOffsetMinutes),
      score: simpleHeuristicScore(s.start),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return slots;
}

/** Offset (minutes) for a given UTC instant in IANA tz. PDT = -420, PST = -480. */
function getOffsetForUTCInstant(
  tz: string,
  utc: Date,
  fallback = -420
): number {
  try {
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
    const parts = dtf.formatToParts(utc);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const y = Number(map['year']);
    const m = Number(map['month']);
    const d = Number(map['day']);
    const H = Number(map['hour']);
    const M = Number(map['minute']);
    const S = Number(map['second']);

    // Interpret the wall clock from `tz` AS IF it were UTC.
    // The delta to the real UTC epoch is the zone offset.
    const asIfUTC = Date.UTC(y, m - 1, d, H, M, S);
    return Math.round((asIfUTC - utc.getTime()) / 60000);
  } catch {
    return fallback;
  }
}

/** Build a UTC instant from a PT wall‑clock (Y/M/D/H/M/S) independent of host TZ. */
function toUTCFromWallClock(
  localWall: Date,
  tz: string,
  fallback = -420
): Date {
  const y = localWall.getFullYear();
  const m = localWall.getMonth(); // 0-based
  const d = localWall.getDate();
  const H = localWall.getHours();
  const M = localWall.getMinutes();
  const S = localWall.getSeconds();

  // First guess: interpret the wall clock as if it's already UTC.
  const guessUTC = new Date(Date.UTC(y, m, d, H, M, S));

  // Find the tz offset at that instant; adjust to get the true UTC instant.
  const offMin = getOffsetForUTCInstant(tz, guessUTC, fallback);
  return new Date(guessUTC.getTime() - offMin * 60_000);
}

/** ISO string in target tz with correct +/-07:00 or +/-08:00 suffix (DST-safe). */
function toZonedISOString(utc: Date, tz: string, fallback = -420): string {
  try {
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
    const parts = dtf.formatToParts(utc);
    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const pad = (s: string) => s.padStart(2, '0');

    const offMin = getOffsetForUTCInstant(tz, utc, fallback);
    const sign = offMin >= 0 ? '+' : '-';
    const abs = Math.abs(offMin);
    const offH = pad(String(Math.floor(abs / 60)));
    const offM = pad(String(abs % 60));

    return `${map['year']}-${map['month']}-${map['day']}T${map['hour']}:${map['minute']}:${map['second']}${sign}${offH}:${offM}`;
  } catch {
    // Fallback: shift by fallback minutes and format manually
    const local = new Date(utc.getTime() + fallback * 60_000);
    const padN = (n: number) => String(n).padStart(2, '0');
    const sign = fallback >= 0 ? '+' : '-';
    const abs = Math.abs(fallback);
    return (
      `${local.getFullYear()}-${padN(local.getMonth() + 1)}-${padN(
        local.getDate()
      )}` +
      `T${padN(local.getHours())}:${padN(local.getMinutes())}:${padN(
        local.getSeconds()
      )}` +
      `${sign}${padN(Math.floor(abs / 60))}:${padN(abs % 60)}`
    );
  }
}

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

function buildWorkingWindowsUTC(
  windowStartLocal: Date,
  windowEndLocal: Date,
  tz: string,
  hours: WorkingHours,
  skipFriday: boolean,
  fallbackOffset = -420
): Interval[] {
  const result: Interval[] = [];
  const dayStartLocal = startOfDay(windowStartLocal);
  const lastLocalDay = startOfDay(windowEndLocal);

  for (
    let d = new Date(dayStartLocal);
    d <= lastLocalDay;
    d.setDate(d.getDate() + 1)
  ) {
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    if (skipFriday && dow === 5) continue;

    const startLocal = new Date(d);
    startLocal.setHours(hours.start_hour, 0, 0, 0);

    const endLocal = new Date(d);
    endLocal.setHours(hours.end_hour, 0, 0, 0);

    const boundedStart = new Date(
      Math.max(startLocal.getTime(), windowStartLocal.getTime())
    );
    const boundedEnd = new Date(
      Math.min(endLocal.getTime(), windowEndLocal.getTime())
    );
    if (boundedStart >= boundedEnd) continue;

    const startUTC = toUTCFromWallClock(boundedStart, tz, fallbackOffset);
    const endUTC = toUTCFromWallClock(boundedEnd, tz, fallbackOffset);
    result.push({ start: startUTC, end: endUTC });
  }
  return result;
}

function subtractBusyFromWindows(
  windows: Interval[],
  busy: Busy[]
): Interval[] {
  const sortedWindows = windows
    .slice()
    .sort((a, b) => a.start.getTime() - b.start.getTime());
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
      if (b.start > cursor)
        result.push({ start: cursor, end: new Date(b.start) });
      if (b.end > cursor) cursor = new Date(b.end);
    }

    if (cursor < win.end)
      result.push({ start: cursor, end: new Date(win.end) });
  }
  return mergeAdjacent(result);
}

function mergeAdjacent(intervals: Interval[]): Interval[] {
  if (!intervals.length) return [];
  const sorted = intervals
    .slice()
    .sort((a, b) => a.start.getTime() - b.start.getTime());
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

function sliceIntoSlots(
  free: Interval[],
  durationMinutes: number,
  stepMinutes: number
): Interval[] {
  const slots: Interval[] = [];
  const durMs = durationMinutes * 60_000;
  const stepMs = stepMinutes * 60_000;
  for (const f of free) {
    let t = roundUpToStep(f.start, stepMinutes);
    while (t.getTime() + durMs <= f.end.getTime()) {
      const end = new Date(t.getTime() + durMs);
      slots.push({ start: new Date(t), end });
      t = new Date(t.getTime() + stepMs);
    }
  }
  return slots;
}

function roundUpToStep(d: Date, stepMinutes: number): Date {
  const local = new Date(d.getTime());
  const mins = local.getMinutes();
  const remainder = mins % stepMinutes;
  if (remainder !== 0) local.setMinutes(mins - remainder + stepMinutes, 0, 0);
  else local.setSeconds(0, 0);
  return new Date(local.getTime());
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function simpleHeuristicScore(startUTC: Date): number {
  const hoursFromNow = (startUTC.getTime() - Date.now()) / 3_600_000;
  return Math.max(0, 100 - Math.min(hoursFromNow * 0.5, 20));
}
