import {
  MeetingRequest,
  DerivedWindow,
} from '@codestrap/developer-foundations-types';

/**
 * Derive a scheduling window from a MeetingRequest.
 *
 * @param req       Meeting request
 * @param currentTZ Time zone the incoming wall-clock values are encoded in
 * @param targetTZ  Time zone to normalize all outputs to
 * @param now       "Now" (defaults to system clock)
 */
export function deriveWindowFromTimeframe(
  req: MeetingRequest,
  currentTZ: string,
  targetTZ: string,
  now: Date = new Date()
): DerivedWindow {
  const {
    timeframe_context,
    working_hours,
    duration_minutes,
    localDateString,
  } = req;
  const stepDefault = 30;

  // Normalize "now" from currentTZ → targetTZ (as an absolute instant)
  const localNow = nowInTZ(targetTZ, currentTZ, now);

  switch (timeframe_context) {
    case 'user defined exact date/time': {
      const candidateStr =
        localDateString && localDateString.trim()
          ? localDateString
          : req.timeframe_context;

      // ISO without timezone (e.g., 2025-07-22T10:10 or 2025-07-22 10:10[:ss])
      const isoNoTZ = /^\s*\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}(?::\d{2})?\s*$/;

      let candidate: Date;
      if (isoNoTZ.test(candidateStr)) {
        // Interpret as wall-clock in currentTZ → UTC instant
        const m = candidateStr.match(
          /^\s*(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?\s*$/
        )!;
        const [Y, M, D, h, mm, s] = [+m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || '0')];
        candidate = wallClockToUTC(Y, M, D, h, mm, s, currentTZ);
      } else {
        // Strings with explicit offset are real instants already
        const parsed = new Date(candidateStr);
        if (isNaN(parsed.getTime())) {
          throw new Error(
            `Invalid localDateString for exact meeting time: "${candidateStr}"`
          );
        }
        candidate = parsed;
      }

      // Snap seconds/millis
      candidate.setUTCSeconds(0, 0);

      const windowStartLocal = candidate; // absolute instant
      const windowEndLocal = new Date(candidate.getTime() + duration_minutes * 60_000);
      const slotStepMinutes = 1;

      // ↓↓↓ The fix: clamp boundaries computed in **targetTZ wall-clock**
      const clampedStart = clampToWorkingInstant(windowStartLocal, working_hours, targetTZ);
      const clampedEnd = new Date(
        Math.max(
          clampedStart.getTime() + duration_minutes * 60_000,
          windowEndLocal.getTime()
        )
      );

      return { windowStartLocal: clampedStart, windowEndLocal: clampedEnd, slotStepMinutes };
    }

    case 'as soon as possible': {
      const start = clampToWorkingInstant(localNow, working_hours, targetTZ);
      const endOfSpan = endOfCurrentOrNextWorkWeek(start, working_hours, targetTZ);
      return { windowStartLocal: start, windowEndLocal: endOfSpan, slotStepMinutes: stepDefault };
    }

    case 'this week': {
      const start = clampToWorkingInstant(localNow, working_hours, targetTZ);
      const end = endOfWorkWeek(start, working_hours, targetTZ);
      if (start.getTime() >= end.getTime()) {
        const next = startOfNextWeek(start, working_hours, targetTZ);
        const endNext = endOfWorkWeek(next, working_hours, targetTZ);
        return { windowStartLocal: next, windowEndLocal: endNext, slotStepMinutes: stepDefault };
      }
      return { windowStartLocal: start, windowEndLocal: end, slotStepMinutes: stepDefault };
    }

    case 'next week': {
      const start = startOfNextWeek(localNow, working_hours, targetTZ);
      const end = endOfWorkWeek(start, working_hours, targetTZ);
      return { windowStartLocal: start, windowEndLocal: end, slotStepMinutes: stepDefault };
    }

    default: {
      const start = clampToWorkingInstant(localNow, working_hours, targetTZ);
      const endOfSpan = endOfCurrentOrNextWorkWeek(start, working_hours, targetTZ);
      return { windowStartLocal: start, windowEndLocal: endOfSpan, slotStepMinutes: stepDefault };
    }
  }
}

/* ---------- TZ-aware helpers ---------- */

/**
 * Convert a Date from one timezone (currentTZ) to another (targetTZ).
 * If both are equal → no shift.
 */
function nowInTZ(targetTZ: string, currentTZ: string, ref: Date): Date {
  const inCurrent = partsInTZ(ref, currentTZ);
  const inTarget = partsInTZ(ref, targetTZ);
  const instantCurrent = Date.UTC(
    inCurrent.year, inCurrent.month - 1, inCurrent.day,
    inCurrent.hour, inCurrent.minute, inCurrent.second
  );
  const instantTarget = Date.UTC(
    inTarget.year, inTarget.month - 1, inTarget.day,
    inTarget.hour, inTarget.minute, inTarget.second
  );
  return new Date(ref.getTime() + (instantTarget - instantCurrent));
}

