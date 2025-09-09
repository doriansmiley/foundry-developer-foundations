# Google Service Package 🚀

A comprehensive Google Workspace integration library providing seamless access to Gmail and Google Calendar APIs. This package offers both v1 and v2 clients with enhanced functionality for email management, calendar operations, and intelligent meeting scheduling.

## 📋 Available Functions

### Email Operations

#### `sendEmail`

- **Instruction**: "create sending email function to send an custom tempalted email"

- **Design spec**
  - **Overview**: Implement `sendEmail` delegate using `googleapis@149.0.0` to send a single-template email. Expose it only via `gsuiteClient.ts` and scaffold tests per package conventions.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0` preferred; REST fallback allowed
    - **Exposure**: Only through `gsuiteClient.ts`
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.ts`
  - **Auth scopes required** (must be added in `gsuiteClient.ts` mail scopes):
    - `https://mail.google.com/`
    - `https://www.googleapis.com/auth/gmail.modify`
    - `https://www.googleapis.com/auth/gmail.compose`
    - `https://www.googleapis.com/auth/gmail.send`
  - **External API reference**: `users.messages.send` — `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send`
  - **Inputs and outputs**
    - **Input type**: `EmailContext`
      - `from: string` (required)
      - `recipients: string | string[]` (required)
      - `subject: string` (required)
      - `message: string` (required; HTML allowed; plain-text auto-derived)
    - **Output type**: `SendEmailOutput`
      - `id: string`, `threadId: string`, `labelIds?: string[]`
  - **Functional behavior**
    - Validate `from`, `recipients`, `subject`, `message`
    - Build `multipart/alternative` MIME with `text/plain` (derived) and `text/html` (provided + footer)
    - Base64url encode MIME and call `gmail.users.messages.send({ userId: 'me', requestBody: { raw } })`
    - Return `{ id, threadId, labelIds }`
  - **Error handling**
    - Throw on invalid input; validate Gmail response contains `id` and `threadId`
    - Log minimal context; include `.response.data` when present; rethrow errors
  - **Security and privacy**
    - Never log credentials; avoid logging full message content
  - **Acceptance criteria**
    - Returns `{ id, threadId }` on success; MIME is well-formed and properly encoded; exposed only through `gsuiteClient.ts`
  - **Usage (via client)**

```typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

await client.sendEmail({
  from: 'user@company.com',
  recipients: ['team@company.com'],
  subject: 'Weekly Update',
  message: '<p>Here is this week’s summary…</p>',
});
```

#### `readEmailHistory`

- **Instruction**: "Implement fucntion to fetch unread emails since a given time (publishTime - 15m), optionally filtered by labels."

- **Design spec**
  - **Overview**: Implement `readEmailHistory` delegate using `googleapis@149.0.0` to retrieve recent unread emails since a given timestamp, with optional label filtering. Expose it only via `gsuiteClient.ts`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0`
    - **Exposure**: Only through `gsuiteClient.ts`
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.ts`
  - **Auth scopes required** (must be added in `gsuiteClient.ts` mail scopes):
    - `https://www.googleapis.com/auth/gmail.readonly`
    - `https://www.googleapis.com/auth/gmail.metadata`
  - **External API references**:
    - `users.messages.list` — `https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list`
    - `users.messages.get` — `https://developers.google.com/gmail/api/reference/rest/v1/users.messages/get`
    - `users.threads.get` — `https://developers.google.com/gmail/api/reference/rest/v1/users.threads/get`
  - **Inputs and outputs**
    - **Input type**: `ReadEmailHistoryContext`
      - `email: string` (required)
      - `publishTime: string` (required; ISO timestamp)
      - `labels?: string[]` (optional)
    - **Output type**: `{ messages: EmailMessage[] }`
      - Each `EmailMessage`: `subject`, `from`, `body`, `id`, `threadId`
  - **Functional behavior**
    - Compute `after` epoch as `(publishTime - 15 minutes)` to handle notification jitter
    - Build query: `is:unread after:<epoch_seconds>` plus optional label OR group
    - List candidate messages, fetch message details (`format: 'full'`), collect unique thread IDs
    - Fetch threads (`format: 'full'`), flatten messages, extract headers and plain-text body
    - Return `{ messages }`
  - **Error handling**
    - Use `Promise.allSettled` for message fetches; skip failures
    - Safe base64 decoding with try/catch; missing headers allowed
    - Propagate thread-level errors; do not fail on individual message decode issues
  - **Security and privacy**
    - Use least-privilege scopes; do not log message content
  - **Acceptance criteria**
    - Filters unread messages since `publishTime - 15 minutes`
    - Applies optional label filters
    - Returns flattened messages with expected fields
    - Implemented and exposed only via `gsuiteClient.ts`; required scopes present there
  - **Usage (via client)**

```typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('system@company.com');

const history = await client.readEmailHistory({
  email: 'user@company.com',
  publishTime: '2024-01-15T10:30:00Z',
  labels: ['INBOX', 'IMPORTANT'],
});

// history.messages -> EmailMessage[]
```

#### `watchEmails`

- **Instruction**: "Implement a bulk Gmail watch setup: for each user, configure users.watch with label filters and return a summary of successes/errors"

- **Design spec**
  - **Overview**: Implement `watchEmails` delegate to configure Gmail push notifications across multiple users using `googleapis@149.0.0` `users.watch`. Delegate accepts a client factory to impersonate each user. Expose it only via `gsuiteClient.ts`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0`
    - **Exposure**: Only through `gsuiteClient.ts`
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.ts`
  - **Auth scopes required** (must be added in `gsuiteClient.ts` mail scopes):
    - `https://www.googleapis.com/auth/gmail.readonly`
    - `https://www.googleapis.com/auth/gmail.metadata` (optional)
  - **External API reference**: `users.watch` — `https://developers.google.com/gmail/api/reference/rest/v1/users/watch`
  - **Inputs and outputs**
    - **Input type**: `WatchEmailsInput`
      - `config: { topicName: string; users: string[]; labelIds?: string[]; labelFilterBehavior?: 'include' | 'exclude'; }[]`
    - **Output type**: `WatchEmailsOutput`
      - `{ status: number; errors: string[]; responses: string[] }`
  - **Functional behavior**
    - For each config entry and user, impersonate via provided `makeClient(userId)` and call `gmail.users.watch`
    - Throttle auth bursts with small delay to avoid rate limits
    - Aggregate non-200 responses and rejections in `errors`; collect successful responses as strings
    - Return `{ status: 200 }` if no errors; otherwise `{ status: 400 }`
  - **Error handling**
    - Use `Promise.allSettled` to collect per-user results; include error messages or response payloads in `errors`
  - **Security and privacy**
    - Use least-privilege scopes; do not log sensitive config details
    - Pub/Sub topic must exist and Gmail service account must have publish permission
  - **Acceptance criteria**
    - Creates watches for all specified users and labels
    - Returns aggregated `responses` and `errors` with appropriate `status`
    - Implemented and exposed only via `gsuiteClient.ts`; required scopes present there
  - **Usage (via client)**

```typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('system@company.com');

const result = await client.watchEmails({
  config: [
    {
      topicName: 'projects/my-project/topics/gmail-push',
      users: ['user1@company.com', 'user2@company.com'],
      labelIds: ['INBOX', 'IMPORTANT'],
      labelFilterBehavior: 'include',
    },
  ],
});
```

### Calendar Operations

#### `scheduleMeeting`

- **Instruction**: "Create a meeting scheduler that invites attendees and guarantees a Meet link; send calendar updates to all participants."

- **Design spec**
  - **Overview**: Implement `scheduleMeeting` delegate using `googleapis@149.0.0` Calendar API to create an event with Meet conferencing and send invites. Expose it only via `gsuiteClient.ts`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0`
    - **Exposure**: Only through `gsuiteClient.ts`
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.ts`
  - **Auth scopes required** (must be added in `gsuiteClient.ts` calendar scopes):
    - `https://www.googleapis.com/auth/calendar`
    - `https://www.googleapis.com/auth/calendar.events`
  - **External API reference**: `calendar.events.insert` — `https://developers.google.com/calendar/api/v3/reference/events/insert`
  - **Inputs and outputs**
    - **Input type**: `CalendarContext`
      - `summary: string` (required)
      - `description?: string`
      - `start: string` (ISO)
      - `end: string` (ISO)
      - `attendees: string[]` (required)
    - **Output type**: `ScheduleMeetingOutput`
      - `id: string`, `htmlLink: string`, `status: string`
  - **Functional behavior**
    - Validate required fields; construct event body with attendees and `conferenceData` request for Google Meet
    - Call `calendar.events.insert` with `sendUpdates: 'all'` and `conferenceDataVersion: 1`
    - Ensure Meet link present via `hangoutLink` or `conferenceData.entryPoints`
    - Return `{ id, htmlLink, status }`
  - **Error handling**
    - Throw if event creation succeeds without a Meet link
    - Surface underlying API errors
  - **Security and privacy**
    - Do not log sensitive event content
  - **Acceptance criteria**
    - Event is created with Meet link and invitations sent
    - Implemented and exposed only via `gsuiteClient.ts`; required scopes present there
  - **Usage (via client)**

```typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

const meeting = await client.scheduleMeeting({
  summary: 'Product Planning Session',
  description: 'Quarterly product roadmap review and planning',
  start: '2024-02-15T14:00:00-08:00',
  end: '2024-02-15T15:30:00-08:00',
  attendees: ['john@company.com', 'sarah@company.com', 'mike@company.com'],
});
```

#### `getAvailableMeetingTimes` (v1)

- **Instruction**: "Add a basic availability finder that proposes 30-minute slots within business hours"

- **Design spec**
  - **Overview**: Implement v1 `findOptimalMeetingTime` delegate using `googleapis@149.0.0` Calendar API (`events.list` and `freebusy.query`) to compute available time slots. Expose via `gsuiteClient.ts`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0`
    - **Exposure**: Only through `gsuiteClient.ts`
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.ts`
  - **Auth scopes required** (must be added in `gsuiteClient.ts` calendar scopes):
    - `https://www.googleapis.com/auth/calendar`
    - `https://www.googleapis.com/auth/calendar.readonly`
    - `https://www.googleapis.com/auth/calendar.freebusy`
  - **External API references**:
    - `calendar.events.list` — `https://developers.google.com/calendar/api/v3/reference/events/list`
    - `calendar.freebusy.query` — `https://developers.google.com/calendar/api/v3/reference/freebusy/query`
  - **Inputs and outputs**
    - **Input type**: `OptimalTimeContext`
      - `participants: string[]`
      - `timeframe_context: string`
      - `duration_minutes: number`
      - `working_hours: { start_hour: number; end_hour: number }`
      - `timezone?: string`
    - **Output type**: `FindOptimalMeetingTimeOutput`
      - `{ suggested_times: { start: string; end: string; score: number }[]; message: string }`
  - **Functional behavior**
    - Derive search window from `timeframe_context` and working hours
    - Collect events via `events.list` and busy periods via `freebusy.query`; de-duplicate and merge
    - Generate candidate slots at fixed step, score them, and return top N
  - **Error handling**
    - Validate inputs; propagate API errors; guard against invalid dates
  - **Security and privacy**
    - Use least-privilege scopes; avoid logging event contents
  - **Acceptance criteria**
    - Returns a ranked list of time slots and a summary message
    - Implemented and exposed via `gsuiteClient.ts`; required scopes present there
  - **Usage (via client)**

```typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

const times = await client.getAvailableMeetingTimes({
  participants: ['alice@company.com', 'bob@company.com'],
  subject: 'Design Review Meeting',
  timeframe_context: 'this week',
  duration_minutes: 60,
  working_hours: { start_hour: 9, end_hour: 17 },
});
```

#### `getAvailableMeetingTimes` (v2 - Enhanced)

- **Instruction**: "enhance v1 get available meeting times to support multi-day, timezone-accurate scheduling and deterministic slotting; deliver as v2"

