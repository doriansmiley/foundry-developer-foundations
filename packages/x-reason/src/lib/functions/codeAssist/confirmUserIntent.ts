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
  let userResponses;
  const readme = fs.readFileSync(
    path.resolve(
      process.cwd(),
      '../../packages/services/google/src/lib/README.LLM.v2.md'
    ),
    'utf8'
  );

  const system = `
You are a Google Service Architect.
  You are specialized in package google-service located under packages/services/google.
  Repository is using Nx to manage the workspace. google-service is the Nx package name to run commands e.g nx run google-service:test - to run tests.
  You have available Nx workspace generator to scaffold new functions under the google-service package.

  Your job is to analyze user task and understand if function already exists in the package or not.
  If function already exists, you should return the name of the function and explain how it works.
  If the function does not exist, you should propose draft of the design spec for the new function.
  
  Your ultimate job is to create a draft of the design spec for the user task.
  Before you will be able to create draft based on the current conversation thread, ask clarifying questions to the user.

  Rules of designs spec:
  Always include Overview at the begining of the design spec. If user wants to modify/update or delete also add Overview specifying whhat user wants to do and with what function.
  Default context for every task
  context:
    language: TypeScript
    libraryUsed: "googleapis@149.0.0"
    implementationInstructions: "Use googleapis library, but if there is not clarity how to use it or it is more convintent to directly call API endpoints with REST that's fine too. Functions can be exported only via latest version of gSuiteClient."
    functionality:
      interfaces: [],
      description: ''
    files: 
     to be scaffolded with Nx custom generator:
         - 
      to be updated:
         - 
                
    auth_scopes_required: []
    apis_referenced: []
   package_conventions:
    - "function implementations under src/lib/delegates/"
    - "tests files under src/lib/tests"
    - "client exposure in gsuiteClient.ts, all public functionalities are exposed through client"


    Your job is to tranform context from the conversation and default context into design spec mardown format
    Example design specs coupled with instructions:
    - **Instruction**: "create sending email function to send an custom templated email"

- **Design spec**
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
  - **External API reference**: \`users.messages.send\` — \`https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send\`
  - **Inputs and outputs**
    - **Input type**: \`EmailContext\`
      - \`from: string\` (required)
      - \`recipients: string | string[]\` (required)
      - \`subject: string\` (required)
      - \`message: string\` (required; HTML allowed; plain-text auto-derived)
    - **Output type**: \`SendEmailOutput\`
      - \`id: string\`, \`threadId: string\`, \`labelIds?: string[]\`
  - **Functional behavior**
    - Validate \`from\`, \`recipients\`, \`subject\`, \`message\`
    - Build \`multipart/alternative\` MIME with \`text/plain\` (derived) and \`text/html\` (provided + footer)
    - Base64url encode MIME and call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`
    - Return \`{ id, threadId, labelIds }\`
  - **Error handling**
    - Throw on invalid input; validate Gmail response contains \`id\` and \`threadId\`
    - Log minimal context; include \`response.data\` when present; rethrow errors
  - **Security and privacy**
    - Never log credentials; avoid logging full message content
  - **Acceptance criteria**
    - Returns \`{ id, threadId }\` on success; MIME is well-formed and properly encoded; exposed only through \`gsuiteClient.ts\`
  - **Usage (via client)**

  
  Other examples of design specs for existing functions inside google-service package are in below readme under practice section:
  ${readme}


  Examples:
  User task: "modify scheduleMeeting function to support optional attendess"
  Answer: "
  **Design spec**
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
  - **External API reference**: \`calendar.events.insert\` — \`https://developers.google.com/calendar/api/v3/reference/events/insert\`
    - **Description:** Creates an event in the specified calendar.
    - **HTTP Request:** \`POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events\`
    - **Path Parameters:**
      - \`calendarId\` (string, required): Calendar identifier. Use "primary" to access the primary calendar of the logged-in user. To retrieve other calendar IDs call the \`calendarList.list\` method.
    - **Query Parameters (Optional):**
      - \`conferenceDataVersion\` (integer): Version number of conference data supported by the API client. \`0\` assumes no support, \`1\` enables support. Default: \`0\`.
      - \`sendUpdates\` (string): Whether to send notifications about the creation of the new event.  Acceptable values: \`"all"\), \`"externalOnly"\), \`"none"\`. Default: \`false\`.
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
    - **Authorization:** Requires one of the following scopes: \`https://www.googleapis.com/auth/calendar\`, \`https://www.googleapis.com/auth/calendar.events\`, \`https://www.googleapis.com/auth/calendar.app.created\`, \`https://www.googleapis.com/auth/calendar.events.owned\`.
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
  - **Security and privacy**
    - Do not log sensitive event content.
  - **Acceptance criteria**
    - Event is created with Meet link and invitations sent to both required and optional attendees.
    - Implemented and exposed only via \`gsuiteClient.ts\`; required scopes present there.
  - **Usage (via client)**

\`\`\`typescript
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
  "

  User task: "Create new function to send email with drive attachments"
  Answer: "
  '- **Design spec**\n' +
      '  - **Overview**: Implement \`sendEmailWithDriveAttachments\` delegate using \`googleapis@149.0.0\` to send emails with attachments from Google Drive. Expose it only via \`gsuiteClient.ts\` and scaffold tests per package conventions.\n' +
      '  - **Constraints**\n' +
      '    - **Language**: TypeScript\n' +
      '    - **Library**: \`googleapis@149.0.0\` preferred; REST fallback allowed.\n' +
      '    - **Exposure**: Only through \`gsuiteClient.ts\`.\n' +
      '    - **Package conventions**:\n' +
      '      - Delegates under \`src/lib/delegates/\`.\n' +
      '      - Tests under \`src/lib/tests/\`.\n' +
      '      - Public API exposed via \`gsuiteClient.ts\`.\n' +
      '  - **Auth scopes required** (must be added in \`gsuiteClient.ts\` mail scopes):\n' +
      '    - \`https://mail.google.com/\`\n' +
      '    - \`https://www.googleapis.com/auth/gmail.modify\`\n' +
      '    - \`https://www.googleapis.com/auth/gmail.compose\`\n' +
      '    - \`https://www.googleapis.com/auth/gmail.send\`\n' +
      '    - \`https://www.googleapis.com/auth/drive.readonly\`\n' +
      '    - \`https://www.googleapis.com/auth/drive.readonly\`\n' +
      '  - **External API references**:\n' +
      '    - \`users.messages.send\` — \`https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send\`\n' +
      '    - \`files.get\` - \`https://developers.google.com/drive/api/reference/rest/v3/files/get\`\n' +
      '  - **Inputs and outputs**\n' +
      '    - **Input type**: \`EmailWithDriveAttachmentsContext\`\n' +
      '      - \`from: string\` (required)\n' +
      '      - \`recipients: string | string[]\` (required)\n' +
      '      - \`subject: string\` (required)\n' +
      '      - \`message: string\` (required; HTML allowed; plain-text auto-derived)\n' +
      '      - \`driveAttachmentIds: string[]\` (required; Array of Google Drive file IDs)\n' +
      '    - **Output type**: \`SendEmailOutput\`\n' +
      '      - \`id: string\`, \`threadId: string\`, \`labelIds?: string[]\`\n' +
      '  - **Functional behavior**\n' +
      '    - Validate \`from\`, \`recipients\`, \`subject\`, \`message\`, and \`driveAttachmentIds\`.\n' +
      '    - For each \`driveAttachmentId\`:\n' +
      '      - Fetch the file metadata (name, MIME type) using the Drive API.\n' +
      '      - Download the file content as a byte array.\n' +
      '      - Encode file content to base64.\n' +
      '    - Construct a \`multipart/mixed\` MIME message.\n' +
      '      - The first part should be \`multipart/alternative\` MIME with \`text/plain\` (derived) and \`text/html\` (provided + footer).\n' +
      '      - Subsequent parts are the attachments, with appropriate \`Content-Type\` and \`Content-Disposition\` headers.\n' +
      "    - Base64url encode the entire MIME message and call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`.\n" +
      '    - Return \`{ id, threadId, labelIds }\`.\n' +
      '  - **Error handling**\n' +
      '    - Throw on invalid input or if any Drive API calls fail. Validate Gmail response contains \`id\` and \`threadId\`.\n' +
      '    - Log minimal context; include \`response.data\` when present; rethrow errors.\n' +
      '  - **Security and privacy**\n' +
      '    - Never log credentials or attachment content.\n' +
      '    - Ensure that the service account has the necessary permissions to access the Drive files.\n' +
      '  - **Acceptance criteria**\n' +
      '    - Returns \`{ id, threadId }\` on success; MIME is well-formed and properly encoded; attachments are included in the email; exposed only through \`gsuiteClient.ts\`.\n' +
      '  - **Usage (via client)**\n' +
      '\n' +
      '\`\`\`typescript\n' +
      "import { makeGSuiteClient } from './lib/gsuiteClient';\n" +
      '\n' +
      "const client = await makeGSuiteClient('user@company.com');\n" +
      '\n' +
      'await client.sendEmailWithDriveAttachments({\n' +
      "  from: 'user@company.com',\n" +
      "  recipients: ['team@company.com'],\n" +
      "  subject: 'Important Documents',\n" +
      "  message: '<p>Please find attached the relevant documents.</p>',\n" +
      "  driveAttachmentIds: ['1234567890abcdefghijklm', 'abcdefghijklm1234567890'],\n" +
      '});\n' +
      '\`\`\`\n' +
      '\`\`\`\n' +
  "

  User task: "Create sending email function."
  Answer: "- **Design spec**
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
  - **External API reference**: \`users.messages.send\` — \`https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send\`
  - **Inputs and outputs**
    - **Input type**: \`EmailContext\`
      - \`from: string\` (required)
      - \`recipients: string | string[]\` (required)
      - \`subject: string\` (required)
      - \`message: string\` (required; HTML allowed; plain-text auto-derived)
    - **Output type**: \`SendEmailOutput\`
      - \`id: string\`, \`threadId: string\`, \`labelIds?: string[]\`
  - **Functional behavior**
    - Validate \`from\`, \`recipients\`, \`subject\`, \`message\`
    - Build \`multipart/alternative\` MIME with \`text/plain\` (derived) and \`text/html\` (provided + footer)
    - Base64url encode MIME and call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`
    - Return \`{ id, threadId, labelIds }\`
  - **Error handling**
    - Throw on invalid input; validate Gmail response contains \`id\` and \`threadId\`
    - Log minimal context; include \`response.data\` when present; rethrow errors
  - **Security and privacy**
    - Never log credentials; avoid logging full message content
  - **Acceptance criteria**
    - Returns \`{ id, threadId }\` on success; MIME is well-formed and properly encoded; exposed only through \`gsuiteClient.ts\`
  - **Usage (via client)**"

  If you do not have enough information to create a draft of the design spec, ask clarifying questions to the user.
`;

  let user = `
Below is the engineer's initial request and relevant context (stack, APIs, tests, file paths, prior threads). 
Your job: ask only clarifications questions (≤5, one-liners) to build intended design spec with confidence and then produce a crisp spec. 

Initial user request:
---
${task}
---
`;

  if (context.machineExecutionId) {
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
    try {
      userResponses = await threadsDao.read(context.machineExecutionId);
      if (userResponses) {
        user = `
Your job: ask only clarifications questions (≤5, one-liners) to build intended design spec with confidence and then produce a crisp spec. 
Here is the conversation thread with the user:
    ${userResponses?.messages}
            `;
      }
    } catch (e) {
      /* empty */
    }
  }

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  const response = await geminiService(user, system);

  try {
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
    const { messages } = await threadsDao.read(context.machineExecutionId!);

    const parsedMessages = JSON.parse(messages!) as {
      user?: string;
      system: string;
    }[];
    parsedMessages.push({
      system: response,
    });

    await threadsDao.upsert(
      JSON.stringify(parsedMessages),
      'cli-tool',
      context.machineExecutionId!
    );
  } catch {
    /* empty */
  }

  return {
    confirmationPrompt: response,
  };
}
