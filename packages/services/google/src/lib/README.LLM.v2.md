# Overview

_Overview pending._

## Public API (Exports) <!-- anchor: public_api -->
| export | kind | signature | description |
|---|---|---|---|
| `makeGSuiteClientV2` | function | `function makeGSuiteClientV2(user: string) => Promise<OfficeServiceV2>` |  |
| `makeGSuiteClient` | function | `function makeGSuiteClient(user: string) => Promise<OfficeServiceV1>` |  |
| `findOptimalMeetingTimeV2` | function | `function findOptimalMeetingTimeV2({ calendar, attendees, timezone, windowStartUTC, windowEndUTC, durationMinutes, workingHours, slotStepMinutes, skipFriday, }: FindArgs) => Promise<Slot[]>` |  |
| `deriveWindowFromTimeframe` | function | `function deriveWindowFromTimeframe(req: MeetingRequest, now?: Date) => DerivedWindow` | /** * Derive a scheduling window from a MeetingRequest. * * Assumptions: * - All input instants and strings are UTC. * - All computations use UTC getters/setters (host-TZ agnostic). * * @param req Meeting request * @param now "Now" (defaults to system clock; must be a UTC instant) */ |
| `summarizeCalendars` | function | `function summarizeCalendars(args: ListCalendarArgs) => Promise<Summaries>` |  |
| `searchDriveFiles` | function | `function searchDriveFiles(driveClient: drive_v3.Drive, params: DriveSearchParams) => Promise<DriveSearchResult>` | /** * Searches for files in Google Drive based on the provided parameters * @param driveClient - The Google Drive API client * @param params - The search parameters * @returns Promise resolving to search results */ |
| `extractJsonFromBackticks` | function | `function extractJsonFromBackticks(text: string) => string` |  |
| `extractHtmlFromBackticks` | function | `function extractHtmlFromBackticks(text: string) => string` |  |
| `cleanJsonString` | function | `function cleanJsonString(src: string) => string` |  |
| `formatIsoDateStringForLocalDate` | function | `function formatIsoDateStringForLocalDate(date: Date) => string` |  |
| `getLogger` | function | `function getLogger() => { getLog: () => string; log: (message: string) => string; }` |  |
| `sanitizeJSONString` | function | `function sanitizeJSONString(input: string) => string` |  |
| `getUniqueStateIds` | function | `function getUniqueStateIds(inputArray: StateConfig[], parent?: StateConfig) => StateConfig[]` |  |
| `uuidv4` | function | `function uuidv4() => string` |  |
| `generateMarkdownTable` | function | `function generateMarkdownTable(jsonData: Record<string, any>[]) => string` |  |
| `dotProduct` | function | `function dotProduct(arr1: K[], arr2: K[]) => number` |  |
| `createLoggingService` | function | `function createLoggingService(perExecBytes?: number, globalBytes?: number, now?: () => number) => { log: (executionId: string, message: string) => void; getLog: (executionId: string) => string; __debug: () => { executionIds: string[]; totalBytes: number; bufferBytes: (id: string) => number; }; }` |  |
| `partsInTZ` | function | `function partsInTZ(d: Date, tz: string) => { year: number; month: number; day: number; hour: number; minute: number; second: number; }` | /** Extract Y/M/D/h/m/s as seen in `tz` for a given UTC instant. */ |
| `toZonedISOString` | function | `function toZonedISOString(utc: Date, tz: string) => string` | /** Render the SAME UTC instant as local time in `tz` with ±HH:MM suffix. */ |
| `toUTCFromWallClockLocal` | function | `function toUTCFromWallClockLocal(wallClock: Date, tz: string) => Date` | /** Build "YYYY-MM-DDTHH:mm:ss" from a wall-clock Date and convert to the UTC instant for `tz`. */ |
| `wallClockToUTC` | function | `function wallClockToUTC(isoOrOffsetStr: string, tz: string) => Date` | /** Convert a wall-clock string in `tz` to a UTC instant. * Supports: * - ISO no-offset: "YYYY-MM-DDTHH:mm[:ss]" → interpret as wall-clock in `tz` * - Explicit offset/Z (e.g., "...Z", "...+02:00", "GMT-0700 (...)") → parsed as real instant */ |
| `workingHoursUTCForDate` | function | `function workingHoursUTCForDate(baseUTC: Date, tz: string, localStartHour: number, localEndHour: number) => { start_hour: number; end_hour: number; }` | /** Return UTC-hour numbers for the intended local working hours on the given date. */ |
| `dowInTZ` | function | `function dowInTZ(dUTC: Date, tz: string) => number` | /** Day-of-week index (0=Sun..6=Sat) for a UTC instant as seen in `tz`. */ |
| `mondayOfWeek` | function | `function mondayOfWeek(dUTC: Date, tz: string) => Date` | /** Monday at LOCAL start-hour for the week containing `dUTC` in `tz` → UTC instant. */ |
| `fridayOfWeek` | function | `function fridayOfWeek(dUTC: Date, tz: string) => Date` | /** Friday at LOCAL end-hour for the week containing `dUTC` in `tz` → UTC instant. */ |
| `dayInTZ` | function | `function dayInTZ(isoWithOffset: string, tz: string) => number` |  |
| `detectIanaTimeZone` | function | `function detectIanaTimeZone() => string` |  |
| `loadServiceAccountFromEnv` | function | `function loadServiceAccountFromEnv() => Promise<ServiceAccountCredentials>` |  |
| `makeGoogleAuth` | function | `function makeGoogleAuth(credentials: ServiceAccountCredentials, scopes: string[], user: string) => import("/Users/doriansmiley/workspace/foundry-developer-foundations/node_modules/google-auth-library/build/src/index").GoogleAuth<import("/Users/doriansmiley/workspace/foundry-developer-foundations/node_modules/google-auth-library/build/src/auth/googleauth").JSONClient>` |  |
| `findOptimalMeetingTime` | function | `function findOptimalMeetingTime(calendar: calendar_v3.Calendar, context: OptimalTimeContext) => Promise<FindOptimalMeetingTimeOutput>` |  |
| `scheduleMeeting` | function | `function scheduleMeeting(calendar: calendar_v3.Calendar, context: CalendarContext) => Promise<ScheduleMeetingOutput>` |  |
| `sendEmail` | function | `function sendEmail(gmail: gmail_v1.Gmail, context: EmailContext) => Promise<SendEmailOutput>` |  |
| `readEmailHistory` | function | `function readEmailHistory(gmail: gmail_v1.Gmail, context: ReadEmailHistoryContext) => Promise<EmailMessage[]>` |  |
| `watchEmails` | function | `function watchEmails(context: WatchEmailsInput, makeClient: (userId: string) => Promise<{ emailClient: gmail_v1.Gmail; calendarClient: calendar_v3.Calendar; }>) => Promise<WatchEmailsOutput>` |  |
| `extractJsonFromBackticks` | function | `function extractJsonFromBackticks(text: string) => string` |  |
| `extractHtmlFromBackticks` | function | `function extractHtmlFromBackticks(text: string) => string` |  |
| `cleanJsonString` | function | `function cleanJsonString(src: string) => string` |  |
| `formatIsoDateStringForLocalDate` | function | `function formatIsoDateStringForLocalDate(date: Date) => string` |  |
| `getLogger` | function | `function getLogger() => { getLog: () => string; log: (message: string) => string; }` |  |
| `sanitizeJSONString` | function | `function sanitizeJSONString(input: string) => string` |  |
| `getUniqueStateIds` | function | `function getUniqueStateIds(inputArray: StateConfig[], parent?: StateConfig) => StateConfig[]` |  |
| `uuidv4` | function | `function uuidv4() => string` |  |
| `generateMarkdownTable` | function | `function generateMarkdownTable(jsonData: Record<string, any>[]) => string` |  |
| `dotProduct` | function | `function dotProduct(arr1: K[], arr2: K[]) => number` |  |
| `createLoggingService` | function | `function createLoggingService(perExecBytes?: number, globalBytes?: number, now?: () => number) => { log: (executionId: string, message: string) => void; getLog: (executionId: string) => string; __debug: () => { executionIds: string[]; totalBytes: number; bufferBytes: (id: string) => number; }; }` |  |
| `partsInTZ` | function | `function partsInTZ(d: Date, tz: string) => { year: number; month: number; day: number; hour: number; minute: number; second: number; }` | /** Extract Y/M/D/h/m/s as seen in `tz` for a given UTC instant. */ |
| `toZonedISOString` | function | `function toZonedISOString(utc: Date, tz: string) => string` | /** Render the SAME UTC instant as local time in `tz` with ±HH:MM suffix. */ |
| `toUTCFromWallClockLocal` | function | `function toUTCFromWallClockLocal(wallClock: Date, tz: string) => Date` | /** Build "YYYY-MM-DDTHH:mm:ss" from a wall-clock Date and convert to the UTC instant for `tz`. */ |
| `wallClockToUTC` | function | `function wallClockToUTC(isoOrOffsetStr: string, tz: string) => Date` | /** Convert a wall-clock string in `tz` to a UTC instant. * Supports: * - ISO no-offset: "YYYY-MM-DDTHH:mm[:ss]" → interpret as wall-clock in `tz` * - Explicit offset/Z (e.g., "...Z", "...+02:00", "GMT-0700 (...)") → parsed as real instant */ |
| `workingHoursUTCForDate` | function | `function workingHoursUTCForDate(baseUTC: Date, tz: string, localStartHour: number, localEndHour: number) => { start_hour: number; end_hour: number; }` | /** Return UTC-hour numbers for the intended local working hours on the given date. */ |
| `dowInTZ` | function | `function dowInTZ(dUTC: Date, tz: string) => number` | /** Day-of-week index (0=Sun..6=Sat) for a UTC instant as seen in `tz`. */ |
| `mondayOfWeek` | function | `function mondayOfWeek(dUTC: Date, tz: string) => Date` | /** Monday at LOCAL start-hour for the week containing `dUTC` in `tz` → UTC instant. */ |
| `fridayOfWeek` | function | `function fridayOfWeek(dUTC: Date, tz: string) => Date` | /** Friday at LOCAL end-hour for the week containing `dUTC` in `tz` → UTC instant. */ |
| `dayInTZ` | function | `function dayInTZ(isoWithOffset: string, tz: string) => number` |  |
| `detectIanaTimeZone` | function | `function detectIanaTimeZone() => string` |  |

## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._

## Quickstart (Worked Examples from Jest Tests) <!-- anchor: worked_examples -->
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

- **should build query with keywords only** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with keywords only', async () => {
      const params: DriveSearchParams = {
        keywords: ['transcripts', 'meeting'],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'transcripts' or name contains 'meeting') and trashed = false",
        })
      );
    })
```

- **should build query with date range** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with date range', async () => {
      const params: DriveSearchParams = {
        dateRange: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          field: DriveDateField.CREATED_TIME,
        },
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "createdTime >= '2024-01-01T00:00:00.000Z' and createdTime <= '2024-12-31T00:00:00.000Z' and trashed = false",
        })
      );
    })
```

- **should build query with MIME type** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with MIME type', async () => {
      const params: DriveSearchParams = {
        mimeType: 'application/pdf',
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "mimeType = 'application/pdf' and trashed = false",
        })
      );
    })
```

- **should build query with owner** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with owner', async () => {
      const params: DriveSearchParams = {
        owner: 'user@example.com',
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "'user@example.com' in owners and trashed = false",
        })
      );
    })
```

- **should build query with shared with me** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with shared with me', async () => {
      const params: DriveSearchParams = {
        sharedWithMe: true,
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'sharedWithMe and trashed = false',
        })
      );
    })
```

- **should build query with trashed files** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build query with trashed files', async () => {
      const params: DriveSearchParams = {
        trashed: true,
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'trashed = true',
        })
      );
    })
```

