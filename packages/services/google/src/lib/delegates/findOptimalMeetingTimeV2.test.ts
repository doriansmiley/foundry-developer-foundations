// src/test/findOptimalMeetingTimeV2.test.ts
import { google } from 'googleapis';

import {
  fbSingleDayCalendars,
  fbMultiDayCalendars,
  fbFridayCalendars,
  fbDSTCalendars,
} from '../__fixtures__/schedule';

import { findOptimalMeetingTimeV2, Slot } from './findOptimalMeetingTime.v2';

// ------------------------------
// Inline mocks (auth INCLUDED)
// ------------------------------
let currentCalendarsFixture: Record<
  string,
  { busy: Array<{ start: string; end: string }> }
> = fbSingleDayCalendars;

jest.mock('googleapis', () => ({
  ...jest.requireActual('googleapis'),
  google: {
    calendar: jest.fn(() => {
      return {
        events: {
          list: jest.fn(() => Promise.resolve({ data: { items: [] } })), // not used but kept
        },
        freebusy: {
          query: jest.fn((params: any) => {
            const { timeMin, timeMax } = params.requestBody;
            return Promise.resolve({
              data: {
                kind: 'calendar#freeBusy',
                timeMin,
                timeMax,
                calendars: currentCalendarsFixture,
              },
            });
          }),
        },
      };
    }),
    auth: {
      GoogleAuth: jest.fn().mockImplementation(() => {
        return {
          getClient: jest.fn().mockResolvedValue({
            getRequestHeaders: jest.fn().mockResolvedValue({}),
          }),
        };
      }),
    },
  },
}));

