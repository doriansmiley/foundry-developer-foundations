import * as fs from 'fs/promises';
import {
  colorize,
  printSectionHeader,
  printSubSection,
} from '../../../cli/utils/cliPrintUtils';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import {
  appendMessages,
  createConversationId,
  readConversation,
} from '../../../storage/conversationStore';

export async function groundUserTask(task: string, conversationId?: string) {
  // Ensure we have a conversationId to thread messages
  const convoId = conversationId || createConversationId();

  // Read files once
  const readme = await fs.readFile(
    'packages/services/google/README.md',
    'utf8'
  );

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  // Load prior conversation (if any) to enrich the system message
  const previous = await readConversation(convoId);
  const previousContext = previous
    .map((m) => `[${m.role}] ${m.content}`)
    .join('\n');

  console.log(
    printSectionHeader(
      'Google Service Architect is creating draft of the design spec for the task'
    )
  );

  const system = `
  You are a Google Service Architect.
  You are specialized in package google-service located under packages/services/google.
  Repository is using Nx to manage the workspace. google-service is the Nx package name to run commands e.g nx run google-service:test - to run tests.
  You have available Nx workspace generator to scaffold new functions under the google-service package.
  You are to create a draft of the design spec for the user task.

  ${
    previous.length > 0
      ? `\n\nBased on the previous conversation thread (most recent last) you can see has been already gatherted and start from it if this is useful - it might be not:\n${previousContext}`
      : ''
  }

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

  
  Other examples of design specs for existing functions inside google-service package:
  ${readme}
  `;

  const user = `
  User task: ${task}
  `;

  // Persist system and user messages before calling the model
  await appendMessages(convoId, [{ role: 'user', content: user }]);

  const result = await geminiService(system, user);

  // Persist assistant response
  await appendMessages(convoId, [
    {
      role: 'assistant',
      content: typeof result === 'string' ? result : JSON.stringify(result),
    },
  ]);

  return result;
}