- **should build complex query with multiple parameters** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should build complex query with multiple parameters', async () => {
      const params: DriveSearchParams = {
        keywords: ['project', 'report'],
        dateRange: {
          startDate: new Date('2024-01-01'),
          field: DriveDateField.MODIFIED_TIME,
        },
        mimeType: 'application/pdf',
        owner: 'user@example.com',
        pageSize: 50,
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'project' or name contains 'report') and modifiedTime >= '2024-01-01T00:00:00.000Z' and mimeType = 'application/pdf' and 'user@example.com' in owners and trashed = false",
          pageSize: 50,
        })
      );
    })
```

- **should escape special characters in keywords** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should escape special characters in keywords', async () => {
      const params: DriveSearchParams = {
        keywords: ['test (draft)', 'file[final]', 'report v2.0'],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'test \\(draft\\)' or name contains 'file\\[final\\]' or name contains 'report v2\\.0') and trashed = false",
        })
      );
    })
```

- **should handle keywords with quotes** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle keywords with quotes', async () => {
      const params: DriveSearchParams = {
        keywords: ['file "important"', "doc 'final'"],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'file \\\"important\\\"' or name contains 'doc \\'final\\'') and trashed = false",
        })
      );
    })
```

- **should handle keywords with backslashes** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle keywords with backslashes', async () => {
      const params: DriveSearchParams = {
        keywords: ['backup\\copy', 'path\\to\\file'],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'backup\\\\copy' or name contains 'path\\\\to\\\\file') and trashed = false",
        })
      );
    })
```

