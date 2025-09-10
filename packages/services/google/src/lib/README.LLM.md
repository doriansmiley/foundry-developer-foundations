# Overview

_Overview pending._

## Quickstart (Worked Examples) <!-- anchor: worked_examples -->
- **user defined exact date/time: uses the exact minute and step=1 (inside hours)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('user defined exact date/time: uses the exact minute and step=1 (inside hours)', () => {
    // 10:10 local → UTC payload
    const candidateUTC = wallClockToUTC('2025-07-22T10:10:00', timezone);
    const nowUTC = wallClockToUTC('2025-07-22T09:00:00', timezone);
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);

    const req = buildReq({
      timeframe_context: 'user defined exact date/time',
      localDateString: candidateUTC.toISOString(), // pass UTC instant
      duration_minutes: 30,
    }, hoursUTC);

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, nowUTC);

    expect(slotStepMinutes).toBe(1);
    expectWallClock(windowStartLocal, timezone, 2025, 7, 22, 10, 10);
    expectWallClock(windowEndLocal, timezone, 2025, 7, 22, 10, 40);
  })
```

- **user defined exact date/time: clamps start to start_hour if given before-hours time** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('user defined exact date/time: clamps start to start_hour if given before-hours time', () => {
    const candidateUTC = wallClockToUTC('2025-07-22T07:15:00', timezone);
    const nowUTC = wallClockToUTC('2025-07-22T06:00:00', timezone);
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);

    const req = buildReq({
      timeframe_context: 'user defined exact date/time',
      localDateString: candidateUTC.toISOString(),
      duration_minutes: 30,
    }, hoursUTC);

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, nowUTC);

    expect(slotStepMinutes).toBe(1);
    expectWallClock(windowStartLocal, timezone, 2025, 7, 22, 8, 0);
    expectWallClock(windowEndLocal, timezone, 2025, 7, 22, 8, 30);
  })
```

- **as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week', () => {
    const nowUTC = wallClockToUTC('2025-07-22T10:05:00', timezone); // Tue
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'as soon as possible' }, hoursUTC);

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, nowUTC);

    expect(slotStepMinutes).toBe(30);
    expectWallClock(windowStartLocal, timezone, 2025, 7, 22, 10, 5);

    const expectedFri = fridayOfWeek(nowUTC, timezone);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  })
```

- **as soon as possible: after hours → next business day 08:00, end = Friday 17:00** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('as soon as possible: after hours → next business day 08:00, end = Friday 17:00', () => {
    const nowUTC = wallClockToUTC('2025-07-22T18:10:00', timezone); // Tue after hours
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'as soon as possible' }, hoursUTC);

    const { windowStartLocal, windowEndLocal } =
      deriveWindowFromTimeframe(req, nowUTC);

    // next day 08:00 (Wed) in target tz
    expectWallClock(windowStartLocal, timezone, 2025, 7, 23, 8, 0);

    const expectedFri = fridayOfWeek(nowUTC, timezone);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  })
```

- **as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)', () => {
    const nowUTC = wallClockToUTC('2025-07-26T12:00:00', timezone); // Sat
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'as soon as possible' }, hoursUTC);

    const { windowStartLocal, windowEndLocal } =
      deriveWindowFromTimeframe(req, nowUTC);

    // Monday 08:00 (2025-07-28)
    expectWallClock(windowStartLocal, timezone, 2025, 7, 28, 8, 0);

    const expectedFri = fridayOfWeek(
      wallClockToUTC('2025-07-28T09:00:00', timezone),
      timezone
    );
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  })
```

- **this week: mid-week → start = clamped now, end = Friday 17:00 this week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('this week: mid-week → start = clamped now, end = Friday 17:00 this week', () => {
    const nowUTC = wallClockToUTC('2025-07-23T07:10:00', timezone); // Wed before hours
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'this week' }, hoursUTC);

    const { windowStartLocal, windowEndLocal } =
      deriveWindowFromTimeframe(req, nowUTC);

    expectWallClock(windowStartLocal, timezone, 2025, 7, 23, 8, 0);
    const expectedFri = fridayOfWeek(nowUTC, timezone);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  })
```

