# Overview

Auto-generated; refine with engineer input.

## Quickstart (Worked Examples) <!-- anchor: worked_examples -->
- **deriveWindowFromTimeframe (UTC core, TZ-aware asserts)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **user defined exact date/time: uses the exact minute and step=1 (inside hours)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **user defined exact date/time: clamps start to start_hour if given before-hours time** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **as soon as possible: after hours → next business day 08:00, end = Friday 17:00** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **this week: mid-week → start = clamped now, end = Friday 17:00 this week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **next week: Mon 08:00 next week → Fri 17:00 next week** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts_
- **findOptimalMeetingTimeV2 E2E tests** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts_
- **should get an exact time within PT working hours** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts_
- **findOptimalMeetingTimeV2 (UTC bounds + PT semantics)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **multi-day window: handles union of busy blocks across attendees and days** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **skipFriday=true → zero slots for a Friday-only window** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **works with hardcoded UTC instants (no wallClockToUTC usage)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **rounds up first slot to step boundary and supports step < duration** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **returns 0 when all free gaps are shorter than duration** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **skips weekends even across multi-day spans** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **skipFriday=true removes Friday slots in mixed Thu→Fri range** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **honors windowStart inside the working day (rounds to step)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **returns 0 on a day fully covered by busy** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **merges overlapping and unsorted busy blocks correctly** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **scores earlier slots higher (non-increasing sequence)** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_
- **DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after** — _/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts_

