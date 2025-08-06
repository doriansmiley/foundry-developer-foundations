import {
  FindOptimalMeetingTimeOutput,
  BusyPeriod,
  OptimalTimeContext,
  TimeSlot,
} from '@codestrap/developer-foundations-types';
import { calendar_v3 } from 'googleapis';

const LOG_PREFIX = 'GSUITE - findOptimalMeetingTime - ';

/**
 * Returns the offset (in minutes) for the target time zone on the given date.
 * For example, for America/Los_Angeles during PDT this might return 420.
 * If obtaining the offset fails, fallbackOffset (if provided) is returned.
 */
function getTimeZoneOffset(
  timeZone: string,
  date: Date,
  fallbackOffset?: number
): number {
  try {
    // Use Intl.DateTimeFormat to extract the target zone’s local parts.
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = dtf.formatToParts(date);
    const year = parts.find((p) => p.type === 'year')?.value;
    const month = parts.find((p) => p.type === 'month')?.value;
    const day = parts.find((p) => p.type === 'day')?.value;
    const hour = parts.find((p) => p.type === 'hour')?.value;
    const minute = parts.find((p) => p.type === 'minute')?.value;
    const second = parts.find((p) => p.type === 'second')?.value;
    if (!year || !month || !day || !hour || !minute || !second) {
      throw new Error('Incomplete parts');
    }
    // Construct a string in YYYY-MM-DDTHH:mm:ss format.
    const localString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
    // When parsing this string, JavaScript treats it as local time.
    const asLocal = new Date(localString);
    // The difference between the given date (an absolute instant) and asLocal is the offset.
    return Math.round((asLocal.getTime() - date.getTime()) / (60 * 1000));
  } catch (e) {
    return fallbackOffset || 0;
  }
}

/**
 * Computes meeting start and end times in GMT.
 * First, it computes the target “wall‐clock” times (using the target timezone)
 * then adjusts them to GMT using the computed offset.
 */
function calculateMeetingTime(
  timeframeContext: string,
  workingHours = { start_hour: 8, end_hour: 17 },
  now = new Date(),
  timezone: string = 'America/Los_Angeles',
  fallbackOffset?: number,
  skipFridayMeetings = false,
  meetingDuration = 30 //meeting duration in minutes
) {
  // Try to parse timeframeContext as a valid date string.
  const candidateDate = new Date(timeframeContext);
  // if an exact day/time was passed use it
  if (!isNaN(candidateDate.getTime())) {
    // A valid date string was provided
    // Assume candidateDate is already in local time with the correct offset.
    const startTime = new Date(candidateDate);
    const endTime = new Date(startTime.getTime() + meetingDuration * 60 * 1000);

    return { startTime, endTime };
  }

  // Convert the incoming date to the target timezone’s "wall clock" by using toLocaleString.
  // (Note: toLocaleString returns a string WITHOUT offset information.)
  const nowLocalString = new Date(now).toLocaleString('en-US', {
    timeZone: timezone,
  });
  // The new Date(nowLocalString) creates a Date whose clock values match the target zone,
  // but its internal value is parsed as if it were local (or GMT if TZ=UTC).
  const localNow = new Date(nowLocalString);

  if (localNow.getHours() > workingHours.end_hour - 1) {
    // Outside business hours: move to the next day start of working hours.
    localNow.setDate(localNow.getDate() + 1);
    localNow.setHours(workingHours.start_hour, 0, 0, 0);
  }

  // Create startTime and endTime as copies of the "local" now.
  let startTime = new Date(localNow);
  let endTime = new Date(localNow);

  // Adjust the "local" now for business hours.
  let daysOffset = 0;

  const currentDay = localNow.getDay();
  switch (currentDay) {
    case 5:
      if (skipFridayMeetings) {
        daysOffset = 3; // Friday -> Monday
      }
      break;
    case 6:
      daysOffset = 2; // Saturday -> Monday
      break;
    case 0:
      daysOffset = 1; // Sunday -> Monday
      break;
    default:
  }
  if (timeframeContext === 'next week') {
    const currentDay = localNow.getDay();
    let daysToNextMonday = (1 - currentDay + 7) % 7;
    if (daysToNextMonday === 0) {
      daysToNextMonday = 7;
    }
    daysOffset = daysToNextMonday;
  }

  startTime.setDate(localNow.getDate() + daysOffset);
  endTime.setDate(localNow.getDate() + daysOffset);

  startTime = roundUpToNextSlot(startTime);
  endTime = new Date(startTime.getTime() + meetingDuration * 60000);

  // Now, adjust these "local" times to GMT by adding the target timezone’s offset.
  const offsetMinutes = getTimeZoneOffset(timezone, startTime, fallbackOffset);
  const adjustedStartTime = new Date(
    startTime.getTime() - offsetMinutes * 60 * 1000
  );
  const adjustedEndTime = new Date(
    endTime.getTime() - offsetMinutes * 60 * 1000
  );

  return { startTime: adjustedStartTime, endTime: adjustedEndTime };
}