- **this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00', () => {
    const nowUTC = wallClockToUTC('2025-07-25T18:10:00', timezone); // Fri after hours
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'this week' }, hoursUTC);

    const { windowStartLocal, windowEndLocal } =
      deriveWindowFromTimeframe(req, nowUTC);

    const expectedNextMon = mondayOfWeek(
      wallClockToUTC('2025-07-28T00:00:00', timezone),
      timezone
    ); // 2025-07-28 08:00
    expect(windowStartLocal.getTime()).toBe(expectedNextMon.getTime());

    const expectedNextFri = fridayOfWeek(expectedNextMon, timezone);
    expect(windowEndLocal.getTime()).toBe(expectedNextFri.getTime());
  })
```

- **next week: Mon 08:00 next week → Fri 17:00 next week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
```ts
it('next week: Mon 08:00 next week → Fri 17:00 next week', () => {
    const nowUTC = wallClockToUTC('2025-07-23T10:00:00', timezone); // Wed
    const hoursUTC = workingHoursUTCForDate(nowUTC, timezone, LOCAL_START, LOCAL_END);
    const req = buildReq({ timeframe_context: 'next week' }, hoursUTC);

    const { windowStartLocal, windowEndLocal, slotStepMinutes } =
      deriveWindowFromTimeframe(req, nowUTC);

    expect(slotStepMinutes).toBe(30);

    const expectedMon = mondayOfWeek(
      wallClockToUTC('2025-07-28T00:00:00', timezone),
      timezone
    ); // next week’s Monday 08:00
    expect(windowStartLocal.getTime()).toBe(expectedMon.getTime());

    const expectedFri = fridayOfWeek(expectedMon, timezone);
    expect(windowEndLocal.getTime()).toBe(expectedFri.getTime());
  })
```

- **should get an exact time within PT working hours** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts_
```ts
it('should get an exact time within PT working hours', async () => {
            // LA wall-clock "YYYY-MM-DDT10:30:00" one week from now:
            const p = partsInTZ(new Date(), 'America/Los_Angeles');
            const pad = (n: number, len = 2) => String(n).padStart(len, '0');
            const localDateString = `${p.year}-${pad(p.month)}-${pad(p.day + 7)}T10:30:00`;

            const slots = await client.getAvailableMeetingTimes({
                participants: ['dsmiley@codestrap.me'],
                subject: 'Circle Up',
                timeframe_context: 'user defined exact date/time',
                localDateString,
                duration_minutes: 30,
                working_hours: {
                    start_hour: 8,
                    end_hour: 17,
                },
            });

            expect(slots.suggested_times.length).toBeGreaterThan(0);
        }, 60000)
```

- **single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours', async () => {
    currentCalendarsFixture = fbSingleDayCalendars;

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone); // PT → UTC
    const windowEndUTC = wallClockToUTC('2025-07-22T17:00:00', timezone); // PT → UTC
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbSingleDayCalendars),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(fbSingleDayCalendars));
    assertWithinLocalWorkingHours(slots, { start_hour: 8, end_hour: 17 });
  })
```

- **multi-day window: handles union of busy blocks across attendees and days** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('multi-day window: handles union of busy blocks across attendees and days', async () => {
    currentCalendarsFixture = fbMultiDayCalendars;

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone); // PT → UTC
    const windowEndUTC = wallClockToUTC('2025-07-23T17:00:00', timezone); // PT → UTC
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbMultiDayCalendars),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(fbMultiDayCalendars));
    assertWithinLocalWorkingHours(slots, { start_hour: 8, end_hour: 17 });
  })
