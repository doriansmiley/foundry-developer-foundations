import * as fs from 'fs/promises';
import { printSubSection } from '../../../cli/utils/cliPrintUtils';
import { container } from '@codestrap/developer-foundations-di';
import {
  GeminiService,
  OfficeService,
  TYPES,
} from '@codestrap/developer-foundations-types';
import {
  appendMessages,
  createConversationId,
  readConversation,
} from '../../../storage/conversationStore';
import { parseLLMJSONResponse } from '../utils/parseResponse';
import inquirer from 'inquirer';

export async function preflightUserTask(task: string, conversationId?: string) {
  // Ensure we have a conversationId to thread messages
  const convoId = conversationId || createConversationId();

  // Read files once
  const readme = await fs.readFile(
    'packages/services/google/README.md',
    'utf8'
  );

  const geminiService = container.get<GeminiService>(TYPES.GeminiService);

  console.log(printSubSection('Analyzing user task...'));

  const previous = await readConversation(convoId);
  const previousContext = previous
    .map((m) => `[${m.role}] ${m.content}`)
    .join('\n');

  console.log(previous);
  const system = `
  You are a Google Service Architect.
  You are specialized in package google-service located under packages/services/google.
  Repository is using Nx to manage the workspace. google-service is the Nx package name to run commands e.g nx run google-service:test - to run tests.
  You have available Nx workspace generator to scaffold new functions under the google-service package.

  Your job is to analyze user task and understand if function already exists in the package or not.
  If function already exists, you should return the name of the function.
  If function does not exist, you should return the name of the function that should be created.
  
  Documentation of all functions inside the package:
  ${readme}

    ${
      previousContext.length > 0
        ? `
  Previous conversation history, take this into account when you are analyzing user task, as those are already answered questions:
  ${previousContext}
  `
        : ''
    }

  You should always return response in valid (even if examples are not valid) JSON format:
  {
    response: string,
    followUp: string | null,
    shouldContinue: boolean
  }

  shouldContinue flag should break conitnuity of unreleated topic which are not connected to Google service package.

  You should return response in enhanced version of user prompt with the name of the function that should be created or already exists.
  Example:
  User task: "Create a function to send an email"
  Response: {
    response: "Function to send an email already exists. Here is the explanation how current function works:
    ### How \`sendEmail\` works

- **Purpose**: Sends a single-template email via Gmail using \`googleapis@149.0.0\`.
- **Inputs (\`EmailContext\`)**:
  - **from**: string (required)
  - **recipients**: string | string[] (required)
  - **subject**: string (required)
  - **message**: string (required; HTML allowed; plain text is auto-derived)
- **What it does**:
  - Validates inputs.
  - Builds a \`multipart/alternative\` MIME with both \`text/plain\` (auto-derived) and \`text/html\` (your message, plus a footer).
  - Base64url-encodes the MIME and calls Gmail \`users.messages.send\` with \`userId: 'me'\`.
- **Output (\`SendEmailOutput\`)**: \`{ id: string; threadId: string; labelIds?: string[] }\`.
- **Errors and logging**:
  - Throws on invalid input or if Gmail response is missing \`id\`/\`threadId\`.
  - Logs minimal context; may include \`response.data\` from API errors; never logs credentials or full content.
- **Auth scopes (must be configured in \`gsuiteClient.ts\`)**:
  - \`https://mail.google.com/\`
  - \`https://www.googleapis.com/auth/gmail.modify\`
  - \`https://www.googleapis.com/auth/gmail.compose\`
  - \`https://www.googleapis.com/auth/gmail.send\`

### Use with the DI container

\`\`\`typescript
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';

// Resolve the OfficeService (which exposes the Google client under the hood)
const officeService = await container.getAsync<OfficeService>(TYPES.OfficeService);

// Send an email
const result = await officeService.sendEmail({
  from: 'admin@company.com',
  recipients: ['team@company.com'], // or 'someone@company.com'
  subject: 'Weekly Update',
  message: \"<p>Here's this week's progress summary...</p>\", // HTML allowed
});

// result => { id, threadId, labelIds? }
\`\`\`

- **Notes**:
  - The email capability is exposed via \`gsuiteClient.ts\` and consumed by the DI-provided \`OfficeService\`.
  - Ensure your Google service account and domain-wide delegation are configured, and that the mail scopes above are included.

- Implemented behavior: Validates inputs, builds and sends a MIME email via Gmail, returns \`{ id, threadId }\`.
- DI usage: Resolve \`OfficeService\` from the container and call \`sendEmail({...})\`.
",
  followUp: "Do you want to modify this function to add something else or you would like to create v2 send email function?",
  shouldContinue: true
  }

  User task: "Create function to get drive files"
  Response: {
    response: "Create function to get drive files named \`getDriveFiles\` which will be accesing google drive disk.",
    followUp: null,
    shouldContinue: true
  }

  User task: "I wasn't aware that function already exists, I don't want to do anything, thanks!"
  Response: {
    response: "<figure the response out - process should be ended as your don't want any further actions.>"
    followUp: null,
    shouldContinue: false
  }
  
    User task: "Create slack function to send message to slack"
  Response: {
    response: "<figure the response out - process should be ended as Google coding assistant is not Slack specialist>"
    followUp: null,
    shouldContinue: false
  }

  User task: "What is the weather in Tokyo?"
  Response: {
    response: "<figure the response out - process should be ended as Google coding assistant is not weather specialist>"
    followUp: null,
    shouldContinue: false
  }
  `;

  const user = `
  User task: ${task}
  `;

  // Persist system and user messages before calling the model
  await appendMessages(convoId, [{ role: 'user', content: user }]);

  const result = await geminiService(system, user);

  const jsonResult = parseLLMJSONResponse<{
    response: string;
    followUp: string | null;
    shouldContinue: boolean;
  }>(result);

  // Persist assistant response
  await appendMessages(convoId, [
    {
      role: 'assistant',
      content: jsonResult.response,
    },
  ]);

  if (jsonResult.followUp) {
    await appendMessages(convoId, [
      {
        role: 'assistant',
        content: jsonResult.followUp,
      },
    ]);
    // run inquirer to get user input
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'answer',
        message: jsonResult.followUp,
      },
    ]);

    await appendMessages(convoId, [
      {
        role: 'user',
        content: answer.answer,
      },
    ]);

    return preflightUserTask(answer.answer, convoId);
  }

  return {
    conversationId: convoId,
    response: jsonResult.response,
    shouldContinue: jsonResult.shouldContinue,
  };
}