describe('findOptimalMeetingTimeV2 (plane-sweep + strict PT handling)', () => {
  const timezone = 'America/Los_Angeles';
  const workingHours = { start_hour: 8, end_hour: 17 };
  const durationMinutes = 30;
  const slotStepMinutes = 30;
  const fallbackOffsetMinutes = -420; // PDT

  let calendar: any;

  beforeAll(() => {
    // Force Node's wall-clock to PT so Date('YYYY-MM-DDTHH:mm:ss') is deterministic.
    process.env.TZ = 'America/Los_Angeles';
  });

  beforeEach(() => {
    // IMPORTANT: create the calendar AFTER jest.mock so it uses the mocked impl
    calendar = google.calendar('v3') as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- EXISTING TESTS ----------------

  it('single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours', async () => {
    currentCalendarsFixture = fbSingleDayCalendars;

    const windowStartLocal = new Date('2025-07-22T08:00:00'); // PT
    const windowEndLocal = new Date('2025-07-22T17:00:00'); // PT

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbSingleDayCalendars),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(fbSingleDayCalendars));
    assertWithinLocalWorkingHours(slots, workingHours);
  });

  it('multi-day window: handles union of busy blocks across attendees and days', async () => {
    currentCalendarsFixture = fbMultiDayCalendars;

    const windowStartLocal = new Date('2025-07-22T08:00:00'); // PT
    const windowEndLocal = new Date('2025-07-23T17:00:00'); // PT

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbMultiDayCalendars),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(fbMultiDayCalendars));
    assertWithinLocalWorkingHours(slots, workingHours);
  });

  it('skipFriday=true → zero slots for a Friday-only window', async () => {
    currentCalendarsFixture = fbFridayCalendars;

    const windowStartLocal = new Date('2025-07-25T08:00:00'); // PT (Friday)
    const windowEndLocal = new Date('2025-07-25T17:00:00'); // PT

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbFridayCalendars),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: true,
      fallbackOffsetMinutes,
    });

    expect(slots).toHaveLength(0);
  });

  it('DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets', async () => {
    currentCalendarsFixture = fbDSTCalendars;

    const windowStartLocal = new Date('2025-11-01T08:00:00'); // PT (PDT)
    const windowEndLocal = new Date('2025-11-03T17:00:00'); // PT (PST)

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbDSTCalendars),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes: -480, // conservative across DST
    });

    expect(slots.length).toBeGreaterThan(0);
    const offsetRegex = /(-07:00|-08:00)$/;
    for (const s of slots) {
      expect(offsetRegex.test(s.start) || offsetRegex.test(s.end)).toBeTruthy();
    }
  });

  it('uses fallbackOffsetMinutes if Intl fails', async () => {
    currentCalendarsFixture = fbSingleDayCalendars;

    const original = Intl.DateTimeFormat;
    // @ts-expect-error - force failure
    Intl.DateTimeFormat = jest.fn(() => {
      throw new Error('Intl b0rked');
    });

    const windowStartLocal = new Date('2025-07-22T08:00:00');
    const windowEndLocal = new Date('2025-07-22T09:00:00');

    try {
      const slots = await findOptimalMeetingTimeV2({
        calendar,
        attendees: Object.keys(fbSingleDayCalendars),
        timezone,
        windowStartLocal,
        windowEndLocal,
        durationMinutes,
        workingHours,
        slotStepMinutes,
        skipFriday: false,
        fallbackOffsetMinutes: -420,
      });

      expect(slots.length).toBeGreaterThan(0);
      const offsetRegex = /(-07:00|-08:00)$/;
      for (const s of slots) {
        expect(offsetRegex.test(s.start)).toBe(true);
      }
    } finally {
      Intl.DateTimeFormat = original;
    }
  });

  // ---------------- ADDED EDGE-CASE TESTS ----------------

  it('rounds up first slot to step boundary and supports step < duration', async () => {
    // Working window 08:00–10:00. Leave free 08:05–09:10 local.
    // Block 1: 08:00–08:05 PT => 15:00–15:05Z (PDT, -07:00)
    // Block 2: 09:10–10:00 PT => 16:10–17:00Z
    currentCalendarsFixture = {
      'a@corp.com': {
        busy: [
          { start: '2025-07-22T15:00:00Z', end: '2025-07-22T15:05:00Z' },
          { start: '2025-07-22T16:10:00Z', end: '2025-07-22T17:00:00Z' },
        ],
      },
    };

    const windowStartLocal = new Date('2025-07-22T08:00:00'); // PT
    const windowEndLocal = new Date('2025-07-22T10:00:00'); // PT

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 15,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    // Free gap 08:05–09:10 with 30‑min duration and 15‑min step → 08:15–08:45, 08:30–09:00.
    expect(slots.length).toBeGreaterThanOrEqual(2);
    expect(slots[0].start.slice(11, 16)).toBe('08:15');
    expect(slots[0].end.slice(11, 16)).toBe('08:45');
    expect(slots[1].start.slice(11, 16)).toBe('08:30');
    expect(slots[1].end.slice(11, 16)).toBe('09:00');
    assertNoOverlap(slots, flattenBusy(currentCalendarsFixture));
  });

  it('returns 0 when all free gaps are shorter than duration', async () => {
    // Only free 12:00–12:20 local; duration=30 → 0 slots.
    // Busy: 08:00–12:00 PT (15:00–19:00Z) and 12:20–17:00 PT (19:20–00:00Z next day)
    currentCalendarsFixture = {
      'a@corp.com': {
        busy: [
          { start: '2025-07-22T15:00:00Z', end: '2025-07-22T19:00:00Z' },
          { start: '2025-07-22T19:20:00Z', end: '2025-07-23T00:00:00Z' },
        ],
      },
    };

    const windowStartLocal = new Date('2025-07-22T08:00:00');
    const windowEndLocal = new Date('2025-07-22T17:00:00');

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 10,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots).toHaveLength(0);
  });

  xit('skips weekends even across multi-day spans', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartLocal = new Date('2025-07-26T08:00:00'); // Sat
    const windowEndLocal = new Date('2025-07-28T17:00:00'); // Mon

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    // All slots should be Monday (getDay()==1)
    for (const s of slots) expect(new Date(s.start).getDay()).toBe(1);
  });

  xit('skipFriday=true removes Friday slots in mixed Thu→Fri range', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartLocal = new Date('2025-07-24T08:00:00'); // Thu
    const windowEndLocal = new Date('2025-07-25T17:00:00'); // Fri

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: true,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    for (const s of slots) expect(new Date(s.start).getDay()).toBe(4); // Thu
  });

  it('honors windowStartLocal inside the working day (rounds to step)', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartLocal = new Date('2025-07-22T10:10:00');
    const windowEndLocal = new Date('2025-07-22T12:00:00');

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 30,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].start.slice(11, 16)).toBe('10:30');
  });

  it('returns 0 on a day fully covered by busy', async () => {
    // Busy covers 08:00–17:00 PT ⇒ 15:00Z → 00:00Z next day
    currentCalendarsFixture = {
      'a@corp.com': {
        busy: [{ start: '2025-07-22T15:00:00Z', end: '2025-07-23T00:00:00Z' }],
      },
    };

    const windowStartLocal = new Date('2025-07-22T08:00:00');
    const windowEndLocal = new Date('2025-07-22T17:00:00');

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots).toHaveLength(0);
  });

  it('merges overlapping and unsorted busy blocks correctly', async () => {
    // Two overlapping blocks around 10:00–11:00 PT.
    currentCalendarsFixture = {
      'a@corp.com': {
        busy: [
          { start: '2025-07-22T17:15:00Z', end: '2025-07-22T18:00:00Z' }, // 10:15–11:00 PT
          { start: '2025-07-22T17:00:00Z', end: '2025-07-22T17:30:00Z' }, // 10:00–10:30 PT
        ],
      },
    };

    const windowStartLocal = new Date('2025-07-22T08:00:00');
    const windowEndLocal = new Date('2025-07-22T17:00:00');

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(currentCalendarsFixture));
  });

  it('scores earlier slots higher (non-increasing sequence)', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartLocal = new Date('2025-07-22T08:00:00');
    const windowEndLocal = new Date('2025-07-22T17:00:00');

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartLocal,
      windowEndLocal,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
      fallbackOffsetMinutes,
    });

    expect(slots.length).toBeGreaterThan(5);
    for (let i = 1; i < slots.length; i++) {
      expect((slots[i - 1].score ?? 0) >= (slots[i].score ?? 0)).toBe(true);
    }
  });

  it('DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after', async () => {
    // No busy; verify offsets across DST change (Sun Mar 9, 2025).
    // Windows skip weekend; this range yields Fri (PST, -08:00) and Mon (PDT, -07:00).
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartLocal = new Date('2025-03-07T08:00:00'); // Fri (PST)
    const windowEndLocal = new Date('2025-03-10T17:00:00'); // Mon (PDT)

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone: 'America/Los_Angeles',
      windowStartLocal,
      windowEndLocal,
      durationMinutes: 30,
      workingHours: { start_hour: 8, end_hour: 17 },
      slotStepMinutes: 30,
      skipFriday: false,
      fallbackOffsetMinutes: -480, // fine here; Intl will compute true offsets
    });

    expect(slots.length).toBeGreaterThan(0);
    const hasMinus08 = slots.some(
      (s) => /-08:00$/.test(s.start) || /-08:00$/.test(s.end)
    ); // Fri
    const hasMinus07 = slots.some(
      (s) => /-07:00$/.test(s.start) || /-07:00$/.test(s.end)
    ); // Mon
    expect(hasMinus08 && hasMinus07).toBe(true);
  });
});