```

- **skipFriday=true → zero slots for a Friday-only window** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('skipFriday=true → zero slots for a Friday-only window', async () => {
    currentCalendarsFixture = fbFridayCalendars;

    const windowStartUTC = wallClockToUTC('2025-07-25T08:00:00', timezone); // Fri PT
    const windowEndUTC = wallClockToUTC('2025-07-25T17:00:00', timezone); // PT
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbFridayCalendars),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: true,
    });

    expect(slots).toHaveLength(0);
  })
```

- **DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets', async () => {
    currentCalendarsFixture = fbDSTCalendars;

    const windowStartUTC = wallClockToUTC('2025-11-01T08:00:00', timezone); // PDT
    const windowEndUTC = wallClockToUTC('2025-11-03T17:00:00', timezone); // PST
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbDSTCalendars),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    const offsetRegex = /(-07:00|-08:00)$/;
    for (const s of slots) {
      expect(offsetRegex.test(s.start) || offsetRegex.test(s.end)).toBeTruthy();
    }
  })
```

- **works with hardcoded UTC instants (no wallClockToUTC usage)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('works with hardcoded UTC instants (no wallClockToUTC usage)', async () => {
    currentCalendarsFixture = fbSingleDayCalendars;

    // July in PT is UTC-7 → 08:00 PT == 15:00Z, 09:00 PT == 16:00Z
    const windowStartUTC = new Date('2025-07-22T15:00:00Z');
    const windowEndUTC = new Date('2025-07-22T16:00:00Z');

    // PT business hours 08–17 → in UTC they’re 15 → 00 (end wraps to next UTC day)
    const workingHours = { start_hour: 15, end_hour: 0 };

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(fbSingleDayCalendars),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    const offsetRegex = /(-07:00|-08:00)$/;
    for (const s of slots) {
      expect(offsetRegex.test(s.start)).toBe(true);
    }
  })
```

- **rounds up first slot to step boundary and supports step < duration** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
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

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone); // PT
    const windowEndUTC = wallClockToUTC('2025-07-22T10:00:00', timezone); // PT
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 15,
      skipFriday: false,
    });

    // Free gap 08:05–09:10 with 30-min duration and 15-min step → 08:15–08:45, 08:30–09:00.
    expect(slots.length).toBeGreaterThanOrEqual(2);
    expect(slots[0].start.slice(11, 16)).toBe('08:15');
    expect(slots[0].end.slice(11, 16)).toBe('08:45');
    expect(slots[1].start.slice(11, 16)).toBe('08:30');
    expect(slots[1].end.slice(11, 16)).toBe('09:00');
    assertNoOverlap(slots, flattenBusy(currentCalendarsFixture));
  })
```

- **returns 0 when all free gaps are shorter than duration** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
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

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone);
    const windowEndUTC = wallClockToUTC('2025-07-22T17:00:00', timezone);
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 10,
      skipFriday: false,
    });

    expect(slots).toHaveLength(0);
  })
```

- **skips weekends even across multi-day spans** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('skips weekends even across multi-day spans', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartUTC = wallClockToUTC('2025-07-26T08:00:00', timezone); // Sat PT
    const windowEndUTC = wallClockToUTC('2025-07-28T17:00:00', timezone); // Mon PT
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    // All slots should be Monday (getDay()==1) in PT
    for (const s of slots) expect(dayInTZ(s.start, timezone)).toBe(1);
  })
```

- **skipFriday=true removes Friday slots in mixed Thu→Fri range** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('skipFriday=true removes Friday slots in mixed Thu→Fri range', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartUTC = wallClockToUTC('2025-07-24T08:00:00', timezone); // Thu PT
    const windowEndUTC = wallClockToUTC('2025-07-25T17:00:00', timezone); // Fri PT
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: true,
    });

    expect(slots.length).toBeGreaterThan(0);
    for (const s of slots) expect(dayInTZ(s.start, timezone)).toBe(4); // Thursday
  })
```