- **Design spec**
  - **Overview**: Deliver an enhanced scheduler (`findOptimalMeetingTimeV2`) that addresses v1 limitations by adding multi-day windows, robust timezone handling, deterministic slot slicing, and improved busy-interval merging. Expose via `gsuiteClient.v2.ts` while preserving v1 API in `gsuiteClient.ts`.
  - **Enhancements over v1**
    - **Time windowing**: v1 derives a near-term/day window from `timeframe_context`; v2 supports explicit multi-day local windows (`windowStartLocal`, `windowEndLocal`).
    - **Timezone accuracy**: v1 approximates offsets; v2 uses IANA-aware conversions (`toUTCFromWallClock`, `toZonedISOString`) to handle DST shifts correctly.
    - **Busy merging**: v1 mixes `events.list` and day `freebusy` heuristics; v2 merges all busy intervals deterministically and subtracts them from working windows.
    - **Slot slicing**: v1 iterates 30-min steps within a day; v2 slices across the full window with configurable `slotStepMinutes` and merges adjacent intervals.
    - **Configuration**: v2 supports optional `skipFriday` and flexible working-hour windows across multiple days.
    - **Scoring**: v2 applies a consistent heuristic and sorts globally across the window.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: `googleapis@149.0.0`
    - **Exposure**: Only through `gsuiteClient.v2.ts` (extends v1 client)
    - **Package conventions**:
      - Delegates under `src/lib/delegates/`
      - Tests under `src/lib/tests/`
      - Public API exposed via `gsuiteClient.v2.ts`
  - **Auth scopes required** (configured in `gsuiteClient.ts` calendar scopes already used by v2):
    - `https://www.googleapis.com/auth/calendar`
    - `https://www.googleapis.com/auth/calendar.freebusy`
    - `https://www.googleapis.com/auth/calendar.readonly`
  - **External API references**:
    - `calendar.freebusy.query` — `https://developers.google.com/calendar/api/v3/reference/freebusy/query`
  - **Inputs and outputs**
    - Provided via `MeetingRequest` and v2 adapter logic, ultimately mapped to:
      - `attendees: string[]`, `timezone: string`, `windowStartLocal: Date`, `windowEndLocal: Date`, `durationMinutes: number`, `workingHours: { start_hour: number; end_hour: number }`, optional `slotStepMinutes`, optional `skipFriday`
    - **Output type**: `{ message: string; suggested_times: { start: string; end: string; score: number }[] }`
  - **Functional behavior**
    - Convert local windows to UTC; query `freebusy` for all attendees; merge busy intervals and subtract from daily working windows across the range
    - Slice into step-aligned slots across the full window, score, sort, and map to zoned ISO strings
  - **Error handling**
    - Validate windows, timezone conversions, and inputs; propagate API errors
  - **Security and privacy**
    - Use least-privilege scopes; avoid logging event contents
  - **Acceptance criteria**
    - Supports multi-day windows and DST-safe timezone conversions; returns globally ranked slots
    - Implemented and exposed only via `gsuiteClient.v2.ts`; required scopes configured
  - **Usage (via v2 client)**

```typescript
import { makeGSuiteClientV2 } from './lib/gsuiteClient.v2';

const client = await makeGSuiteClientV2('user@company.com');

const result = await client.getAvailableMeetingTimes({
  participants: ['alice@company.com', 'bob@company.com'],
  subject: 'Design Review Meeting',
  timeframe_context: 'next week',
  duration_minutes: 60,
  working_hours: { start_hour: 9, end_hour: 17 },
});
```

## 🔧 Usage Examples

### Using with Dependency Injection Container

```typescript
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';

// Get v1 service
const officeService = await container.getAsync<OfficeService>(
  TYPES.OfficeService
);

// Send an email
const emailResult = await officeService.sendEmail({
  from: 'admin@company.com',
  recipients: ['team@company.com'],
  subject: 'Weekly Update',
  message: "Here's this week's progress summary...",
});
```

### Direct Client Usage

```typescript
// Initialize client
const gSuiteClient = await makeGSuiteClient('user@company.com');

// Schedule a meeting
const meeting = await gSuiteClient.scheduleMeeting({
  summary: 'All Hands Meeting',
  description: 'Monthly company-wide update',
  start: '2024-02-20T15:00:00-08:00',
  end: '2024-02-20T16:00:00-08:00',
  attendees: ['everyone@company.com'],
});
```

## 🏗️ Built With

- Google APIs Client Library
- OAuth2 Service Account Authentication
- TypeScript for type safety
- Comprehensive error handling and logging

## 📝 Notes

- **v2 Client**: Recommended for new implementations with enhanced features and improved algorithms
- **v1 Client**: Stable version for existing integrations
- **Authentication**: Uses Google Service Account with domain-wide delegation
- **Rate Limiting**: Built-in respect for Google API quotas and limits