function calculateTimeSlotScore(
  slot: TimeSlot,
  allBusyTimes: BusyPeriod[]
): number {
  let score = 100;
  const hoursFromNow =
    (new Date(slot.start).getTime() - new Date().getTime()) / (1000 * 60 * 60);
  score -= Math.min(hoursFromNow * 0.5, 20);

  for (const busy of allBusyTimes) {
    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);
    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);

    const bufferBefore =
      (slotStart.getTime() - busyEnd.getTime()) / (1000 * 60);
    const bufferAfter = (busyStart.getTime() - slotEnd.getTime()) / (1000 * 60);

    if (bufferBefore > 0 && bufferBefore < 30) score -= 10;
    if (bufferAfter > 0 && bufferAfter < 30) score -= 10;
  }

  return Math.max(0, score);
}

/**
 * Formats a date as an ISO string including the correct offset for the given timezone.
 * The date should be in GMT (adjusted via calculateMeetingTime).
 */
function toISOStringWithTimezone(
  date: Date,
  timezone: string,
  fallbackOffset?: number
): string {
  const currentOffset = getTimeZoneOffset(timezone, date);
  if (currentOffset <= 0) {
    return date.toISOString();
  }
  // Compute the target timezone offset (in minutes) for this date.
  const offsetMinutes = getTimeZoneOffset(timezone, date, fallbackOffset);
  // Determine sign: note that if the target zone is behind GMT (like America/Los_Angeles),
  // getTimeZoneOffset returns a negative number.
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absOffset = Math.abs(offsetMinutes);
  const pad = (n: number) => `${n}`.padStart(2, '0');
  const adjustedDate = new Date(date.getTime() + offsetMinutes * 60 * 1000);

  return (
    adjustedDate.getFullYear() +
    '-' +
    pad(adjustedDate.getMonth() + 1) +
    '-' +
    pad(adjustedDate.getDate()) +
    'T' +
    pad(adjustedDate.getHours()) +
    ':' +
    pad(adjustedDate.getMinutes()) +
    ':' +
    pad(adjustedDate.getSeconds()) +
    sign +
    pad(Math.floor(absOffset / 60)) +
    ':' +
    pad(absOffset % 60)
  );
}

// Helper function to check if two time slots overlap
function slotsOverlap(
  slot1: { start: string; end: string },
  slot2: { start: string; end: string }
): boolean {
  return (
    new Date(slot1.start) < new Date(slot2.end) &&
    new Date(slot2.start) < new Date(slot1.end)
  );
}

function calculateEventDuration(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const durationMs = endDate.getTime() - startDate.getTime();
  // Convert milliseconds to minutes
  return durationMs / (1000 * 60);
}

function roundUpToNextSlot(date: Date, slotMinutes: number = 30): Date {
  const rounded = new Date(date.getTime());
  const minutes = rounded.getMinutes();
  const remainder = minutes % slotMinutes;
  if (remainder !== 0) {
    // Increase minutes to next slot boundary.
    rounded.setMinutes(minutes - remainder + slotMinutes);
  }
  // Zero out seconds and milliseconds.
  rounded.setSeconds(0, 0);
  return rounded;
}