- **should return converted files successfully** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should return converted files successfully', async () => {
      const mockApiResponse = {
        data: {
          files: [
            {
              id: 'file1',
              name: 'test.pdf',
              mimeType: 'application/pdf',
              size: '1024',
              createdTime: '2024-01-01T00:00:00.000Z',
              modifiedTime: '2024-01-02T00:00:00.000Z',
              webViewLink: 'https://drive.google.com/file/d/file1/view',
              webContentLink: 'https://drive.google.com/uc?id=file1',
              owners: [
                {
                  displayName: 'John Doe',
                  emailAddress: 'john@example.com',
                },
              ],
              lastModifyingUser: {
                displayName: 'Jane Doe',
                emailAddress: 'jane@example.com',
              },
              parents: ['parent1'],
              description: 'Test file',
              starred: true,
              trashed: false,
            },
          ],
          nextPageToken: 'next-token',
          incompleteSearch: true,
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockApiResponse);

      const pa
/* …snip… */
 '2024-01-02T00:00:00.000Z',
            webViewLink: 'https://drive.google.com/file/d/file1/view',
            webContentLink: 'https://drive.google.com/uc?id=file1',
            owners: [
              {
                displayName: 'John Doe',
                emailAddress: 'john@example.com',
              },
            ],
            lastModifyingUser: {
              displayName: 'Jane Doe',
              emailAddress: 'jane@example.com',
            },
            parents: ['parent1'],
            description: 'Test file',
            starred: true,
            trashed: false,
          },
        ],
        nextPageToken: 'next-token',
        incompleteSearch: true,
      });
    })
```

- **should handle empty response** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle empty response', async () => {
      const mockApiResponse = {
        data: {
          files: [],
          nextPageToken: undefined,
          incompleteSearch: undefined,
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockApiResponse);

      const params: DriveSearchParams = {
        keywords: ['nonexistent'],
      };

      const result = await searchDriveFiles(mockDriveClient, params);

      expect(result).toEqual({
        files: [],
        nextPageToken: undefined,
        incompleteSearch: undefined,
      });
    })
```

