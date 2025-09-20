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

export async function confirmUserIntent(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<UserIntent> {
  let messages;

  const threadsDao = container.get<ThreadsDao>(TYPES.SQLLiteThreadsDao);
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
  const userResponse = (context[confirmUserIntentId] as UserIntent)
    ?.userResponse;
  const parsedMessages = JSON.parse(messages?.messages || '[]') as {
    user?: string;
    system: string;
  }[];

  const system = `
You are a software design specialist engaged in a conversation with a human software engineer.

Your job is to assist the human in crafting an actionable design specification.
You can ask clarifying questions if you do not have enough information to craft the speciation
Do never ask the user the same question twice.
You always obey the users instruction.
  
Your ultimate job is to create a draft of the design spec for the user task.
  
# Hard Rules for Generating a Design Spec
- The original user prompt
- The design spec can only contain pseudo code
- A description of the feature and proposed changes
- The programming language(s), 
- The libraries used
- The effected parts of the codebase. You must denote clearly what changes are modifications to existing files and what are new files
For example:
Files added/modified
Modified: packages/services/google/src/lib/delegates/sendEmail.ts
Added: packages/services/google/src/lib/delegates/driveHelpers.ts
Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
Added: packages/services/google/src/lib/delegates/sendEmail.test.ts
- Security specification including required access controls and permissions as well as privacy controls such as log sanitization etc
- Links to relevant documentation along with a summary of the methods used and data types
- A loose description or proposed inputs and outputs, including changes to existing types
- Functional specification that describes the algorithm
- Error handling
- Acceptance criteria
`;

  const user = userResponse
    ? `
    # Instructions
    Review the user response in the message thread and determine if a spec can be generated. 
    You can ask clarifying questions that align with your rules and user instruction as long as the user had not already answered them (either in the message history or their latest response)
    
    # Message History
    ${messages}

    # User Response
    ${userResponse}
    `
    : `
Below is the engineer's initial request and relevant context (stack, APIs, tests, file paths, prior threads). 
Your job: ask only clarifications questions (≤5, one-liners) to build intended design spec with confidence and then produce a crisp spec. 

Initial user request:
---
${(globalThis as any).initialMessage}
---

The current conversation thread with the user
'this is the start of the conversation

Generate the system design specification.
If you do not have enough information to create a draft of the design spec, ask clarifying questions to the user.

# Sample Training Data
Q: "create sending email function to send an custom templated email"
A:
- **Design spec**
  - **Instruction**: "create sending email function to send an custom templated email"
  - **Overview**: Implement \`sendEmail\` delegate using \`googleapis@149.0.0\` to send a single-template email. Expose it only via \`gsuiteClient.ts\` and scaffold tests per package conventions.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: \`googleapis@149.0.0\` preferred; REST fallback allowed
    - **Exposure**: Only through \`gsuiteClient.ts\`
    - **Package conventions**:
      - Delegates under \`src/lib/delegates/\`
      - Tests under \`src/lib/tests/\`
      - Public API exposed via \`gsuiteClient.ts\`
  - **Auth scopes required** (must be added in \`gsuiteClient.ts\` mail scopes):
    - \`https://mail.google.com/\`
    - \`https://www.googleapis.com/auth/gmail.modify\`
    - \`https://www.googleapis.com/auth/gmail.compose\`
    - \`https://www.googleapis.com/auth/gmail.send\`
  - **Security and Privacy**
    - Never log credentials; avoid logging full message content
  - **External API Reference**: \`users.messages.send\` — \`https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send\`
  - **Inputs and Outputs**
    - **Input type**: \`EmailContext\`
      - \`from: string\` (required)
      - \`recipients: string | string[]\` (required)
      - \`subject: string\` (required)
      - \`message: string\` (required; HTML allowed; plain-text auto-derived)
    - **Output type**: \`SendEmailOutput\`
      - \`id: string\`, \`threadId: string\`, \`labelIds?: string[]\`
  - **Functional Behavior**
    - Validate \`from\`, \`recipients\`, \`subject\`, \`message\`
    - Build \`multipart/alternative\` MIME with \`text/plain\` (derived) and \`text/html\` (provided + footer)
    - Base64url encode MIME and call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`
    - Return \`{ id, threadId, labelIds }\`
  - **Error Handling**
    - Throw on invalid input; validate Gmail response contains \`id\` and \`threadId\`
    - Log minimal context; include \`response.data\` when present; rethrow errors
  - **Acceptance Criteria**
    - Returns \`{ id, threadId }\` on success; MIME is well-formed and properly encoded; exposed only through \`gsuiteClient.ts\`
  - **Usage (via client)**

  Q:
  User task: "modify scheduleMeeting function to support optional attendees"
  A: "
- **Design spec**
  - **Instruction**: "modify scheduleMeeting function to support optional attendees"
  - **Overview**: Modify the \`scheduleMeeting\` delegate to support optional attendees. The \`CalendarContext\` interface will be updated to include \`attendees: { email: string; optional?: boolean; }[]\`. This change will allow the function to create calendar events with both required and optional attendees. Expose it only via \`gsuiteClient.ts\`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: \`googleapis@149.0.0\`
    - **Exposure**: Only through \`gsuiteClient.ts\`
    - **Package conventions**:
      - Delegates under \`src/lib/delegates/\`
      - Tests under \`src/lib/tests/\`
      - Public API exposed via \`gsuiteClient.ts\`
  - **Auth scopes required** (must be configured in \`gsuiteClient.ts\` calendar scopes):
    - \`https://www.googleapis.com/auth/calendar\` - Allows read and write access to Calendars and related settings.
    - \`https://www.googleapis.com/auth/calendar.events\` - Allows read and write access to Calendar events.
  - **Security and privacy**
    - Do not log sensitive event content.
  - **External API reference**: \`calendar.events.insert\` — \`https://developers.google.com/calendar/api/v3/reference/events/insert\`
    - **Description:** Creates an event in the specified calendar.
    - **HTTP Request:** \`POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events\`
    - **Path Parameters:**
      - \`calendarId\` (string, required): Calendar identifier. Use "primary" to access the primary calendar of the logged-in user. To retrieve other calendar IDs call the \`calendarList.list\` method.
    - **Query Parameters (Optional):**
      - \`conferenceDataVersion\` (integer): Version number of conference data supported by the API client. \`0\` assumes no support, \`1\` enables support. Default: \`0\`.
      - \`sendUpdates\` (string): Whether to send notifications about the creation of the new event.  Acceptable values: \`"all"\`), \`"externalOnly"\`), \`"none"\`. Default: \`false\`.
      - \`supportsAttachments\` (boolean): Whether API client performing operation supports event attachments. Default: \`false\`.
    - **Request Body:**  An \`Events\` resource. Key properties include:
      - \`summary\` (string, writable): Title of the event.
      - \`description\` (string, writable): Description of the event. Can contain HTML.
      - \`start\` (object, required, writable): Start time of the event. Contains \`dateTime\` (RFC3339 format) and \`timeZone\`.
      - \`end\` (object, required, writable): End time of the event. Contains \`dateTime\` (RFC3339 format) and \`timeZone\`.
      - \`attendees\` (array of objects, writable):  The attendees of the event.  Each object contains:
        - \`email\` (string, required):  The attendee's email address.
        - \`optional\` (boolean, optional, default: false): Whether this is an optional attendee.
      - \`conferenceData\` (object, writable): Conference-related information, such as details of a Google Meet conference.  Use \`createRequest\` to create new conference details.
    - **Response:** If successful, returns an \`Events\` resource.
    - **Authorization:** Requires one of the following scopes: 
    \`https://www.googleapis.com/auth/calendar\`, 
    // \`https://www.googleapis.com/auth/calendar.events\`, 
    // \`https://www.googleapis.com/auth/calendar.app.created\`, 
    // \`https://www.googleapis.com/auth/calendar.events.owned\`
    - **Inputs and outputs**
      - **Input type**: \`CalendarContext\`
        - \`summary: string\` (required)
        - \`description?: string\` (optional)
        - \`start: string\` (ISO format, required)
        - \`end: string\` (ISO format, required)
        - \`attendees: { email: string; optional?: boolean; }[]\` (required)
      - **Output type**: \`ScheduleMeetingOutput\`
        - \`id: string\`, \`htmlLink: string\`, \`status: string\`
  - **Functional behavior**
    - Validate required fields; construct event body with attendees, differentiating between required and optional attendees based on the \`optional\` flag, and request \`conferenceData\` for Google Meet.
    - Call \`calendar.events.insert\` with \`sendUpdates: 'all'\` and \`conferenceDataVersion: 1\`.
    - Ensure Meet link is present via \`hangoutLink\` or \`conferenceData.entryPoints\`.
    - Return \`{ id, htmlLink, status }\`.
  - **Error handling**
    - Throw if event creation succeeds without a Meet link.
    - Surface underlying API errors.
  - **Acceptance criteria**
    - Event is created with Meet link and invitations sent to both required and optional attendees.
    - Implemented and exposed only via \`gsuiteClient.ts\`; required scopes present there.
  - **Usage (via client)**

\`\`\`typescript
// pseudo code
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

const meeting = await client.scheduleMeeting({
  summary: 'Product Planning Session',
  description: 'Quarterly product roadmap review and planning',
  start: '2024-02-15T14:00:00-08:00',
  end: '2024-02-15T15:30:00-08:00',
  attendees: [
    { email: 'john@company.com' }, // Required
    { email: 'sarah@company.com', optional: true }, // Optional
    { email: 'mike@company.com' }, // Required
  ],
});
\`\`\`
`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      input: [
        { role: 'system', content: [{ type: 'input_text', text: system }] },
        { role: 'user', content: [{ type: 'input_text', text: user }] },
      ],
      reasoning: { effort: 'low' },
      store: true,
    }),
  });

  const resp = await response.json();

  // Find the message block inside the output
  const msg = (resp.output ?? []).find(
    (o: any) => o.type === 'message' && o.status === 'completed'
  ).content[0].text;
  if (!msg) {
    throw new Error('No message block found in output');
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

  return {
    confirmationPrompt: msg,
  };
}
