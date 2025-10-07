import {
  Context,
  MachineEvent,
  ThreadsDao,
  UserIntent,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import * as path from 'path';
import * as fs from 'fs';
import { openAiSpecGenerator } from './delegates';

export async function confirmUserIntent(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<UserIntent> {
  let messages;

  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
  // we use the thread because it should not aonly contain the design specification but user comments as well
  try {
    messages = await threadsDao.read(context.machineExecutionId!);
  } catch {
    /**empty */
  }

  // get the contextual update if any that contains the laatest user response
  const confirmUserIntentId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('confirmUserIntent')) || '';

  const { userResponse, file } = (context[confirmUserIntentId] as UserIntent) || {};

  const parsedMessages = JSON.parse(messages?.messages || '[]') as {
    user?: string;
    system: string;
  }[];

  let updatedContents;
  if (file && !fs.existsSync(file)) throw new Error(`File does not exist: ${file}`);
  if (file) {
    // read the file that may contain updates from the user
    updatedContents = await fs.promises.readFile(file, 'utf8');
  }

  // load the README associated with the codepath/agent/machine execution
  const readmePath = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `readme-${context.machineExecutionId}.md`);
  if (readmePath && !fs.existsSync(readmePath)) throw new Error(`README file does not exist: ${readmePath}`);
  const readme = await fs.promises.readFile(readmePath, 'utf8');

  const system = `
You are a **software design specialist** collaborating with a human software engineer.
Your role is to **assist in drafting actionable design specifications** for software features and changes.

You may ask clarifying questions **only if you lack essential information**, but never repeat the same question twice.
You must always follow the user's instructions exactly.

Your ultimate output is a **draft of the design specification** for the user's task.

---

## Hard Rules for Generating a Design Spec

A valid design spec MUST include all of the following sections:

**Original User Prompt**

   * Capture the request exactly as given.

 **Design spec name**

   * Concise title (≤7 words) with a version if supplied (e.g., v0.1). Default version to v0.

**Instructions**

   * Summarize the user's request clearly and directly.

**Overview**

   * Describe the feature or proposed change in plain language.
   * State scope, purpose, success criteria, dependencies, and assumptions.

**Constraints**

   * **Language**: Required programming language(s) and version(s).
   * **Libraries**: Required external libraries with rationale.

**Auth scopes required**

   * List all permissions/scopes needed, with justification.

**Security and Privacy**

   * Required access controls, data protection, privacy measures, log sanitization, and least-privilege enforcement.

**External API Documentation References**

   * Provide relevant links.
   * Summarize the methods, request/response types, and key behaviors used.

 **Files Added/Modified**:
  For example:
    Files added/modified
    - Modified: packages/services/google/src/lib/delegates/sendEmail.ts
    - Added: packages/services/google/src/lib/delegates/driveHelpers.ts
    - Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
    - Added: packages/services/google/src/lib/delegates/sendEmail.test.ts
  This ensures our code editor can distinguish how to handle the changes with ts-morph

**Inputs and Outputs**

    * **Proposed Input Type Changes/Additions**: schemas, fields, validation rules.
    * **Proposed Output Type Changes/Additions**: schemas, error envelope structure.

**Functional Behavior**

    * Step-by-step description of algorithm and feature behavior.
    * Include idempotency, concurrency, and performance if applicable.
    * Denote what is in scope vs. out of scope.

**Error Handling**

    * Describe categories, HTTP status mappings (if relevant), retry/backoff strategies, and sanitization of logs.

**Acceptance Criteria**

    * Provide plain-text test specification in **Gherkin format** only.
    * Cover happy paths, edge cases, and error scenarios.

**Usage (via client)**

    * Show how a client would use the feature.
    * Use pseudo code only (never real code).
    * Include example request/response shapes.

---

## Additional Requirements

* Specs can only contain **pseudo code** (never runnable code).
* Every requirement must be **observable and testable**.
* Always distinguish between **new files** and **modified files**.
* Never omit sections — all must be present, even if marked TBD.

---
`;

  const user = userResponse
    ? `
    # Instructions
    Read EVERYTHING below before writing. Then produce a single, final design specification that follows the template exactly.

    RULES FOR SYNTHESIS
    - Merge and reconcile: Incorporate all feedback from both the "User Response" and "The Design Specification". Resolve conflicts explicitly; don't drop constraints.
    - Reuse prior facts: If Language/Libraries/Auth scopes/etc. were provided earlier, reuse them verbatim unless the user overrode them. Missing items must be inferred only if strongly implied; otherwise call them out as TBD.
    - ALWAYS REUSE PATHS IN THE DESIGN SPECIFICATION! If a user asks for a new file to be created in their response infer based on existing paths in the spec where to place that fil. This ensure paths are resolvable!

    # User Response
    ${userResponse}

    # The spec file
    Carefully review for any change requests, answers to questions, etc., from the user.
    ${updatedContents}

    Produce your answer using the **Design Specification Template** below. 
    All sections are REQUIRED. Do not add or remove sections or bullets. 
    Reuse supplied sections unmodified (e.g., Overview, Constraints, Files Added/Modified) when no changes are required.

    # Design Specification Template
    - **Design spec**: The name of the design spec
      - Provide a concise, unique name (≤ 7 words) and include a version (e.g., v0.1).
    - **Instructions**: The request(s) from the end user
      - Quote or summarize the user's ask in one short paragraph. Include goals and explicit non-goals if stated.
    - **Overview**: The expanded prompt filled in with key general details that more clearly define the scope of work
      - Summarize purpose, primary user(s), and success criteria.
      - List major assumptions if any were required to proceed.
      - Note dependencies (systems/services) at a high level.
    - **Constraints**
      - **Language**: The required programming language
        - State exact version range (e.g., Node.js 20.x, Python 3.11).
      - **Libraries**: The required external libraries derived from the information in the supplied README
        - Enumerate by name@version with brief rationale and any pinning/compat constraints.
    - **Files Added/Modified**:
      For example:
        Files added/modified
        - Modified: packages/services/google/src/lib/delegates/sendEmail.ts
        - Added: packages/services/google/src/lib/delegates/driveHelpers.ts
        - Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
        - Added: packages/services/google/src/lib/delegates/sendEmail.test.ts
    - **Auth scopes required**: The required authorization scopes if relevant.
      - List provider(s), scopes/permissions, and why each is needed. Include least-privilege notes.
    - **Security and Privacy**: Security and privacy concerns.
      - Specify data handled (PII/PHI/credentials), storage/retention, encryption in transit/at rest, secrets management, and threat/abuse considerations.
    - **External API Documentation References**: Documentation links and method summaries for consumed public interfaces
      - For each API: base URL, key endpoints/methods, request/response schemas (brief), and rate limits/timeouts/retry guidance.
    - **Inputs and Outputs**
      - **Proposed Input Type Changes/Additions**:
        - Define input schema(s) with fields, types, required/optional, defaults, and validation rules.
      - **Proposed Output types Changes/Additions**:
        - Define output schema(s) with fields, types, error envelope structure, and pagination/streaming if applicable.
    - **Functional Behavior**: The functional requirements including implied behaviors
      - Describe end-to-end flow as numbered steps.
      - Include edge cases, idempotency, ordering, concurrency, and performance SLAs if stated or implied.
      - Call out out-of-scope behaviors explicitly (for future work).
    - **Error Handling**
      - Define error classes/categories, HTTP status mappings (if applicable), retry/backoff policy, and user-visible messages vs. internal logs.
    - **Acceptance Criteria**: A proposed test specification in plain text. No code. Use the Gherkin spec file syntax. for example
      \`\`\`gherkin
  Feature: Guess the word
      # The first example has two steps
  Scenario: Maker starts a game
        When the Maker starts a game
        Then the Maker waits for a Breaker to join

      # The second example has three steps
  Scenario: Breaker joins a game
        Given the Maker has started a game with the word "silky"
        When the Breaker joins the Maker's game
        Then the Breaker must guess a word with 5 characters
    \`\`\`
      - Provide happy path, key edge cases, and failure cases that map to “Functional Behavior” and “Error Handling.”
    - **Usage (via client)**: a description of the proposed API and of how clients will call the proposed API. Can include pseudo code.
      - Show request/response shapes (names only, not full code), example call(s), and minimal integration steps. Indicate auth usage and expected status codes.
    `
    : `
Below is the engineer's initial request and relevant context (stack, APIs, tests, file paths, prior threads). 
Your job: ask only clarifications questions (≤5, one-liners) to build intended design spec with confidence and then produce a crisp spec. 

Initial user request:
${task}

Generate the system design specification.
If you do not have enough information to create a draft of the design spec, ask clarifying questions to the user.

# Sample Training Data

Q: "create sending email function to send an custom templated email"
A:
- **Design spec**: Send Email (Templated) v0.1
- **Instructions**: Create a function to send a custom templated email.
- **Overview**: Implement a \`sendEmail\` delegate using \`googleapis@149.0.0\` (Gmail API) to send an HTML-templated email with an auto-derived plain-text alternative. Expose only via \`gsuiteClient.ts\` and scaffold tests per package conventions.
- **Constraints**
  - **Language**: TypeScript (Node.js 20.x)
  - **Libraries**: googleapis@149.0.0
- **Files Added/Modified**:
  For example:
    Files added/modified
    - Modified: packages/services/google/src/lib/delegates/sendEmail.ts
    - Added: packages/services/google/src/lib/delegates/driveHelpers.ts
    - Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
    - Added: packages/services/google/src/lib/delegates/sendEmail.test.ts
  This ensures our code editor can distinguish how to handle the changes with ts-morph. 
  File paths can be inferred from the Initial user request. It includes the complete listing of existing files and their exposed members (functions, types, etc).
- **Auth scopes required**:
  - https://mail.google.com/
  - https://www.googleapis.com/auth/gmail.modify
  - https://www.googleapis.com/auth/gmail.compose
  - https://www.googleapis.com/auth/gmail.send
- **Security and Privacy**: Do not log credentials or full message bodies. Mask recipient emails in logs. Store no message content at rest beyond transient processing. Use least-privilege OAuth scopes.
- **External API Documentation References**:
  - Gmail API: \`users.messages.send\` — https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send
- **Inputs and Outputs**
  - **Proposed Input Type Changes/Additions**:
    - \`EmailContext\`:
      - \`from: string\` (required, RFC5322)
      - \`recipients: string | string[]\` (required; supports comma-separated or array)
      - \`subject: string\` (required, non-empty)
      - \`messageHtml: string\` (required; HTML template-rendered content)
      - \`messageText?: string\` (optional; if omitted, derive from HTML)
      - \`headers?: Record<string, string>\` (optional; e.g., \`Reply-To\`)
      - \`labelIds?: string[]\` (optional; Gmail label IDs)
  - **Proposed Output types Changes/Additions**:
    - \`SendEmailOutput\`:
      - \`id: string\`
      - \`threadId: string\`
      - \`labelIds?: string[]\`
- **Functional Behavior**:
  1) Validate \`from\`, \`recipients\`, \`subject\`, and \`messageHtml\`.
  2) Build \`multipart/alternative\` MIME with \`text/plain\` (derived if not supplied) and \`text/html\`.
  3) Base64url-encode MIME; call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`.
  4) If \`labelIds\` provided, ensure they are included in the request.
  5) Return \`{ id, threadId, labelIds }\`.
  6) Expose via \`gsuiteClient.ts\` only; keep internal delegate under \`src/lib/delegates/\`.
- **Error Handling**:
  - On validation errors, throw typed errors with field details.
  - On Gmail API failure, include HTTP status, error code, and \`response.data\` when available; do not include message content.
  - Retry once on \`429\`/\`5xx\` with exponential backoff; otherwise propagate error.
- **Acceptance Criteria**:
  \`\`\`gherkin
  Feature: Send templated email
    Scenario: Successfully send an HTML email with derived text part
      Given a valid EmailContext with from, recipients, subject, and messageHtml
      When the client calls sendEmail
      Then the Gmail API users.messages.send is invoked with a base64url MIME payload
      And the payload contains both text/plain and text/html parts
      And the response includes id and threadId

    Scenario: Reject invalid sender address
      Given an EmailContext with an invalid from address
      When the client calls sendEmail
      Then a validation error is thrown identifying the from field

    Scenario: Include label IDs
      Given an EmailContext with labelIds
      When the client calls sendEmail
      Then the created message has those labelIds applied

    Scenario: Handle Gmail rate limiting
      Given the Gmail API responds with HTTP 429
      When the client calls sendEmail
      Then the client retries once with backoff
      And if the retry fails, an error is surfaced without logging message content
\`\`\`
- **Usage (via client)**:
  * Pseudo:
    * \`const client = await makeGSuiteClient('user@company.com');\`
    * \`await client.sendEmail({ from, recipients, subject, messageHtml, messageText?, headers?, labelIds? });\`
    * Returns \`{ id, threadId, labelIds? }\`.

---

Q: "modify scheduleMeeting function to support optional attendees"
A:
* **Design spec**: Schedule Meeting (Optional Attendees) v0.1
* **Instructions**: Modify \`scheduleMeeting\` to support optional attendees.
* **Overview**: Extend the \`scheduleMeeting\` delegate to accept optional attendees and create Google Calendar events differentiating required vs. optional participants. Expose only via \`gsuiteClient.ts\`.
* **Constraints**
  * **Language**: TypeScript (Node.js 20.x)
  * **Libraries**: googleapis@149.0.0
**Files Added/Modified**:
  For example:
    Files added/modified
    - Modified: packages/services/google/src/lib/delegates/sendEmail.ts
    - Added: packages/services/google/src/lib/delegates/driveHelpers.ts
    - Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
    - Added: packages/services/google/src/lib/delegates/sendEmail.test.ts
  This ensures our code editor can distinguish how to handle the changes with ts-morph
* **Auth scopes required**:
  * [https://www.googleapis.com/auth/calendar](https://www.googleapis.com/auth/calendar)
  * [https://www.googleapis.com/auth/calendar.events](https://www.googleapis.com/auth/calendar.events)
* **Security and Privacy**: Do not log event descriptions or attendee emails. Use least-privilege scopes. Redact PII in errors. No persistent storage of event payloads beyond transient processing.
* **External API Documentation References**:
  * Calendar API: \`events.insert\` — [https://developers.google.com/calendar/api/v3/reference/events/insert](https://developers.google.com/calendar/api/v3/reference/events/insert)
* **Inputs and Outputs**
  * **Proposed Input Type Changes/Additions**:
    * \`CalendarContext\`:
      * \`summary: string\` (required)
      * \`description?: string\`
      * \`start: string\` (ISO 8601 with timezone)
      * \`end: string\` (ISO 8601 with timezone)
      * \`attendees: { email: string; optional?: boolean }[]\` (required; \`optional\` defaults to \`false\`)
      * \`sendUpdates?: 'all' | 'externalOnly' | 'none'\` (default \`'all'\`)
      * \`conference?: { createMeet?: boolean }\` (default \`{ createMeet: true }\`)
      * \`timezone?: string\` (IANA, defaults to requestor’s)
  * **Proposed Output types Changes/Additions**:
    * \`ScheduleMeetingOutput\`:
      * \`id: string\`
      * \`htmlLink: string\`
      * \`status: string\`
      * \`hangoutLink?: string\`
* **Functional Behavior**:
  1. Validate \`summary\`, \`start\`, \`end\`, and \`attendees\`.
  2. Map attendees to Calendar API format, setting \`optional\` as provided (default \`false\`).
  3. If \`conference.createMeet\` is true, request Meet via \`conferenceData.createRequest\`.
  4. Call \`calendar.events.insert\` with \`sendUpdates\` (default \`'all'\`) and \`conferenceDataVersion: 1\`.
  5. Ensure a Meet link is present (\`hangoutLink\` or \`conferenceData.entryPoints\` when requested).
  6. Return \`{ id, htmlLink, status, hangoutLink? }\`.
  7. Expose via \`gsuiteClient.ts\`; keep delegate under \`src/lib/delegates/\`.
* **Error Handling**:
  * Throw validation errors for malformed times or empty attendee lists.
  * If Meet was requested but not created, throw a specific error.
  * Surface underlying API errors with HTTP status and code; redact attendee emails and descriptions.
  * Retry once on \`429\`/\`5xx\` with exponential backoff; otherwise propagate.
* **Acceptance Criteria**:
  \`\`\`gherkin
  Feature: Schedule meeting with optional attendees
    Scenario: Create event with required and optional attendees and Meet link
      Given a valid CalendarContext with mixed required and optional attendees
      When the client calls scheduleMeeting
      Then the event is created in Google Calendar
      And optional attendees are marked optional
      And a Google Meet link is present
      And invitations are sent according to sendUpdates

    Scenario: Reject invalid time range
      Given a CalendarContext where end is before start
      When the client calls scheduleMeeting
      Then a validation error is thrown describing the time constraint

    Scenario: Missing Meet when requested
      Given a CalendarContext with conference.createMeet true
      And the Calendar API returns an event without a Meet link
      When the client calls scheduleMeeting
      Then a specific error is thrown indicating conference creation failed
  \`\`\`
* **Usage (via client)**:
  * Pseudo:
    * \`const client = await makeGSuiteClient('user@company.com');\`
    * \`await client.scheduleMeeting({ summary, description?, start, end, attendees, sendUpdates?, conference?, timezone? });\`
    * Returns \`{ id, htmlLink, status, hangoutLink? }\`.
`;

  // TODO inject this
  const msg = await openAiSpecGenerator(user, system, readme);

  if (userResponse) {
    // reset the user response so they can respond again!
    context[confirmUserIntentId].userResponse = undefined;
  }

  parsedMessages.push({
    user: user,
    system: msg,
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  const abs = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `spec-${context.machineExecutionId}.md`);
  await fs.promises.writeFile(abs, msg, 'utf8');

  return {
    confirmationPrompt: msg,
    file: abs,
  };
}
