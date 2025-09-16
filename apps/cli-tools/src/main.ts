#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import * as fs from 'fs';
import * as path from 'path';

import {
  Larry,
  LarryResponse,
} from '@codestrap/developer-foundations-agents-vickie-bennie';
import { container } from '@codestrap/developer-foundations-di';
import {
  Context,
  MachineDao,
  ThreadsDao,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { SupportedEngines } from '@codestrap/developer-foundations-x-reason';
import 'dotenv/config';
import { uuidv4 } from '@codestrap/developer-foundations-utils';

async function main(executionId?: string, contextUpdateInput?: string) {
  const larry = new Larry();
  let result: LarryResponse | undefined;
  let answer;
  let systemResponse;
  let readme;
  const readmePath = path.resolve(
    process.cwd(),
    '../../packages/services/google/src/lib/README.LLM.v2.md'
  );

  const args = process.argv.slice(2);
  const executionIdArg = args[0];

  if (executionIdArg && !executionId) {
    executionId = executionIdArg;
  }

  // Configure marked to render for the terminal
  // install terminal renderer (like the test does)
  marked.use(
    markedTerminal({
      reflowText: true,
      tab: 4,
    })
  );

  // install a preprocess hook to "unindent" only markdown-ish lines
  // outside fenced code blocks. This avoids the 4-space=code rule
  // while preserving relative nesting for lists.
  marked.use({
    hooks: {
      preprocess(src: string) {
        const lines = src.replace(/\r\n?/g, '\n').split('\n');
        let inFence = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // toggle for ``` fences (keep fence line intact)
          if (/^\s*```/.test(line)) {
            inFence = !inFence;
            continue;
          }
          if (inFence) continue;

          // If the line starts with 4+ spaces *and* what follows looks like markdown
          // (heading, list, blockquote, hr), peel exactly 4 spaces OFF.
          // Repeat until it no longer has an extra 4, so we rescue markdown
          // that was shifted by 8, 12, ... spaces. Relative indent is preserved.
          let s = line;
          while (
            /^ {4|2,}(?=(?:#{1,6}\s|\* |\d+\.\s|> |-{1,}\s*$|`{3}|.+))/.test(s)
          ) {
            s = s.replace(/^ {4|2}/, '');
          }
          lines[i] = s.replace(/[ \t]+$/g, ''); // strip trailing spaces
        }

        return lines.join('\n').trim();
      },
    },
    gfm: true,
    breaks: true,
  });

  const machineDao = container.get<MachineDao>(TYPES.MachineDao);
  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

  if (!executionId) {
    readme = await fs.readFileSync(readmePath, 'utf8');
    answer = await input({ message: 'What would you like to do today:' });
    result = await larry.askLarry(
      `You are specialized in package google-service located under packages/services/google.
  Repository is using Nx to manage the workspace. google-service is the Nx package name to run commands e.g nx run google-service:test - to run tests.
  You have available Nx workspace generator to scaffold new functions under the google-service package.

  Your job is to analyze user task and understand if function already exists in the package or not.
  If function already exists, you should return the name of the function and explain how it works.
  If the function does not exist, you should enhance user query with proposed function name.
  
  
  You can find definition of all existing functions in the google-service package in the readme below, if function exists return explanation based on the practice section:
  ${readme}

      If function exists, explain how it works based on the existing function design spec and explain what user wants to do, that function exists and suggest clarifying questions if they want to create v2 or modify existing function.
      If function does not exists, proceed with the claryfication to create perfect design spec.

        Example:
  User task: "Create a function to send an email"
  Answer: "User wants to create a new function to send an email. Function to send an email already exists. Here is the explanation how current function works:
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
- DI usage: Resolve \`OfficeService\` from the container and call \`sendEmail({...})\`."

      If user asks about unreleated to Google services question, explain that you are specialized in Google services and you can only help with Google services related questions.

      If function does not exists, proceed with the claryfication to create perfect design spec.

      # User Input:
      ${answer}`,
      process.env.FOUNDRY_TEST_USER
    );
    executionId = result.executionId;
  } else {
    await larry.getNextState(
      undefined,
      true,
      executionId,
      contextUpdateInput,
      SupportedEngines.GOOGLE_SERVICES_CODE_ASSIST // IMPORTANT: The X-Reason factory needs to be updated to support whatever key you define for this x-Reason
    );
  }

  const { state } = await machineDao.read(executionId);
  const { messages } = await threadsDao.read(executionId);
  // get the target stateId to apply the contextual update to, in this case where we left off
  const { context } = JSON.parse(state!) as { context: Context };
  const lastState = context.stack?.pop();

  let parsedMessages: { user: string; system: string }[] = [];

  try {
    parsedMessages = JSON.parse(messages) as { user: string; system: string }[];
    // the last system response is the question to the user
    systemResponse = parsedMessages.pop().system;
  } catch {
    /* empty */
  }

  if (lastState.includes('success') || lastState.includes('error')) {
    // write the spec file
    const p = path.join(process.cwd(), `${uuidv4()}-spec-output.md`);
    await fs.promises.writeFile(p, systemResponse, 'utf8');
    return;
  }

  if (context.stateId.includes('generateEditMachine')) {
    // TODO call the code editor once the user approves the changes
    const p = path.join(process.cwd(), `${uuidv4()}-ops.json`);
    await fs.promises.writeFile(
      p,
      JSON.stringify(systemResponse, null, 2),
      'utf8'
    );

    const userResponse = await input({
      message: `# REVIEW EDIT PLAN
\`\`\`JSON
${systemResponse}
\`\`\`  
      `,
    });

    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await main(executionId, JSON.stringify(contextUpdate));
  }

  // context.stateId is the id of the state where we left off, not the final state in the machine which in pause, success, or fail
  if (
    context.stateId.includes('confirmUserIntent') ||
    context.stateId.includes('architectImplementation')
  ) {
    const markdown = marked(
      systemResponse ? systemResponse : messages
    ) as string;
    const userResponse = await input({
      message: `${markdown}`,
    });

    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await main(executionId, JSON.stringify(contextUpdate));
  }
}

main();