- **honors windowStart inside the working day (rounds to step)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('honors windowStart inside the working day (rounds to step)', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartUTC = wallClockToUTC('2025-07-22T10:10:00', timezone); // PT
    const windowEndUTC = wallClockToUTC('2025-07-22T12:00:00', timezone); // PT
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 30,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].start.slice(11, 16)).toBe('10:30');
  })
```

- **returns 0 on a day fully covered by busy** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('returns 0 on a day fully covered by busy', async () => {
    // Busy covers 08:00–17:00 PT ⇒ 15:00Z → 00:00Z next day
    currentCalendarsFixture = {
      'a@corp.com': {
        busy: [{ start: '2025-07-22T15:00:00Z', end: '2025-07-23T00:00:00Z' }],
      },
    };

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone);
    const windowEndUTC = wallClockToUTC('2025-07-22T17:00:00', timezone);
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots).toHaveLength(0);
  })
```

- **merges overlapping and unsorted busy blocks correctly** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
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

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone);
    const windowEndUTC = wallClockToUTC('2025-07-22T17:00:00', timezone);
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    assertNoOverlap(slots, flattenBusy(currentCalendarsFixture));
  })
```

- **scores earlier slots higher (non-increasing sequence)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('scores earlier slots higher (non-increasing sequence)', async () => {
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartUTC = wallClockToUTC('2025-07-22T08:00:00', timezone);
    const windowEndUTC = wallClockToUTC('2025-07-22T17:00:00', timezone);
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone,
      windowStartUTC,
      windowEndUTC,
      durationMinutes,
      workingHours,
      slotStepMinutes,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(5);
    for (let i = 1; i < slots.length; i++) {
      expect((slots[i - 1].score ?? 0) >= (slots[i].score ?? 0)).toBe(true);
    }
  })
```

- **DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
```ts
it('DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after', async () => {
    // No busy; verify offsets across DST change (Sun Mar 9, 2025).
    // Windows skip weekend; this range yields Fri (PST, -08:00) and Mon (PDT, -07:00).
    currentCalendarsFixture = { 'a@corp.com': { busy: [] } };

    const windowStartUTC = wallClockToUTC('2025-03-07T08:00:00', timezone); // Fri (PST)
    const windowEndUTC = wallClockToUTC('2025-03-10T17:00:00', timezone); // Mon (PDT)
    const workingHours = workingHoursUTCForDate(windowStartUTC, timezone, 8, 17);

    const slots = await findOptimalMeetingTimeV2({
      calendar,
      attendees: Object.keys(currentCalendarsFixture),
      timezone: 'America/Los_Angeles',
      windowStartUTC,
      windowEndUTC,
      durationMinutes: 30,
      workingHours,
      slotStepMinutes: 30,
      skipFriday: false,
    });

    expect(slots.length).toBeGreaterThan(0);
    const hasMinus08 = slots.some(
      (s) => /-08:00$/.test(s.start) || /-08:00$/.test(s.end)
    ); // Fri
    const hasMinus07 = slots.some(
      (s) => /-07:00$/.test(s.start) || /-07:00$/.test(s.end)
    ); // Mon
    expect(hasMinus08 && hasMinus07).toBe(true);
  })
```

## Public API (Exports) <!-- anchor: public_api -->
| export | kind | signature | description |
|---|---|---|---|
| `makeGSuiteClient` | function | `function makeGSuiteClient(user: string) => Promise<GSuiteCalendarService>` |  |
| `findOptimalMeetingTime` | function | `function findOptimalMeetingTime(calendar: calendar_v3.Calendar, context: OptimalTimeContext) => Promise<FindOptimalMeetingTimeOutput>` |  |
| `scheduleMeeting` | function | `function scheduleMeeting(calendar: calendar_v3.Calendar, context: CalendarContext) => Promise<ScheduleMeetingOutput>` |  |
| `sendEmail` | function | `function sendEmail(gmail: gmail_v1.Gmail, context: EmailContext) => Promise<SendEmailOutput>` |  |
| `readEmailHistory` | function | `function readEmailHistory(gmail: gmail_v1.Gmail, context: ReadEmailHistoryContext) => Promise<EmailMessage[]>` |  |
| `watchEmails` | function | `function watchEmails(context: WatchEmailsInput, makeClient: (userId: string) => Promise<{ emailClient: gmail_v1.Gmail; calendarClient: calendar_v3.Calendar; }>) => Promise<WatchEmailsOutput>` |  |

## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._

## Jest Mock Examples <!-- anchor: jest_mocks -->
## Test Mock Setup (extracted from Jest) <!-- anchor: test_mocks -->

- **module:** `googleapis`
  - from: `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts`
  - factory:
```ts
() => ({
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
})
```

## Project Configuration <!-- anchor: project_configuration -->

**package.json**: `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/package.json`
- name: `@codestrap/developer-foundations-services-google`
- version: `0.0.1`
- private: `false`
- scripts: _none_
- deps: 6
**contents**
```json
{
  "name": "@codestrap/developer-foundations-services-google",
  "version": "0.0.1",
  "type": "commonjs",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@codestrap/developer-foundations-types": "*",
    "@codestrap/developer-foundations-utils": "*",
    "@google/generative-ai": "^0.24.1",
    "googleapis": "^149.0.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^22.15.3"
  }
}
```

### TypeScript Configs
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/tsconfig.json` (extends: `../../../tsconfig.base.json`) — baseUrl: `-`, target: `-`, module: `commonjs`, paths: 0
```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "importHelpers": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/tsconfig.lib.json` (extends: `./tsconfig.json`) — baseUrl: `-`, target: `-`, module: `-`, paths: 0
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]
}
```
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/tsconfig.spec.json` (extends: `./tsconfig.json`) — baseUrl: `-`, target: `-`, module: `commonjs`, paths: 0
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "module": "commonjs",
    "moduleResolution": "node10",
    "types": ["jest", "node"]
  },
  "include": [
    "jest.config.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

### Nx Project
**project.json**: `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/project.json`
- name: `google-service`, sourceRoot: `packages/services/google/src`, tags: `type:service`
- targets: `build`, `nx-release-publish`, `test`
**contents**
```json
{
  "name": "google-service",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/services/google/src",
  "projectType": "library",
  "release": {
    "version": {
      "manifestRootsToUpdate": ["dist/{projectRoot}"],
      "currentVersionResolver": "git-tag",
      "fallbackCurrentVersionResolver": "disk"
    }
  },
  "tags": ["type:service"],
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/services/google",
        "main": "packages/services/google/src/index.ts",
        "tsConfig": "packages/services/google/tsconfig.lib.json",
        "assets": ["packages/services/google/*.md"]
      }
    },
    "nx-release-publish": {
      "options": {
        "packageRoot": "dist/{projectRoot}"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "packages/services/google/jest.config.ts"
      }
    }
  }
}
```

### Jest
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/jest.config.ts`
```ts
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  displayName: 'google',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/packages/services/google',
};
```

### ESLint
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/eslint.config.mjs`
```js
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
```

### Environment Files <!-- anchor: configuration_env -->
| name | required | default | files | notes |
|---|---|---|---|---|
| `BROWSERFY_BROWSER_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `BROWSERFY_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `CA_SERIES_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `E2E` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string — controls running of e2e tests, defaults to false |
| `EIA_API_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `EIA_BASE_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `FOUNDRY_CLIENT_TYPE` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | SupportedFoundryClients |
| `FOUNDRY_STACK_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string — the bae url of our Foundry stack |
| `FOUNDRY_TEST_USER` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string — the hard coded uid of the user to use for testing, defaults to CodeStrap |
| `FOUNDRY_TOKEN` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `GEMINI_API_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `GOOGLE_SEARCH_API_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `GOOGLE_SEARCH_ENGINE_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `GOOGLE_SEARCH_ENGINE_MARKETS` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `LOG_PREFIX` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `OFFICE_SERVICE_ACCOUNT` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `ONTOLOGY_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `ONTOLOGY_RID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `OPEN_AI_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `OPEN_WEATHER_API_KEY` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `OSDK_CLIENT_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `OSDK_CLIENT_SECRET` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `RANGR_FOUNDRY_STACK_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `RANGR_ONTOLOGY_RID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `RANGR_OSDK_CLIENT_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `RANGR_OSDK_CLIENT_SECRET` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `REDIRECT_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_APP_TOKEN` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_BASE_URL` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_BOT_TOKEN` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_CLIENT_ID` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_CLIENT_SECRET` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |
| `SLACK_SIGNING_SECRET` | yes |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/process-env.d.ts` | string |