- **should handle null files in response** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle null files in response', async () => {
      const mockApiResponse = {
        data: {
          files: null,
          nextPageToken: undefined,
          incompleteSearch: undefined,
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockApiResponse);

      const params: DriveSearchParams = {
        keywords: ['test'],
      };

      const result = await searchDriveFiles(mockDriveClient, params);

      expect(result).toEqual({
        files: [],
        nextPageToken: undefined,
        incompleteSearch: undefined,
      });
    })
```

- **should bubble authentication errors** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should bubble authentication errors', async () => {
      const authError = new Error('invalid_grant: Invalid credentials');
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue(authError);

      const params: DriveSearchParams = { keywords: ['test'] };

      await expect(searchDriveFiles(mockDriveClient, params)).rejects.toThrow(
        'invalid_grant: Invalid credentials'
      );
    })
```

- **should bubble quota exceeded errors** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should bubble quota exceeded errors', async () => {
      const quotaError = new Error('quota exceeded');
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue(quotaError);

      const params: DriveSearchParams = { keywords: ['test'] };

      await expect(searchDriveFiles(mockDriveClient, params)).rejects.toThrow('quota exceeded');
    })
```

- **should bubble not found errors** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should bubble not found errors', async () => {
      const notFoundError = new Error('notFound: Drive not found');
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue(notFoundError);

      const params: DriveSearchParams = { keywords: ['test'] };

      await expect(searchDriveFiles(mockDriveClient, params)).rejects.toThrow(
        'notFound: Drive not found'
      );
    })
```

- **should bubble generic errors** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should bubble generic errors', async () => {
      const genericError = new Error('Something went wrong');
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue(genericError);

      const params: DriveSearchParams = { keywords: ['test'] };

      await expect(searchDriveFiles(mockDriveClient, params)).rejects.toThrow('Something went wrong');
    })
```

- **should bubble non-Error rejections as-is** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should bubble non-Error rejections as-is', async () => {
      (mockDriveClient.files.list as jest.Mock).mockRejectedValue('String error');

      const params: DriveSearchParams = { keywords: ['test'] };

      await expect(searchDriveFiles(mockDriveClient, params)).rejects.toEqual('String error');
    })
```

- **should handle empty keywords array** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle empty keywords array', async () => {
      const params: DriveSearchParams = {
        keywords: [],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: 'trashed = false',
        })
      );
    })
```

- **should filter out empty keywords** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should filter out empty keywords', async () => {
      const params: DriveSearchParams = {
        keywords: ['valid', 'another-valid'], // Remove empty keywords since validation now prevents them
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'valid' or name contains 'another-valid') and trashed = false",
        })
      );
    })
```

- **should handle whitespace in keywords** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle whitespace in keywords', async () => {
      const params: DriveSearchParams = {
        keywords: ['  project plan  ', '  meeting notes  '],
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "(name contains 'project plan' or name contains 'meeting notes') and trashed = false",
        })
      );
    })
```

- **should handle whitespace in MIME type and owner** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle whitespace in MIME type and owner', async () => {
      const params: DriveSearchParams = {
        mimeType: '  application/pdf  ',
        owner: 'user@example.com', // Remove whitespace since validation now prevents invalid emails
      };

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          q: "mimeType = 'application/pdf' and 'user@example.com' in owners and trashed = false",
        })
      );
    })
```

- **should use default values for optional parameters** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should use default values for optional parameters', async () => {
      const params: DriveSearchParams = {};

      await searchDriveFiles(mockDriveClient, params);

      expect(mockDriveClient.files.list).toHaveBeenCalledWith(
        expect.objectContaining({
          pageSize: 100,
          orderBy: 'modifiedTime desc',
          fields: 'nextPageToken,files(id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink,owners,lastModifyingUser,parents,description,starred,trashed)',
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
        })
      );
    })