## Public API (Exports) <!-- anchor: public_api -->
| export | kind | signature | description |
|---|---|---|---|
| `makeGSuiteClient` | function | `function makeGSuiteClient(user: string) => Promise<GSuiteCalendarService>` |  |
| `GSUITE_SCOPES` | enum |  |  |
| `ServiceAccountCredentials` | type |  |  |
| `TYPES` | variable |  |  |
| `ResearchAssistant` | type |  |  |
| `Schemas` | variable |  |  |
| `ScheduleMeetingInput` | type |  |  |
| `ScheduleMeetingOutput` | type |  |  |
| `SendEmailOutput` | type |  |  |
| `SendEmailInput` | type |  |  |
| `ReadEmailOutput` | type |  |  |
| `ReadEmailInput` | type |  |  |
| `WatchEmailsOutput` | type |  |  |
| `WatchEmailsInput` | type |  |  |
| `FindOptimalMeetingTimeInput` | type |  |  |
| `FindOptimalMeetingTimeOutput` | type |  |  |
| `UserProfile` | type |  |  |
| `MessageResponse` | type |  |  |
| `Message` | type |  |  |
| `EmailConfig` | interface |  |  |
| `CalendarConfig` | interface |  |  |
| `Config` | interface |  |  |
| `WorkingHours` | interface |  |  |
| `TimeSlot` | interface |  |  |
| `EmailContext` | interface |  |  |
| `ReadEmailHistoryContext` | interface |  |  |
| `CalendarContext` | interface |  |  |
| `OptimalTimeContext` | interface |  |  |
| `TimeRange` | interface |  |  |
| `BusyPeriod` | interface |  |  |
| `EmailMessage` | type |  |  |
| `AvailableTime` | type |  |  |
| `ProposedTimes` | type |  |  |
| `MeetingRequest` | type |  |  |
| `DerivedWindow` | type |  |  |
| `Meeting` | type |  |  |
| `GeminiParameters` | interface |  |  |
| `GeminiService` | interface |  |  |
| `Gpt40Parameters` | interface |  |  |
| `Gpt4oService` | interface |  |  |
| `EmbeddingsService` | interface |  |  |
| `Token` | interface |  |  |
| `BaseOauthClient` | interface |  |  |
| `FoundryClient` | interface |  |  |
| `RangrClient` | interface |  |  |
| `GasScenarioResult` | interface |  |  |
| `EIAResponse` | interface |  |  |
| `VegaGasTrackerData` | interface |  |  |
| `EnergyService` | type |  |  |
| `WeatherService` | interface |  |  |
| `GeminiSearchStockMarket` | interface |  |  |
| `APIError` | interface |  |  |
| `ModuleConfig` | interface |  |  |
| `TestModule` | interface |  |  |
| `ComputeModuleType` | type |  |  |
| `GreetingInput` | interface |  |  |
| `GreetingResult` | interface |  |  |
| `User` | interface |  |  |
| `MachineExecutions` | interface |  |  |
| `Communications` | interface |  |  |
| `Threads` | interface |  |  |
| `RfpRequests` | interface |  | /** Holds rfp requests */ |
| `Tickets` | interface |  |  |
| `Contacts` | interface |  | /** This is the object type for all names of partners, palantir and customers */ |
| `MemoryRecall` | interface |  | /** Used for retrieving relevant context for LLMs */ |
| `TrainingData` | interface |  | /** Holds the training data for all X-Reasons */ |
| `ListCalendarArgs` | type |  |  |
| `EventSummary` | type |  |  |
| `CalendarSummary` | type |  |  |
| `Summaries` | type |  |  |
| `OfficeService` | type |  |  |
| `OfficeServiceV2` | type |  |  |
| `GSuiteCalendarService` | type |  |  |
| `MessageService` | type |  |  |
| `LoggingService` | type |  |  |
| `RfpResponsesResult` | type |  |  |
| `RfpRequestResponse` | type |  | /** Holds rfp responses */ |
| `RfpResponseReceipt` | type |  |  |
| `TicketsDao` | type |  |  |
| `WorldDao` | type |  |  |
| `UserDao` | type |  |  |
| `MachineDao` | type |  |  |
| `TelemetryDao` | type |  |  |
| `CommsDao` | type |  |  |
| `ThreadsDao` | type |  |  |
| `RfpRequestsDao` | type |  |  |
| `RangrRequestsDao` | type |  |  |
| `MemoryRecallDao` | type |  |  |
| `TrainingDataDao` | type |  |  |
| `ContactsDao` | type |  |  |
| `GetNextStateResult` | type |  |  |
| `SupportedFoundryClients` | enum |  |  |
| `RequestContext` | type |  |  |
| `ActionType` | type |  |  |
| `Context` | type |  |  |
| `MachineEvent` | type |  |  |
| `Transition` | type |  |  |
| `Task` | type |  |  |
| `StateMachineConfig` | interface |  |  |
| `Solver` | type |  |  |
| `Programer` | type |  |  |
| `EvaluationInput` | type |  |  |
| `EvaluatorResult` | type |  |  |
| `Evaluator` | type |  |  |
| `AiTransition` | type |  |  |
| `Prompt` | type |  |  |
| `ReasoningEngine` | type |  |  |
| `ICallable` | interface |  |  |
| `InterpreterInput` | type |  |  |
| `Interpreter` | type |  |  |
| `StateConfig` | type |  |  |
| `Result` | interface |  |  |
| `Workflow` | interface |  |  |
| `Solutions` | type |  |  |
| `SystemStatus` | type |  |  |
| `FilePath` | type |  |  |
| `ExportedSymbol` | type |  |  |
| `WorkedExample` | type |  |  |
| `PracticeProblem` | type |  |  |
| `EnvVar` | type |  |  |
| `NxDeps` | type |  |  |
| `EntryPointSummary` | type |  |  |
| `CodeFileSummary` | type |  |  |
| `Exposition` | type |  |  |
| `ReadmeContext` | type |  |  |
| `ReadmeInputForTemplate` | type |  |  |
| `AssembleOptions` | type |  |  |
| `Ctx` | type |  |  |
| `findOptimalMeetingTime` | function | `function findOptimalMeetingTime(calendar: calendar_v3.Calendar, context: OptimalTimeContext) => Promise<FindOptimalMeetingTimeOutput>` |  |
| `scheduleMeeting` | function | `function scheduleMeeting(calendar: calendar_v3.Calendar, context: CalendarContext) => Promise<ScheduleMeetingOutput>` |  |
| `sendEmail` | function | `function sendEmail(gmail: gmail_v1.Gmail, context: EmailContext) => Promise<SendEmailOutput>` |  |
| `readEmailHistory` | function | `function readEmailHistory(gmail: gmail_v1.Gmail, context: ReadEmailHistoryContext) => Promise<EmailMessage[]>` |  |
| `watchEmails` | function | `function watchEmails(context: WatchEmailsInput, makeClient: (userId: string) => Promise<{ emailClient: gmail_v1.Gmail; calendarClient: calendar_v3.Calendar; }>) => Promise<WatchEmailsOutput>` |  |
| `TYPES` | variable |  |  |
| `ResearchAssistant` | type |  |  |
| `Schemas` | variable |  |  |
| `ScheduleMeetingInput` | type |  |  |
| `ScheduleMeetingOutput` | type |  |  |
| `SendEmailOutput` | type |  |  |
| `SendEmailInput` | type |  |  |
| `ReadEmailOutput` | type |  |  |
| `ReadEmailInput` | type |  |  |
| `WatchEmailsOutput` | type |  |  |
| `WatchEmailsInput` | type |  |  |
| `FindOptimalMeetingTimeInput` | type |  |  |
| `FindOptimalMeetingTimeOutput` | type |  |  |
| `UserProfile` | type |  |  |
| `MessageResponse` | type |  |  |
| `Message` | type |  |  |
| `EmailConfig` | interface |  |  |
| `CalendarConfig` | interface |  |  |
| `Config` | interface |  |  |
| `WorkingHours` | interface |  |  |
| `TimeSlot` | interface |  |  |
| `EmailContext` | interface |  |  |
| `ReadEmailHistoryContext` | interface |  |  |
| `CalendarContext` | interface |  |  |
| `OptimalTimeContext` | interface |  |  |
| `TimeRange` | interface |  |  |
| `BusyPeriod` | interface |  |  |
| `EmailMessage` | type |  |  |
| `AvailableTime` | type |  |  |
| `ProposedTimes` | type |  |  |
| `MeetingRequest` | type |  |  |
| `DerivedWindow` | type |  |  |
| `Meeting` | type |  |  |
| `GeminiParameters` | interface |  |  |
| `GeminiService` | interface |  |  |
| `Gpt40Parameters` | interface |  |  |
| `Gpt4oService` | interface |  |  |
| `EmbeddingsService` | interface |  |  |
| `Token` | interface |  |  |
| `BaseOauthClient` | interface |  |  |
| `FoundryClient` | interface |  |  |
| `RangrClient` | interface |  |  |
| `GasScenarioResult` | interface |  |  |
| `EIAResponse` | interface |  |  |
| `VegaGasTrackerData` | interface |  |  |
| `EnergyService` | type |  |  |
| `WeatherService` | interface |  |  |
| `GeminiSearchStockMarket` | interface |  |  |
| `APIError` | interface |  |  |
| `ModuleConfig` | interface |  |  |
| `TestModule` | interface |  |  |
| `ComputeModuleType` | type |  |  |
| `GreetingInput` | interface |  |  |
| `GreetingResult` | interface |  |  |
| `User` | interface |  |  |
| `MachineExecutions` | interface |  |  |
| `Communications` | interface |  |  |
| `Threads` | interface |  |  |
| `RfpRequests` | interface |  | /** Holds rfp requests */ |
| `Tickets` | interface |  |  |
| `Contacts` | interface |  | /** This is the object type for all names of partners, palantir and customers */ |
| `MemoryRecall` | interface |  | /** Used for retrieving relevant context for LLMs */ |
| `TrainingData` | interface |  | /** Holds the training data for all X-Reasons */ |
| `ListCalendarArgs` | type |  |  |
| `EventSummary` | type |  |  |
| `CalendarSummary` | type |  |  |
| `Summaries` | type |  |  |
| `OfficeService` | type |  |  |
| `OfficeServiceV2` | type |  |  |
| `GSuiteCalendarService` | type |  |  |
| `MessageService` | type |  |  |
| `LoggingService` | type |  |  |
| `RfpResponsesResult` | type |  |  |
| `RfpRequestResponse` | type |  | /** Holds rfp responses */ |
| `RfpResponseReceipt` | type |  |  |
| `TicketsDao` | type |  |  |
| `WorldDao` | type |  |  |
| `UserDao` | type |  |  |
| `MachineDao` | type |  |  |
| `TelemetryDao` | type |  |  |
| `CommsDao` | type |  |  |
| `ThreadsDao` | type |  |  |
| `RfpRequestsDao` | type |  |  |
| `RangrRequestsDao` | type |  |  |
| `MemoryRecallDao` | type |  |  |
| `TrainingDataDao` | type |  |  |
| `ContactsDao` | type |  |  |
| `GetNextStateResult` | type |  |  |
| `SupportedFoundryClients` | enum |  |  |
| `RequestContext` | type |  |  |
| `ActionType` | type |  |  |
| `Context` | type |  |  |
| `MachineEvent` | type |  |  |
| `Transition` | type |  |  |
| `Task` | type |  |  |
| `StateMachineConfig` | interface |  |  |
| `Solver` | type |  |  |
| `Programer` | type |  |  |
| `EvaluationInput` | type |  |  |
| `EvaluatorResult` | type |  |  |
| `Evaluator` | type |  |  |
| `AiTransition` | type |  |  |
| `Prompt` | type |  |  |
| `ReasoningEngine` | type |  |  |
| `ICallable` | interface |  |  |
| `InterpreterInput` | type |  |  |
| `Interpreter` | type |  |  |
| `StateConfig` | type |  |  |
| `Result` | interface |  |  |
| `Workflow` | interface |  |  |
| `Solutions` | type |  |  |
| `SystemStatus` | type |  |  |
| `FilePath` | type |  |  |
| `ExportedSymbol` | type |  |  |
| `WorkedExample` | type |  |  |
| `PracticeProblem` | type |  |  |
| `EnvVar` | type |  |  |
| `NxDeps` | type |  |  |
| `EntryPointSummary` | type |  |  |
| `CodeFileSummary` | type |  |  |
| `Exposition` | type |  |  |
| `ReadmeContext` | type |  |  |
| `ReadmeInputForTemplate` | type |  |  |
| `AssembleOptions` | type |  |  |
| `Ctx` | type |  |  |

## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._

## Configuration & Environment <!-- anchor: configuration_env -->
| name | required | default | files | notes |
|---|---|---|---|---|
| `E2E` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts` |  |
| `OFFICE_SERVICE_ACCOUNT` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts` |  |
| `TZ` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts`<br/>`/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts`<br/>`/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts` |  |

## Dependency Topology (Nx) <!-- anchor: deps_topology -->
_No Nx graph available._

## Import Graph (File-level) <!-- anchor: import_graph -->
_Text-only representation intentionally omitted in this version; agents can walk files from API surface._

## Practice Tasks (for Agents/RL) <!-- anchor: practice_tasks -->
- **Task 1: deriveWindowFromTimeframe (UTC core, TZ-aware asserts)** — Recreate the behavior demonstrated by the example "deriveWindowFromTimeframe (UTC core, TZ-aware asserts)".
- **Task 2: user defined exact date/time: uses the exact minute and step=1 (inside hours)** — Recreate the behavior demonstrated by the example "user defined exact date/time: uses the exact minute and step=1 (inside hours)".
- **Task 3: user defined exact date/time: clamps start to start_hour if given before-hours time** — Recreate the behavior demonstrated by the example "user defined exact date/time: clamps start to start_hour if given before-hours time".
- **Task 4: as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week** — Recreate the behavior demonstrated by the example "as soon as possible: inside working hours → start = now (clamped), end = Friday 17:00 of same week".
- **Task 5: as soon as possible: after hours → next business day 08:00, end = Friday 17:00** — Recreate the behavior demonstrated by the example "as soon as possible: after hours → next business day 08:00, end = Friday 17:00".
- **Task 6: as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)** — Recreate the behavior demonstrated by the example "as soon as possible: on Saturday → start Monday 08:00, end Friday 17:00 (next week)".
- **Task 7: this week: mid-week → start = clamped now, end = Friday 17:00 this week** — Recreate the behavior demonstrated by the example "this week: mid-week → start = clamped now, end = Friday 17:00 this week".
- **Task 8: this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00** — Recreate the behavior demonstrated by the example "this week: past Friday close → rolls to next week Mon 08:00 → Fri 17:00".
- **Task 9: next week: Mon 08:00 next week → Fri 17:00 next week** — Recreate the behavior demonstrated by the example "next week: Mon 08:00 next week → Fri 17:00 next week".
- **Task 10: findOptimalMeetingTimeV2 E2E tests** — Recreate the behavior demonstrated by the example "findOptimalMeetingTimeV2 E2E tests".
- **Task 11: should get an exact time within PT working hours** — Recreate the behavior demonstrated by the example "should get an exact time within PT working hours".
- **Task 12: findOptimalMeetingTimeV2 (UTC bounds + PT semantics)** — Recreate the behavior demonstrated by the example "findOptimalMeetingTimeV2 (UTC bounds + PT semantics)".
- **Task 13: single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours** — Recreate the behavior demonstrated by the example "single-day, 3 attendees: outputs slots that do not intersect busy times and lie within PT working hours".
- **Task 14: multi-day window: handles union of busy blocks across attendees and days** — Recreate the behavior demonstrated by the example "multi-day window: handles union of busy blocks across attendees and days".
- **Task 15: skipFriday=true → zero slots for a Friday-only window** — Recreate the behavior demonstrated by the example "skipFriday=true → zero slots for a Friday-only window".
- **Task 16: DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets** — Recreate the behavior demonstrated by the example "DST boundary spanning Nov 1–3 2025: returns slots with proper -07:00 or -08:00 offsets".
- **Task 17: works with hardcoded UTC instants (no wallClockToUTC usage)** — Recreate the behavior demonstrated by the example "works with hardcoded UTC instants (no wallClockToUTC usage)".
- **Task 18: rounds up first slot to step boundary and supports step < duration** — Recreate the behavior demonstrated by the example "rounds up first slot to step boundary and supports step < duration".
- **Task 19: returns 0 when all free gaps are shorter than duration** — Recreate the behavior demonstrated by the example "returns 0 when all free gaps are shorter than duration".
- **Task 20: skips weekends even across multi-day spans** — Recreate the behavior demonstrated by the example "skips weekends even across multi-day spans".
- **Task 21: skipFriday=true removes Friday slots in mixed Thu→Fri range** — Recreate the behavior demonstrated by the example "skipFriday=true removes Friday slots in mixed Thu→Fri range".
- **Task 22: honors windowStart inside the working day (rounds to step)** — Recreate the behavior demonstrated by the example "honors windowStart inside the working day (rounds to step)".
- **Task 23: returns 0 on a day fully covered by busy** — Recreate the behavior demonstrated by the example "returns 0 on a day fully covered by busy".
- **Task 24: merges overlapping and unsorted busy blocks correctly** — Recreate the behavior demonstrated by the example "merges overlapping and unsorted busy blocks correctly".
- **Task 25: scores earlier slots higher (non-increasing sequence)** — Recreate the behavior demonstrated by the example "scores earlier slots higher (non-increasing sequence)".
- **Task 26: DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after** — Recreate the behavior demonstrated by the example "DST spring-forward (Mar 7–10, 2025): shows -08:00 before and -07:00 after".

## Synthetic Variations <!-- anchor: synthetic_variations -->
_No generators proposed._

## Guardrails & Quality <!-- anchor: guardrails_quality -->
_Include test coverage & invariants if available (future enhancement)._

## Open Questions / Needs from Engineer <!-- anchor: questions_for_engineer -->
_None_

## Appendix <!-- anchor: appendix -->
- Stable section anchors provided for agent navigation.
- IDs: Prefer path-based IDs for files and export names for API items.