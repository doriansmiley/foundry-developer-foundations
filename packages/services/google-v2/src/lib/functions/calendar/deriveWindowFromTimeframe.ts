import { MeetingRequest, DerivedWindow } from '../../types/calendar.types';

export function deriveWindowFromTimeframe(
  req: MeetingRequest,
  timezone: string,
  now: Date = new Date()
): DerivedWindow {
  const {
    timeframe_context,
    working_hours,
    duration_minutes,
    localDateString,
  } = req;
  const stepDefault = 30;

  // Get "now" as a PT wall-clock Date (safe against host TZ)
  const localNow = nowInTZ(timezone, now);

  switch (timeframe_context) {
    case 'user defined exact date/time': {
      // Use localDateString when provided; fall back to timeframe_context if they passed a date there
      const candidateStr =
        localDateString && localDateString.trim()
          ? localDateString
          : req.timeframe_context;
      const candidate = new Date(candidateStr);
      if (isNaN(candidate.getTime())) {
        throw new Error(
          `Invalid localDateString for exact meeting time: "${candidateStr}"`
        );
      }
      // Normalize seconds to 0 so we align to minute precision
      candidate.setSeconds(0, 0);

      // Build a narrow window around the exact desired start
      const windowStartLocal = new Date(candidate);
      const windowEndLocal = new Date(
        candidate.getTime() + duration_minutes * 60_000
      );

      // Force minute-level stepping so we can return the exact minute if it's free (no rounding surprises)
      const slotStepMinutes = 1;

      // Clamp to business hours (if they gave a time outside hours, move to next valid business instant)
      const clampedStart = clampToWorkingInstant(
        windowStartLocal,
        working_hours
      );
      const clampedEnd = new Date(
        Math.max(
          clampedStart.getTime() + duration_minutes * 60_000,
          windowEndLocal.getTime()
        )
      );

      return {
        windowStartLocal: clampedStart,
        windowEndLocal: clampedEnd,
        slotStepMinutes,
      };
    }

    case 'as soon as possible': {
      const start = clampToWorkingInstant(localNow, working_hours);
      // Search through end of THIS work week; if we're past Friday close, use NEXT week end
      const endOfSpan = endOfCurrentOrNextWorkWeek(start, working_hours);
      return {
        windowStartLocal: start,
        windowEndLocal: endOfSpan,
        slotStepMinutes: stepDefault,
      };
    }

    case 'this week': {
      // From now (clamped) to Friday 17:00 of the current ISO week; if already past, return next week window
      const start = clampToWorkingInstant(localNow, working_hours);
      const end = endOfWorkWeek(start, working_hours);
      if (start.getTime() >= end.getTime()) {
        // We're past business close for this week; bump to next week
        const next = startOfNextWeek(start, working_hours);
        const endNext = endOfWorkWeek(next, working_hours);
        return {
          windowStartLocal: next,
          windowEndLocal: endNext,
          slotStepMinutes: stepDefault,
        };
      }
      return {
        windowStartLocal: start,
        windowEndLocal: end,
        slotStepMinutes: stepDefault,
      };
    }

    case 'next week': {
      const start = startOfNextWeek(localNow, working_hours);
      const end = endOfWorkWeek(start, working_hours);
      return {
        windowStartLocal: start,
        windowEndLocal: end,
        slotStepMinutes: stepDefault,
      };
    }

    default: {
      // Fallback: treat like ASAP
      const start = clampToWorkingInstant(localNow, working_hours);
      const endOfSpan = endOfCurrentOrNextWorkWeek(start, working_hours);
      return {
        windowStartLocal: start,
        windowEndLocal: endOfSpan,
        slotStepMinutes: stepDefault,
      };
    }
  }
}

/* ---------- date helpers (PT-safe wall-clock) ---------- */

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
  const p = Object.fromEntries(
    dtf.formatToParts(ref).map((x) => [x.type, x.value])
  );
  return new Date(
    Number(p['year']),
    Number(p['month']) - 1,
    Number(p['day']),
    Number(p['hour']),
    Number(p['minute']),
    Number(p['second']),
    0
  );
}

function startOfDayLocal(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function isWeekend(d: Date): boolean {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function clampToWorkingInstant(
  d: Date,
  hours: { start_hour: number; end_hour: number }
): Date {
  let x = new Date(d);
  // If weekend, move to next Monday at start_hour
  while (isWeekend(x)) {
    x = startOfDayLocal(addDays(x, 1));
  }
  const within = new Date(x);
  const start = new Date(x);
  start.setHours(hours.start_hour, 0, 0, 0);
  const end = new Date(x);
  end.setHours(hours.end_hour, 0, 0, 0);

  if (within >= end) {
    // move to next business day start
    let y = startOfDayLocal(addDays(x, 1));
    while (isWeekend(y)) {
      y = startOfDayLocal(addDays(y, 1));
    }
    y.setHours(hours.start_hour, 0, 0, 0);
    return y;
  }
  if (within < start) {
    return new Date(start);
  }
  return within;
}

function startOfWeekMonday(d: Date): Date {
  const x = startOfDayLocal(d);
  const dow = x.getDay(); // 0 Sun .. 6 Sat
  const delta = dow === 0 ? -6 : 1 - dow; // move to Monday
  return startOfDayLocal(addDays(x, delta));
}

function startOfNextWeek(d: Date, hours: { start_hour: number }): Date {
  const nextMon = addDays(startOfWeekMonday(d), 7);
  nextMon.setHours(hours.start_hour, 0, 0, 0);
  return nextMon;
}

function endOfWorkWeek(d: Date, hours: { end_hour: number }): Date {
  // Friday of the week containing d
  const mon = startOfWeekMonday(d);
  const fri = addDays(mon, 4); // Mon + 4 = Fri
  fri.setHours(hours.end_hour, 0, 0, 0);
  return fri;
}

function endOfCurrentOrNextWorkWeek(
  start: Date,
  hours: { end_hour: number }
): Date {
  const end = endOfWorkWeek(start, hours);
  if (start.getTime() >= end.getTime()) {
    const nextStart = startOfNextWeek(start, { start_hour: hours.end_hour }); // temporary holder; we’ll reset hours next line
    const monNext = startOfNextWeek(start, { start_hour: hours.end_hour }); // get Monday
    monNext.setHours(hours.end_hour, 0, 0, 0); // not actually used
    return endOfWorkWeek(addDays(start, 7), hours);
  }
  return end;
}