```

- **should handle files with missing optional fields** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle files with missing optional fields', async () => {
      const mockApiResponse = {
        data: {
          files: [
            {
              id: 'file1',
              name: 'test.pdf',
              mimeType: 'application/pdf',
              // Missing optional fields
            },
          ],
          nextPageToken: undefined,
          incompleteSearch: undefined,
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockApiResponse);

      const params: DriveSearchParams = {
        keywords: ['test'],
      };

      const result = await searchDriveFiles(mockDriveClient, params);

      expect(result.files[0]).toEqual({
        id: 'file1',
        name: 'test.pdf',
        mimeType: 'application/pdf',
        size: undefined,
        createdTime: undefined,
        modifiedTime: undefined,
        webViewLink: undefined,
        webContentLink: undefined,
        owners: undefined,
        lastModifyingUser: undefined,
        parents: undefined,
        description: undefined,
        starred: undefined,
        trashed: undefined,
      });
    })
```

- **should handle files with null owners** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/searchDriveFiles.test.ts_
```ts
it('should handle files with null owners', async () => {
      const mockApiResponse = {
        data: {
          files: [
            {
              id: 'file1',
              name: 'test.pdf',
              mimeType: 'application/pdf',
              owners: null,
            },
          ],
          nextPageToken: undefined,
          incompleteSearch: undefined,
        },
      };

      (mockDriveClient.files.list as jest.Mock).mockResolvedValue(mockApiResponse);

      const params: DriveSearchParams = {
        keywords: ['test'],
      };

      const result = await searchDriveFiles(mockDriveClient, params);

      expect(result.files[0].owners).toBeUndefined();
    })
```

- **should call searchDriveFiles delegate with correct parameters** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should call searchDriveFiles delegate with correct parameters', async () => {
      const mockSearchResult = {
        files: [
          {
            id: 'file1',
            name: 'test.pdf',
            mimeType: 'application/pdf',
          },
        ],
        nextPageToken: 'next-token',
        incompleteSearch: false,
      };

      mockSearchDriveFiles.mockResolvedValue(mockSearchResult);

      const client = await makeGSuiteClientV2(mockUser);
      const searchParams: DriveSearchParams = {
        keywords: ['test'],
        mimeType: 'application/pdf',
      };

      const result = await client.searchDriveFiles(searchParams);

      expect(mockSearchDriveFiles).toHaveBeenCalledWith(expect.any(Object), searchParams);
      expect(result).toEqual({
        message: 'Found 1 files matching your search criteria',
        files: mockSearchResult.files,
        totalResults: 1,
        nextPageToken: 'next-token',
        incompleteSearch: false,
      });
    })
```

- **should handle empty search results** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should handle empty search results', async () => {
      const mockSearchResult = {
        files: [],
        nextPageToken: undefined,
        incompleteSearch: false,
      };

      mockSearchDriveFiles.mockResolvedValue(mockSearchResult);

      const client = await makeGSuiteClientV2(mockUser);
      const searchParams: DriveSearchParams = {
        keywords: ['nonexistent'],
      };

      const result = await client.searchDriveFiles(searchParams);

      expect(result).toEqual({
        message: 'Found 0 files matching your search criteria',
        files: [],
        totalResults: 0,
        nextPageToken: undefined,
        incompleteSearch: false,
      });
    })
```

- **should handle multiple files in search results** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should handle multiple files in search results', async () => {
      const mockSearchResult = {
        files: [
          {
            id: 'file1',
            name: 'test1.pdf',
            mimeType: 'application/pdf',
          },
          {
            id: 'file2',
            name: 'test2.docx',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          },
          {
            id: 'file3',
            name: 'test3.xlsx',
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
        nextPageToken: 'next-token',
        incompleteSearch: true,
      };

      mockSearchDriveFiles.mockResolvedValue(mockSearchResult);

      const client = await makeGSuiteClientV2(mockUser);
      const searchParams: DriveSearchParams = {
        keywords: ['test'],
      };

      const result = await client.searchDriveFiles(searchParams);

      expect(result).toEqual({
        message: 'Found 3 files matching your search criteria',
        files: mockSearchResult.files,
        totalResults: 3,
        nextPageToken: 'next-token',
        incompleteSearch: true,
      });
    })
