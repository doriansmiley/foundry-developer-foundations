import {
  MeetingRequest,
  DerivedWindow,
} from '@codestrap/developer-foundations-types';

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
      const candidateStr =
        localDateString && localDateString.trim()
          ? localDateString
          : req.timeframe_context;

      // ISO without timezone (e.g., 2025-09-01T09:30 or 2025-09-01 09:30)
      const isoNoTZ = /^\s*\d{4}-\d{2}-\d{2}[T\s]\d{2}:\d{2}(?::\d{2})?\s*$/;

      let candidate: Date;
      if (isoNoTZ.test(candidateStr)) {
        // Interpret as wall-clock in target timezone
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const m = candidateStr.match(
          /^\s*(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?\s*$/
        )!;
        const [year, month, day, hour, minute, second] = [
          +m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || '0'),
        ];

        // Use Intl with target timezone to get UTC instant
        const dtf = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        const parts = Object.fromEntries(
          dtf.formatToParts(new Date(year, month - 1, day, hour, minute, second))
            .map(x => [x.type, x.value])
        );

        candidate = new Date(Date.UTC(
          Number(parts['year']),
          Number(parts['month']) - 1,
          Number(parts['day']),
          Number(parts['hour']),
          Number(parts['minute']),
          Number(parts['second'])
        ));
      } else {
        // Let JS parse any other format (incl. "Wed Sep 03 2025 ... GMT-0700 (...)")
        const parsed = new Date(candidateStr);
        if (isNaN(parsed.getTime())) {
          throw new Error(
            `Invalid localDateString for exact meeting time: "${candidateStr}"`
          );
        }
        candidate = parsed;
      }

      // Normalize seconds with UTC setters (host-agnostic)
      candidate.setUTCSeconds(0, 0);

      const windowStartLocal = new Date(candidate);
      const windowEndLocal = new Date(
        candidate.getTime() + duration_minutes * 60_000
      );
      const slotStepMinutes = 1;

      const clampedStart = clampToWorkingInstant(windowStartLocal, working_hours);
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
  return new Date(Date.UTC(
    Number(p['year']),
    Number(p['month']) - 1,
    Number(p['day']),
    Number(p['hour']),
    Number(p['minute']),
    Number(p['second']),
    0
  ));
}

function startOfDayLocal(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number): Date {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + days);
  return x;
}

function isWeekend(d: Date): boolean {
  const dow = d.getUTCDay();
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
  start.setUTCHours(hours.start_hour, 0, 0, 0);
  const end = new Date(x);
  end.setUTCHours(hours.end_hour, 0, 0, 0);

  if (within >= end) {
    // move to next business day start
    let y = startOfDayLocal(addDays(x, 1));
    while (isWeekend(y)) {
      y = startOfDayLocal(addDays(y, 1));
    }
    y.setUTCHours(hours.start_hour, 0, 0, 0);
    return y;
  }

  if (within < start) return new Date(start);

  return within;
}

function startOfWeekMonday(d: Date): Date {
  const x = startOfDayLocal(d);
  const dow = x.getUTCDay(); // 0 Sun .. 6 Sat
  const delta = dow === 0 ? -6 : 1 - dow; // move to Monday
  return startOfDayLocal(addDays(x, delta));
}

function startOfNextWeek(d: Date, hours: { start_hour: number }): Date {
  const nextMon = addDays(startOfWeekMonday(d), 7);
  nextMon.setUTCHours(hours.start_hour, 0, 0, 0);
  return nextMon;
}

function endOfWorkWeek(d: Date, hours: { end_hour: number }): Date {
  // Friday of the week containing d
  const mon = startOfWeekMonday(d);
  const fri = addDays(mon, 4); // Mon + 4 = Fri
  fri.setUTCHours(hours.end_hour, 0, 0, 0);
  return fri;
}

function endOfCurrentOrNextWorkWeek(
  start: Date,
  hours: { end_hour: number }
): Date {
  const end = endOfWorkWeek(start, hours);
  if (start.getTime() >= end.getTime()) {
    return endOfWorkWeek(addDays(start, 7), hours);
  }
  return end;
}