## Dependency Topology (Nx) <!-- anchor: deps_topology -->
**Project:** `google-service`

- Depends on: `types`, `utils`
- Dependents: `agents-vickie-bennie`, `di`


## Import Graph (File-level) <!-- anchor: import_graph -->
_Text-only representation intentionally omitted in this version; agents can walk files from API surface._

## Practice Tasks (for Agents/RL) <!-- anchor: practice_tasks -->
**Q:** Create a GSuite client for test@example.com.
**A:**
```typescript
await makeGSuiteClient('test@example.com')
```


**Q:** Find an optimal meeting time given a calendar and context.
**A:**
```typescript
await findOptimalMeetingTime({} as calendar_v3.Calendar, { attendees: [], duration: 30 } as OptimalTimeContext)
```


**Q:** Schedule a meeting given a calendar and context.
**A:**
```typescript
await scheduleMeeting({} as calendar_v3.Calendar, { attendees: [], duration: 30 } as CalendarContext)
```


**Q:** Send an email using Gmail with a given context.
**A:**
```typescript
await sendEmail({} as gmail_v1.Gmail, { to: 'test@example.com', subject: 'Hello', body: 'World' } as EmailContext)
```


**Q:** Read the email history using Gmail with a given context.
**A:**
```typescript
await readEmailHistory({} as gmail_v1.Gmail, { query: 'from:test@example.com' } as ReadEmailHistoryContext)
```


**Q:** Watch emails with a given context.
**A:**
```typescript
await watchEmails({ userId: 'test@example.com' } as WatchEmailsInput, makeGSuiteClient)
```


**Q:** Can you find optimal meeting time?
**A:**
```typescript
await findOptimalMeetingTime({} as calendar_v3.Calendar, { attendees: [], duration: 30 } as OptimalTimeContext)
```


**Q:** Can you schedule a meeting?
**A:**
```typescript
await scheduleMeeting({} as calendar_v3.Calendar, { attendees: [], duration: 30 } as CalendarContext)
```


**Q:** Send an email to test2@example.com.
**A:**
```typescript
await sendEmail({} as gmail_v1.Gmail, { to: 'test2@example.com', subject: 'Test', body: 'Test Email' } as EmailContext)
```


**Q:** Read the email history with subject 'Important'.
**A:**
```typescript
await readEmailHistory({} as gmail_v1.Gmail, { query: 'subject:Important' } as ReadEmailHistoryContext)
```


**Q:** Make a GSuite client for user another_test@example.com.
**A:**
```typescript
await makeGSuiteClient('another_test@example.com')
```


**Q:** Start watching emails for user another_test@example.com.
**A:**
```typescript
await watchEmails({ userId: 'another_test@example.com' } as WatchEmailsInput, makeGSuiteClient)
```


## Synthetic Variations <!-- anchor: synthetic_variations -->
_No generators proposed._

## Guardrails & Quality <!-- anchor: guardrails_quality -->
_Include test coverage & invariants if available (future enhancement)._

## Open Questions / Needs from Engineer <!-- anchor: questions_for_engineer -->
_None_

## Appendix <!-- anchor: appendix -->
- Stable section anchors provided for agent navigation.
- IDs: Prefer path-based IDs for files and export names for API items.