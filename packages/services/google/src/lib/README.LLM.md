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
| `findOptimalMeetingTime` | function | `function findOptimalMeetingTime(calendar: calendar_v3.Calendar, context: OptimalTimeContext) => Promise<FindOptimalMeetingTimeOutput>` |  |
| `scheduleMeeting` | function | `function scheduleMeeting(calendar: calendar_v3.Calendar, context: CalendarContext) => Promise<ScheduleMeetingOutput>` |  |
| `sendEmail` | function | `function sendEmail(gmail: gmail_v1.Gmail, context: EmailContext) => Promise<SendEmailOutput>` |  |
| `readEmailHistory` | function | `function readEmailHistory(gmail: gmail_v1.Gmail, context: ReadEmailHistoryContext) => Promise<EmailMessage[]>` |  |
| `watchEmails` | function | `function watchEmails(context: WatchEmailsInput, makeClient: (userId: string) => Promise<{ emailClient: gmail_v1.Gmail; calendarClient: calendar_v3.Calendar; }>) => Promise<WatchEmailsOutput>` |  |

## Key Concepts & Data Flow <!-- anchor: concepts_flow -->
_See Overview; expand this section as needed._

## Configuration & Environment <!-- anchor: configuration_env -->
| name | required | default | files | notes |
|---|---|---|---|---|
| `E2E` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts` |  |
| `OFFICE_SERVICE_ACCOUNT` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts` |  |
| `TZ` | no |  | `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/deriveWindowFromTimeframe.test.ts`<br/>`/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.e2e.test.ts`<br/>`/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/src/lib/delegates/findOptimalMeetingTimeV2.test.ts` |  |

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

### Environment Files
- `/Users/doriansmiley/workspace/foundry-developer-foundations/packages/services/google/.env`

| variable | description |
|---|---|
| `FOUNDRY_STACK_URL` |  |
| `FOUNDRY_TOKEN` |  |
| `FOUNDRY_TEST_USER` |  |
| `OSDK_CLIENT_SECRET` |  |
| `OSDK_CLIENT_ID` |  |
| `OPEN_WEATHER_API_KEY` |  |
| `LOG_PREFIX` |  |
| `ONTOLOGY_RID` |  |
| `ONTOLOGY_ID` |  |
| `GOOGLE_SEARCH_API_KEY` |  |
| `GOOGLE_SEARCH_ENGINE_ID` |  |
| `GOOGLE_SEARCH_ENGINE_MARKETS` |  |
| `GEMINI_API_KEY` |  |
| `BROWSERFY_KEY` |  |
| `BROWSERFY_BROWSER_URL` |  |
| `RANGR_OSDK_CLIENT_ID` |  |
| `RANGR_OSDK_CLIENT_SECRET` |  |
| `RANGR_FOUNDRY_STACK_URL` |  |
| `RANGR_ONTOLOGY_RID` |  |
| `OFFICE_SERVICE_ACCOUNT` |  |
| `OPEN_AI_KEY` |  |
| `SLACK_CLIENT_ID` |  |
| `SLACK_CLIENT_SECRET` |  |
| `SLACK_SIGNING_SECRET` |  |
| `SLACK_BOT_TOKEN` |  |
| `SLACK_APP_TOKEN` |  |
| `SLACK_BASE_URL` |  |
| `GSUITE_SERVICE_ACCOUNT` |  |
| `EIA_API_KEY` |  |
| `EIA_BASE_URL` |  |
| `CA_SERIES_ID` |  |
| `FIRECRAWL_API_KEY` |  |

## Dependency Topology (Nx) <!-- anchor: deps_topology -->
_No Nx graph available._

## Import Graph (File-level) <!-- anchor: import_graph -->
_Text-only representation intentionally omitted in this version; agents can walk files from API surface._

## Practice Tasks (for Agents/RL) <!-- anchor: practice_tasks -->
**Q:** Create a GSuite client for user test@example.com
**A:**
makeGSuiteClient(user: 'test@example.com');


**Q:** Find the optimal meeting time, given calendar and context with attendees test1@example.com and test2@example.com, meeting duration 30 minutes.
**A:**
findOptimalMeetingTime(calendar, { attendees: ['test1@example.com', 'test2@example.com'], durationMinutes: 30 });


**Q:** Schedule a meeting, given calendar, with attendee test@example.com and a start and end time.
**A:**
scheduleMeeting(calendar, { attendees: ['test@example.com'], startTime: new Date(), endTime: new Date() });


**Q:** Send an email to test@example.com with subject 'Test' and message 'Hello'.
**A:**
sendEmail({ recipients: ['test@example.com'], subject: 'Test', message: 'Hello' });


**Q:** Read the email history of test@example.com.
**A:**
readEmailHistory({ user: 'test@example.com' });


**Q:** Watch emails for user test@example.com.
**A:**
watchEmails({ user: 'test@example.com' }, makeGSuiteClient);


**Q:** Find the optimal time for a meeting for 60 minutes with user test@example.com.
**A:**
findOptimalMeetingTime(calendar, { attendees: ['test@example.com'], durationMinutes: 60 });


**Q:** Schedule a meeting with Dorian Smiley and Connor Deeks for tomorrow at 2pm for 30 minutes.
**A:**
scheduleMeeting(calendar, { attendees: ['dorian@example.com', 'connor@example.com'], startTime: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)), endTime: new Date(new Date().getTime() + (24 * 60 * 60 * 1000) + (30 * 60 * 1000)) });


**Q:** Email Connor Deeks at connor@example.com that the meeting is confirmed.
**A:**
sendEmail({ recipients: ['connor@example.com'], subject: 'Meeting Confirmed', message: 'Your meeting is confirmed.' });


**Q:** Get the email history for user dorian@example.com related to project X.
**A:**
readEmailHistory({ user: 'dorian@example.com', query: 'project X' });


**Q:** Start watching emails addressed to test@example.com.
**A:**
watchEmails({ user: 'test@example.com' }, makeGSuiteClient);


**Q:** Make a GSuite client for dorian@example.com.
**A:**
makeGSuiteClient('dorian@example.com');

## Synthetic Variations <!-- anchor: synthetic_variations -->
_No generators proposed._

## Guardrails & Quality <!-- anchor: guardrails_quality -->
_Include test coverage & invariants if available (future enhancement)._

## Open Questions / Needs from Engineer <!-- anchor: questions_for_engineer -->
_None_

## Appendix <!-- anchor: appendix -->
- Stable section anchors provided for agent navigation.
- IDs: Prefer path-based IDs for files and export names for API items.