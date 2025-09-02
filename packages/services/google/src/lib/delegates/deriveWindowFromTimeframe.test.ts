// src/test/deriveWindowFromTimeframe.test.ts
// IMPORTANT: adjust the import path below to your actual file location.
import { deriveWindowFromTimeframe } from './deriveWindowFromTimeframe';
import { MeetingRequest } from '@codestrap/developer-foundations-types';

describe('deriveWindowFromTimeframe', () => {
  const timezone = 'America/Los_Angeles';
  const working_hours = { start_hour: 8, end_hour: 17 };

  beforeAll(() => {
    // Keep string-parsed Dates deterministic in tests
    process.env.TZ = 'America/Los_Angeles';
  });

  /* -------------------- helpers (test-local) -------------------- */

  function buildReq(overrides: Partial<MeetingRequest>): MeetingRequest {
    return {
      participants: ['a@corp.com'],
      subject: 'Test',
      timeframe_context: 'as soon as possible',
      duration_minutes: 30,
      working_hours,
      ...overrides,
    };
  }

  function expectWallClock(
    date: Date,
    y: number,
    m: number,
    d: number,
    hh: number,
    mm: number
  ) {
    expect(date.getFullYear()).toBe(y);
    expect(date.getMonth()).toBe(m - 1);
    expect(date.getDate()).toBe(d);
    expect(date.getHours()).toBe(hh);
    expect(date.getMinutes()).toBe(mm);
  }

  function mondayOfWeek(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    const dow = x.getDay(); // Sun=0..Sat=6
    const delta = dow === 0 ? -6 : 1 - dow;
    const mon = new Date(x);
    mon.setDate(x.getDate() + delta);
    mon.setHours(working_hours.start_hour, 0, 0, 0);
    return mon;
  }

  function fridayOfWeek(d: Date): Date {
    const mon = mondayOfWeek(d);
    const fri = new Date(mon);
    fri.setDate(mon.getDate() + 4);
    fri.setHours(working_hours.end_hour, 0, 0, 0);
    return fri;
  }

  /* -------------------- tests -------------------- */

  it('user defined exact date/time: uses the exact minute and step=1 (inside hours)', () => {
    const candidate = '2025-07-22T10:10:00'; // PT
    const req = buildReq({
      timeframe_context: 'user defined exact date/time',
      localDateString: candidate,
      duration_minutes: 30,
    });

    const now = new Date('2025-07-22T09:00:00');
    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, timezone, timezone, now);

    expect(slotStepMinutes).toBe(1);
    expectWallClock(windowStartLocal, 2025, 7, 22, 10, 10);
    expectWallClock(windowEndLocal, 2025, 7, 22, 10, 40);
  });

  it('user defined exact date/time: clamps start to start_hour if given before-hours time', () => {
    const candidate = '2025-07-22T07:15:00'; // before 08:00
    const req = buildReq({
      timeframe_context: 'user defined exact date/time',
      localDateString: candidate,
      duration_minutes: 30,
    });

    const now = new Date('2025-07-22T06:00:00');
    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, timezone, timezone, now);

    expect(slotStepMinutes).toBe(1);
    expectWallClock(windowStartLocal, 2025, 7, 22, 8, 0);
    expectWallClock(windowEndLocal, 2025, 7, 22, 8, 30);
  });

  it('as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week', () => {
    const req = buildReq({ timeframe_context: 'as soon as possible' });
    const now = new Date('2025-07-22T10:05:00'); // Tue

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, timezone, timezone, now);

    expect(slotStepMinutes).toBe(30);
    // start should be 10:05 (no rounding here; v2 will round when slicing)
    expectWallClock(windowStartLocal, 2025, 7, 22, 10, 5);

    const expectedFri = fridayOfWeek(now);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  });

  it('as soon as possible: after hours → next business day 08:00, end = Friday 17:00', () => {
    const req = buildReq({ timeframe_context: 'as soon as possible' });
    const now = new Date('2025-07-22T18:10:00'); // Tue after hours

    const { windowStartLocal, windowEndLocal } = deriveWindowFromTimeframe(
      req,
      timezone,
      timezone,
      now
    );

    // next day 08:00 (Wed)
    expectWallClock(windowStartLocal, 2025, 7, 23, 8, 0);

    const expectedFri = fridayOfWeek(now);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  });

  it('as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)', () => {
    const req = buildReq({ timeframe_context: 'as soon as possible' });
    const now = new Date('2025-07-26T12:00:00'); // Sat

    const { windowStartLocal, windowEndLocal } = deriveWindowFromTimeframe(
      req,
      timezone,
      timezone,
      now
    );

    // Monday 08:00 (2025-07-28)
    expectWallClock(windowStartLocal, 2025, 7, 28, 8, 0);

    const expectedFri = fridayOfWeek(new Date('2025-07-28T09:00:00'));
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  });

  it('this week: mid-week → start = clamped now, end = Friday 17:00 this week', () => {
    const req = buildReq({ timeframe_context: 'this week' });
    const now = new Date('2025-07-23T07:10:00'); // Wed before hours → clamps to 08:00

    const { windowStartLocal, windowEndLocal } = deriveWindowFromTimeframe(
      req,
      timezone,
      timezone,
      now
    );

    expectWallClock(windowStartLocal, 2025, 7, 23, 8, 0);
    const expectedFri = fridayOfWeek(now);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  });

  it('this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00', () => {
    const req = buildReq({ timeframe_context: 'this week' });
    const now = new Date('2025-07-25T18:10:00'); // Fri after hours

    const { windowStartLocal, windowEndLocal } = deriveWindowFromTimeframe(
      req,
      timezone,
      timezone,
      now
    );

    const expectedNextMon = mondayOfWeek(new Date('2025-07-28T00:00:00')); // 2025-07-28 08:00
    expect(windowStartLocal.getTime()).toBe(expectedNextMon.getTime());

    const expectedNextFri = fridayOfWeek(expectedNextMon);
    expect(windowEndLocal.getTime()).toBe(expectedNextFri.getTime());
  });

  it('next week: Mon 08:00 next week → Fri 17:00 next week', () => {
    const req = buildReq({ timeframe_context: 'next week' });
    const now = new Date('2025-07-23T10:00:00'); // Wed

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, timezone, timezone, now);

    expect(slotStepMinutes).toBe(30);

    const expectedMon = mondayOfWeek(new Date('2025-07-28T00:00:00')); // next week’s Monday
    expect(windowStartLocal.getTime()).toBe(expectedMon.getTime());

    const expectedFri = fridayOfWeek(expectedMon);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  });
});
