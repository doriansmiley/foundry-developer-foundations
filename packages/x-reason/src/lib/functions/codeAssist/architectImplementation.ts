import { promises as fs } from 'fs';
import * as path from 'path';

import {
  CodingArchitect,
  Context,
  GeminiService,
  MachineEvent,
  ThreadsDao,
  UserIntent,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';
import { extractJsonFromBackticks } from '@codestrap/developer-foundations-utils';

async function getEffectedFileList(plan: string) {
  const gemini = container.get<GeminiService>(TYPES.GeminiService);
  const system = `You are a helpful AI coding assistant tasked with extracting the effected parts of the codebase from the design specification as JSON
  You always look for the file list in the spec. Below is an example:
  Files added/modified
Modified: packages/services/google/src/lib/delegates/sendEmail.ts
Added: packages/services/google/src/lib/delegates/driveHelpers.ts
Modified: packages/services/google/src/lib/types.ts (EmailContext, SendEmailOutput)
Added: packages/services/google/src/lib/delegates/sendEmail.test.ts

Once the file list is isolated you must extract and return as JSON in the following format:
[
{
file: string;
modified: boolean;
}
]

For example:
[
    {
        "file": "packages/services/google/src/lib/delegates/sendEmail.ts",
        "modified": true
    },
    {
        "file": "packages/services/google/src/lib/delegates/driveHelpers.ts",
        "modified": false
    },
    {
        "file": "packages/services/google/src/lib/types.ts",
        "modified": true
    },
    {
        "file": "packages/services/google/src/lib/delegates/sendEmail.test.ts",
        "modified": false
    }
]
  `;
  const user = `extract the changes to the codebase from the plan below and return the JSON per your system instructions
  ${plan}
  `;

  const raw = await gemini(user, system);
  const cleaned = extractJsonFromBackticks(raw);
  const parsed = JSON.parse(cleaned) as { file: string, modified: boolean, contents?: string }[]

  return parsed;
}

export async function architectImplementation(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<UserIntent> {
  const architect = container.get<CodingArchitect>(TYPES.CodingArchitect);

  const threadsDao = container.get<ThreadsDao>(TYPES.SQLLiteThreadsDao);
  // we use the thread because it should not aonly contain the design specification but user comments as well
  const { messages } = await threadsDao.read(context.machineExecutionId!);
  const parsedMessages = JSON.parse(messages || '[]') as {
    user?: string;
    system?: string;
  }[];

  const confirmUserIntentId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('confirmUserIntent')) || '';
  // extract the design specification from the result of the last confirmUserIntent state executed
  const plan = (context[confirmUserIntentId] as UserIntent)?.confirmationPrompt;

  const files = await getEffectedFileList(plan);

  // load the contents of the listed file where modified is true and await Promise.all
  const root = process.cwd();
  const repoRoot = root.split('foundry-developer-foundations')[0]
  const promises = files
    .filter(f => f.modified)
    .map(f => new Promise((resolve, reject) => {
      const filePath = path.join(`${repoRoot}/foundry-developer-foundations`, f.file);
      fs.readFile(filePath, 'utf8')
        .then((value) => {
          f.contents = value;
          resolve(f);
        }).catch(e => {
          reject(e);
        });
    }
    ));

  const fileContents = await Promise.all(promises) as { file: string, modified: boolean, contents?: string }[];

  const fileBlocks = fileContents.reduce((acc, cur) => {
    acc = `${acc}
- File path: ${cur.file}
- Contents:
\`\`\`typescript
${cur.contents}
\`\`\`
`;
    return acc;
  }, `# Current contents of the Files to be Modified`);

  // get any user response that is incoming from the cli
  const searchDocumentationId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('architectImplementation')) || '';

  const userResponse = (context[searchDocumentationId] as UserIntent)
    ?.userResponse;

  if (userResponse) {
    parsedMessages.push({
      user: userResponse,
    });
  } else {
    // this should only happen on the first iteration,
    // but there may be edge cases where this task was reentered without asking the user a question
    parsedMessages.push({
      user: task,
    });
  }

  const prompt = `
    The complete message thread including the README that explains our current codebase and the proposed plan
    As well as the user's request and follow up answers
    ${messages}

    And the complete file contents of files to be modified. Be sure to review carefully to construct your response.
    ${fileBlocks}
    `;

  const response = await architect(prompt);

  parsedMessages.push({
    system: response,
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  return {
    confirmationPrompt: `# The Architect's Response
Hello there, it's the architect here. Please review my proposed final design spec and let me know if we are good to proceed.
        
${response}

# The Current Contents of the Files to Be Modified
Use the information below when generating edits.
${fileBlocks}`,
  };
}