/* ---------------- helpers (local to the spec) ---------------- */

function flattenBusy(
  calendars: Record<string, { busy: Array<{ start: string; end: string }> }>
) {
  return Object.values(calendars).flatMap((c) => c.busy);
}

/**
 * Overlap check that treats boundary equality (slotEnd === busyStart, slotStart === busyEnd) as NOT overlapping.
 */
function assertNoOverlap(
  slots: Slot[],
  busy: Array<{ start: string; end: string }>
) {
  const overlaps = slots.filter((s) => {
    const sStart = new Date(s.start).getTime();
    const sEnd = new Date(s.end).getTime();
    return busy.some((b) => {
      const bStart = new Date(b.start).getTime();
      const bEnd = new Date(b.end).getTime();
      // real overlap only when they strictly cross
      return sStart < bEnd && sEnd > bStart;
    });
  });

  expect(overlaps).toHaveLength(0);
}

function assertWithinLocalWorkingHours(
  slots: Slot[],
  hours: { start_hour: number; end_hour: number }
) {
  for (const s of slots) {
    const startLocalHour = parseInt(s.start.substring(11, 13), 10);
    const endLocalHour = parseInt(s.end.substring(11, 13), 10);
    expect(startLocalHour).toBeGreaterThanOrEqual(hours.start_hour);
    expect(endLocalHour).toBeLessThanOrEqual(hours.end_hour);
  }
}