```

- **should propagate errors from searchDriveFiles delegate** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should propagate errors from searchDriveFiles delegate', async () => {
      const error = new Error('Search failed');
      mockSearchDriveFiles.mockRejectedValue(error);

      const client = await makeGSuiteClientV2(mockUser);
      const searchParams: DriveSearchParams = {
        keywords: ['test'],
      };

      await expect(client.searchDriveFiles(searchParams)).rejects.toThrow('Search failed');
    })
```

- **should handle complex search parameters** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should handle complex search parameters', async () => {
      const mockSearchResult = {
        files: [
          {
            id: 'file1',
            name: 'project-report.pdf',
            mimeType: 'application/pdf',
          },
        ],
        nextPageToken: undefined,
        incompleteSearch: false,
      };

      mockSearchDriveFiles.mockResolvedValue(mockSearchResult);

      const client = await makeGSuiteClientV2(mockUser);
      const searchParams: DriveSearchParams = {
        keywords: ['project', 'report'],
        dateRange: {
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
          field: DriveDateField.CREATED_TIME,
        },
        mimeType: 'application/pdf',
        owner: 'user@example.com',
        sharedWithMe: true,
        pageSize: 50,
        orderBy: 'createdTime desc',
      };

      const result = await client.searchDriveFiles(searchParams);

      expect(mockSearchDriveFiles).toHaveBeenCalledWith(expect.any(Object), searchParams);
      expect(result.message).toBe('Found 1 files matching your search criteria');
      expect(result.totalResults).toBe(1);
    })
```

- **should call makeGSuiteClient with correct user** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should call makeGSuiteClient with correct user', async () => {
      await makeGSuiteClientV2(mockUser);

      expect(mockMakeGSuiteClient).toHaveBeenCalledWith(mockUser);
    })
```

- **should return all v1 client methods plus searchDriveFiles** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should return all v1 client methods plus searchDriveFiles', async () => {
      const client = await makeGSuiteClientV2(mockUser);

      // Check that v2 specific methods are available
      expect(client.searchDriveFiles).toBeDefined();
      expect(client.summarizeCalendars).toBeDefined();
      expect(client.getAvailableMeetingTimes).toBeDefined();
    })
```

- **should preserve v1 client functionality** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should preserve v1 client functionality', async () => {
      const client = await makeGSuiteClientV2(mockUser);

      // Test that v1 methods are available on the client
      expect(typeof client.getCalendarClient).toBe('function');
      expect(typeof client.getEmailClient).toBe('function');
      expect(typeof client.getDriveClient).toBe('function');
    })
```

- **should propagate errors from makeGSuiteClient** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/gsuiteClient.v2.test.ts_
```ts
it('should propagate errors from makeGSuiteClient', async () => {
      const error = new Error('Failed to create v1 client');
      mockMakeGSuiteClient.mockRejectedValue(error);

      await expect(makeGSuiteClientV2(mockUser)).rejects.toThrow('Failed to create v1 client');
    })
```

## Jest Mocks Used <!-- anchor: jest_mocks -->
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
**Q:** What is the date of Monday of the week for 2024-02-20T10:00:00.000Z in America/Los_Angeles?
**A:**
```typescript
mondayOfWeek(new Date('2024-02-20T10:00:00.000Z'), 'America/Los_Angeles')
```
> _Using example values for the date and timezone._

**Q:** What is the date of Friday of the week for 2024-02-20T10:00:00.000Z in America/Los_Angeles?
**A:**
```typescript
fridayOfWeek(new Date('2024-02-20T10:00:00.000Z'), 'America/Los_Angeles')
```
> _Using example values for the date and timezone._

**Q:** What are the UTC working hours for 2024-02-20T10:00:00.000Z in America/Los_Angeles, with local start hour 9 and local end hour 17?
**A:**
```typescript
workingHoursUTCForDate(new Date('2024-02-20T10:00:00.000Z'), 'America/Los_Angeles', 9, 17)
```
> _Using example values for the date, timezone and local working hours._