/**
 * Interpret a wall-clock Y-M-D h:m:s in `tz` as a UTC instant.
 * Robust across DST transitions.
 */
function wallClockToUTC(
  year: number, month: number, day: number,
  hour: number, minute: number, second: number,
  tz: string
): Date {
  // Start with a baseline UTC instant equal to the wall-clock fields.
  let utcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  // Iterate to converge (handles DST edges)
  for (let i = 0; i < 3; i++) {
    const got = partsInTZ(new Date(utcMs), tz);
    const gotMs = Date.UTC(got.year, got.month - 1, got.day, got.hour, got.minute, got.second);
    const wantMs = Date.UTC(year, month - 1, day, hour, minute, second);
    const delta = wantMs - gotMs;
    if (delta === 0) break;
    utcMs += delta;
  }
  return new Date(utcMs);
}

/** Extract Y/M/D/h/m/s in a given TZ for a given instant */
function partsInTZ(d: Date, tz: string): {
  year: number; month: number; day: number;
  hour: number; minute: number; second: number;
} {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const p = Object.fromEntries(dtf.formatToParts(d).map(x => [x.type, x.value]));
  return {
    year: +p['year'],
    month: +p['month'],
    day: +p['day'],
    hour: +p['hour'],
    minute: +p['minute'],
    second: +p['second'],
  };
}

/** Start of day (00:00) in tz as a UTC instant — FIXED to be TZ midnight, not UTC midnight */
function startOfDayLocal(d: Date, tz: string): Date {
  const p = partsInTZ(d, tz);
  return wallClockToUTC(p.year, p.month, p.day, 0, 0, 0, tz);
}

/** Add whole days in tz (handles DST). Returns midnight of the resulting day in tz. */
function addDaysTZ(d: Date, days: number, tz: string): Date {
  const p = partsInTZ(d, tz);
  return wallClockToUTC(p.year, p.month, p.day + days, 0, 0, 0, tz);
}

/** Day-of-week in tz: 0=Sun..6=Sat */
function dowInTZ(d: Date, tz: string): number {
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' });
  const w = fmt.format(d);
  switch (w) {
    case 'Sun': return 0;
    case 'Mon': return 1;
    case 'Tue': return 2;
    case 'Wed': return 3;
    case 'Thu': return 4;
    case 'Fri': return 5;
    case 'Sat': return 6;
    default: return new Date(d).getUTCDay();
  }
}

function isWeekendTZ(d: Date, tz: string): boolean {
  const dow = dowInTZ(d, tz);
  return dow === 0 || dow === 6;
}

/**
 * Clamp an instant to working hours on that day in tz.
 * If before start → bump to start; if after end → next business day's start.
 */
function clampToWorkingInstant(
  instant: Date,
  hours: { start_hour: number; end_hour: number },
  tz: string
): Date {
  let x = new Date(instant);

  // If weekend, move forward to next Monday start in tz
  while (isWeekendTZ(x, tz)) {
    x = addDaysTZ(x, 1, tz); // midnight next day in tz
  }

  const p = partsInTZ(x, tz); // the actual day in tz we care about
  const start = wallClockToUTC(p.year, p.month, p.day, hours.start_hour, 0, 0, tz);
  const end = wallClockToUTC(p.year, p.month, p.day, hours.end_hour, 0, 0, tz);

  if (x >= end) {
    // move to next business day start
    let y = addDaysTZ(x, 1, tz);
    while (isWeekendTZ(y, tz)) {
      y = addDaysTZ(y, 1, tz);
    }
    const py = partsInTZ(y, tz);
    return wallClockToUTC(py.year, py.month, py.day, hours.start_hour, 0, 0, tz);
  }

  if (x < start) return start;

  return x;
}

function startOfWeekMonday(d: Date, tz: string): Date {
  const day0 = startOfDayLocal(d, tz);
  const dow = dowInTZ(day0, tz);
  const delta = dow === 0 ? -6 : 1 - dow; // move to Monday
  return addDaysTZ(day0, delta, tz);
}

function startOfNextWeek(d: Date, hours: { start_hour: number }, tz: string): Date {
  const nextMon = addDaysTZ(startOfWeekMonday(d, tz), 7, tz);
  const p = partsInTZ(nextMon, tz);
  return wallClockToUTC(p.year, p.month, p.day, hours.start_hour, 0, 0, tz);
}

function endOfWorkWeek(d: Date, hours: { end_hour: number }, tz: string): Date {
  const mon = startOfWeekMonday(d, tz);
  const fri = addDaysTZ(mon, 4, tz);
  const p = partsInTZ(fri, tz);
  return wallClockToUTC(p.year, p.month, p.day, hours.end_hour, 0, 0, tz);
}

function endOfCurrentOrNextWorkWeek(
  start: Date,
  hours: { end_hour: number },
  tz: string
): Date {
  const end = endOfWorkWeek(start, hours, tz);
  if (start.getTime() >= end.getTime()) {
    return endOfWorkWeek(addDaysTZ(start, 7, tz), hours, tz);
  }
  return end;
}