export async function findOptimalMeetingTime(
  calendar: calendar_v3.Calendar,
  context: OptimalTimeContext
): Promise<FindOptimalMeetingTimeOutput> {
  console.log(
    `${LOG_PREFIX} Finding optimal meeting time for:\n : ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    const duration = context.duration_minutes || 30;
    // TODO: this needs to be configurable using the WorkingHours object from gsuite
    const workingHours = context.working_hours || {
      start_hour: 8,
      end_hour: 17,
    };

    const { startTime, endTime } = calculateMeetingTime(
      context.timeframe_context,
      workingHours,
      new Date(),
      context.timezone
    );

    // *** STEP 1: Fetch events from each participant using calendar.events.list ***
    // This returns all events, regardless of acceptance.
    const eventTimeSlots: TimeSlot[] = [];
    const participants = [...context.participants];

    for (const participant of participants) {
      const params = {
        calendarId: participant,
        timeMin: toISOStringWithTimezone(startTime, context.timezone!, -420),
        timeMax: toISOStringWithTimezone(endTime, context.timezone!, -420),
        singleEvents: true, // Expands recurring events if needed.
      };
      const eventsResponse = await calendar.events.list(params);
      const events = eventsResponse.data.items || [];
      events.forEach((event) => {
        if (
          event.status !== 'cancelled' &&
          event.start &&
          event.end &&
          event.start.dateTime &&
          event.end.dateTime
        ) {
          const duration = calculateEventDuration(
            event.start.dateTime,
            event.end.dateTime
          );
          if (duration > 0) {
            eventTimeSlots.push({
              attendees: JSON.stringify(event.attendees),
              id: event.iCalUID!,
              start: event.start.dateTime,
              end: event.end.dateTime,
              startLocalDate: new Date(event.start.dateTime).toString(),
              endLocalDate: new Date(event.end.dateTime).toString(),
              duration,
            });
          }
        }
      });
    }

    // let's init current time with now in case we are withing working hours already, this avoids meetings times that take place in the past
    let currentTime = roundUpToNextSlot(new Date()); // startTime is in GMT
    // if it's too early in the morning push up to start time
    // we don't check end time because the loop below with not execute if greater than start time
    // and end time is already to the following day as well
    if (currentTime < startTime) {
      currentTime = new Date(startTime);
    }

    // Convert currentTime (GMT) to local time for the user.
    const userOffset = getTimeZoneOffset(context.timezone!, currentTime, -420);
    // When the target zone is behind GMT, userOffset is negative.
    const localCurrentTime = new Date(
      currentTime.getTime() + userOffset * 60 * 1000
    );
    const localHour = localCurrentTime.getHours();

    const lastTime = new Date(localCurrentTime);
    lastTime.setHours(workingHours.end_hour, 0, 0, 0);

    const startFreeBusyTime = new Date(localCurrentTime);
    startFreeBusyTime.setHours(workingHours.start_hour, 0, 0, 0);

    // *** STEP 2: Query freebusy for busy periods for the entire current day during business hours ***
    const freeBusyRequest = {
      timeMin: toISOStringWithTimezone(
        startFreeBusyTime,
        context.timezone!,
        -420
      ),
      timeMax: toISOStringWithTimezone(lastTime, context.timezone!, -420),
      items: participants.map((email) => ({ id: email })),
      timeZone: 'UTC',
    };

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: freeBusyRequest,
    });

    const busySlots: BusyPeriod[] = [];
    const calendars = freeBusyResponse.data.calendars || {};
    const seen = new Set();

    for (const email in calendars) {
      const busyPeriods = calendars[email].busy || [];
      busyPeriods.forEach((period) => {
        if (period.start && period.end) {
          busySlots.push({
            start: period.start,
            end: period.end,
          });
        }
      });
    }

    // *** STEP 3: Filter out busySlots slots that overlap with events from events.list ***
    const filteredFreeBusySlots = busySlots.filter((fbSlot) => {
      return !eventTimeSlots.some((eventSlot) =>
        slotsOverlap(
          { start: eventSlot.start, end: eventSlot.end },
          { start: fbSlot.start, end: fbSlot.end }
        )
      );
    });

    // Merge the events.list results with the filtered freebusy results
    const allBusyTimes: BusyPeriod[] = [
      ...eventTimeSlots, // Busy times from events.list
      ...filteredFreeBusySlots, // Freebusy slots that didn't overlap with events
    ].filter((slot) => {
      // de-duplicate the slots
      // we need a local date string so the start and end are the same, otherwise they can have different offsets
      if (
        seen.has(
          `${new Date(slot.start).toString()}-${new Date(slot.end).toString()}`
        )
      ) {
        return false;
      }
      seen.add(
        `${new Date(slot.start).toString()}-${new Date(slot.end).toString()}`
      );
      return true;
    });

    // Sort all busy times chronologically
    allBusyTimes.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    // *** STEP 4: Calculate available time slots based on merged busy times ***
    // All dates here are in GMT. workingHours are given in local time (context.timezone)
    // so we convert currentTime from GMT into local time before applying the working-hour check.
    const availableSlots: TimeSlot[] = [];

    while (currentTime < lastTime) {
      if (
        localHour >= workingHours.start_hour &&
        localHour < workingHours.end_hour
      ) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(currentTime.getTime() + duration * 60000);

        let isAvailable = true;
        for (const busy of allBusyTimes) {
          // busy.start and busy.end are assumed to be in ISO format with proper offsets.
          const busyStart = new Date(busy.start); // GMT instant
          const busyEnd = new Date(busy.end);
          if (slotStart < busyEnd && slotEnd > busyStart) {
            isAvailable = false;
            // Jump currentTime to busyEnd (still in GMT)
            currentTime = roundUpToNextSlot(busyEnd);
            break;
          }
        }

        if (isAvailable) {
          console.log(
            `${LOG_PREFIX} isAvailable: ${isAvailable} currentTime: ${currentTime.toString()} toISOStringWithTimezoneL ${toISOStringWithTimezone(
              currentTime,
              context.timezone!,
              -420
            )}`
          );
          const slot: TimeSlot = {
            start: toISOStringWithTimezone(
              currentTime,
              context.timezone!,
              -420
            ),
            end: toISOStringWithTimezone(slotEnd, context.timezone!, -420),
          };

          slot.score = calculateTimeSlotScore(slot, allBusyTimes);
          availableSlots.push(slot);
          // Move ahead 30 minutes in GMT.
          currentTime = new Date(currentTime.getTime() + 30 * 60000);
        }
      } else {
        // If the local time is outside working hours, move currentTime to the next day’s working start.
        // First, build the next day's start in local time.
        const localNext = new Date(localCurrentTime);
        localNext.setDate(localNext.getDate() + 1);
        localNext.setHours(workingHours.start_hour, 0, 0, 0);
        // Now, convert that local time back to GMT.
        const newOffset = getTimeZoneOffset(context.timezone!, localNext, -420);
        currentTime = new Date(localNext.getTime() - newOffset * 60 * 1000);
      }
    }

    const suggestedTimes = availableSlots
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5)
      .map((slot) => ({
        ...slot,
        score: slot.score || 0,
      }));

    const message =
      suggestedTimes.length > 0
        ? `Found ${suggestedTimes.length} optimal time slots.`
        : 'No available time slots found';

    console.log(
      `${LOG_PREFIX} Found times for:\n  participants: ${JSON.stringify(
        context.participants,
        null,
        2
      )}\n  timeframe: ${JSON.stringify(
        {
          suggested_times: suggestedTimes,
          message,
        },
        null,
        2
      )}`
    );

    return {
      suggested_times: suggestedTimes,
      message,
    };
  } catch (error) {
    console.error(
      `${LOG_PREFIX} Finding optimal meeting time failed:\n  message: ${
        error instanceof Error ? error.message : error
      }\n  stack: ${error instanceof Error ? error.stack : ''}`,
      {
        response: (error as any).response?.data,
      }
    );
    throw error;
  }
}