**Q:** Find an optimal meeting time with attendees ['attendee1@example.com', 'attendee2@example.com'] in America/Los_Angeles, starting at 2024-02-21T14:00:00.000Z and ending at 2024-02-22T02:00:00.000Z for 60 minutes with slot steps of 15 minutes, calendar 'primary' and skipFriday set to false.
**A:**
```typescript
await findOptimalMeetingTimeV2({ calendar: 'primary', attendees: ['attendee1@example.com', 'attendee2@example.com'], timezone: 'America/Los_Angeles', windowStartUTC: new Date('2024-02-21T14:00:00.000Z'), windowEndUTC: new Date('2024-02-22T02:00:00.000Z'), durationMinutes: 60, workingHours: { start: 9, end: 17 }, slotStepMinutes: 15, skipFriday: false })
```
> _Using example values for attendees, timezone, start/end dates, duration, working hours and slot steps._

**Q:** Derive a scheduling window from a meeting request.
**A:**
```typescript
deriveWindowFromTimeframe({} as MeetingRequest)
```
> _Creating a minimal stub for the MeetingRequest type since no specific request details are known._

**Q:** Make a GSuite client V2 for the user 'test@example.com'.
**A:**
```typescript
await makeGSuiteClientV2('test@example.com')
```
> _Using a placeholder email for the user._

**Q:** Make a GSuite client for the user 'test@example.com'.
**A:**
```typescript
await makeGSuiteClient('test@example.com')
```
> _Using a placeholder email for the user._

**Q:** Convert the wall-clock string '2024-03-05T10:00:00' in America/Los_Angeles to a UTC instant.
**A:**
```typescript
wallClockToUTC('2024-03-05T10:00:00', 'America/Los_Angeles')
```
> _Using example values for the ISO string and timezone._

**Q:** Find an optimal meeting time with attendees ['john.doe@example.com', 'jane.doe@example.com'] in America/Los_Angeles, starting at 2024-03-08T16:00:00.000Z and ending at 2024-03-08T23:00:00.000Z for 30 minutes with slot steps of 15 minutes, calendar set to 'Work Calendar', and skipping Fridays.
**A:**
```typescript
await findOptimalMeetingTimeV2({ calendar: 'Work Calendar', attendees: ['john.doe@example.com', 'jane.doe@example.com'], timezone: 'America/Los_Angeles', windowStartUTC: new Date('2024-03-08T16:00:00.000Z'), windowEndUTC: new Date('2024-03-08T23:00:00.000Z'), durationMinutes: 30, workingHours: { start: 8, end: 17 }, slotStepMinutes: 15, skipFriday: true })
```
> _Using example values for attendees, timezone, start/end dates, duration, working hours and slot steps. skipFriday is set to true._

**Q:** Summarize calendars with calendarIds 'cal1, cal2'.
**A:**
```typescript
await summarizeCalendars({ calendarIds: 'cal1, cal2' })
```
> _Using example calendar IDs._

**Q:** Detect the IANA time zone.
**A:**
```typescript
detectIanaTimeZone()
```
> _Calling without arguments as per signature._

**Q:** Format 2024-02-20T10:00:00.000Z to local date string.
**A:**
```typescript
formatIsoDateStringForLocalDate(new Date('2024-02-20T10:00:00.000Z'))
```
> _Using an example date._

## Synthetic Variations <!-- anchor: synthetic_variations -->
_No generators proposed._

## Guardrails & Quality <!-- anchor: guardrails_quality -->
_Include test coverage & invariants if available (future enhancement)._

## Open Questions / Needs from Engineer <!-- anchor: questions_for_engineer -->
_None_

## Appendix <!-- anchor: appendix -->
- Stable section anchors provided for agent navigation.
- IDs: Prefer path-based IDs for files and export names for API items.