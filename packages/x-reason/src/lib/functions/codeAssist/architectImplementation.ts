import * as path from 'path';
import * as fs from 'fs';

import {
  Context,
  GeminiService,
  MachineEvent,
  ThreadsDao,
  UserIntent,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';
import { extractJsonFromBackticks } from '@codestrap/developer-foundations-utils';
import { softwareArchitect } from './softwareArchitect';
import { content } from 'googleapis/build/src/apis/content';

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
  const parsed = JSON.parse(cleaned) as {
    file: string;
    modified: boolean;
    contents?: string;
  }[];

  return parsed;
}

export async function architectImplementation(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<UserIntent> {
  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
  // we use the thread because it should not aonly contain the design specification but user comments as well
  const { messages } = await threadsDao.read(context.machineExecutionId!);
  const parsedMessages = JSON.parse(messages || '[]') as {
    user?: string;
    system?: string;
  }[];

  const architectImplementationId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('architectImplementation')) || '';

  const { userResponse, file } = (context[architectImplementationId] as UserIntent) || {};

  let updatedContents;
  if (file) {
    // read the file that may contain updates from the user
    updatedContents = await fs.promises.readFile(file, 'utf8');
  }

  // if there is a user response regenerate pass it along with the updated contents
  // else generate a new architecture plan
  const confirmUserIntentId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('confirmUserIntent')) || '';

  const { file: designSpec } = (context[confirmUserIntentId] as UserIntent) || {};

  if (!designSpec || !fs.existsSync(designSpec)) throw new Error(`File does not exist: ${designSpec}`);

  const plan = await fs.promises.readFile(designSpec, 'utf8');

  const files = await getEffectedFileList(plan);

  // load the contents of the listed file where modified is true and await Promise.all
  const root = process.cwd();
  const repoRoot = root.split('foundry-developer-foundations')[0];
  const promises = files
    .filter((f) => f.modified)
    .map(
      (f) =>
        new Promise((resolve, reject) => {
          const filePath = path.join(
            `${repoRoot}/foundry-developer-foundations`,
            f.file
          );

          if (!fs.existsSync(filePath)) {
            console.log(`file does not exist: ${filePath}`);
            resolve({
              file: filePath,
              modified: false,
              contents: undefined
            });
          }

          fs.promises.readFile(filePath, 'utf8')
            .then((value) => {
              f.contents = value;
              resolve(f);
            })
            .catch((e) => {
              reject(e);
            });
        })
    );

  const fileContents = ((await Promise.all(promises)) as {
    file: string;
    modified: boolean;
    contents?: string;
  }[]).filter(item => item.contents !== undefined);

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

  const user = userResponse
    ? `
# Instructions
Generate the code blocks for the design specification below. Ensure you adhere to the specified programming language
style, and rules. Incorporate the feedback in the user response by carefully reviewing them along with your previous response.

# Rules for answer synthesis
- For modified files output a diff view of the changes. Output the smallest change set possible. For example do not output the entire contents of the types file if all you are doing is adding a single property to a type. Just output a diff of that type with your changes applied.
- Do not nest type definitions inside functions
- Make sure you code is complete and free form error
- Prefer use of array methods like map, forEach, reduce etc and chain operations to achieve the desired output state as much as possible
- Always use Maps when you need key/value lookups. When populating a map prefer an array of tuples passed to the constructor over multiple calls to set or loops.
- Never use await inside loops, collect promises and use Promise.all or Promise.allSettled for operations where failure of some promises is acceptable
- Prefer pure functions
- Prefer stateless functions when possible.
- Always clear references that might block garbage collection and cause memory leaks
- Leave all test cases blank for the developer to fill in. In the comments for each test scenario include the gherkin specification as comments.

# User Response
${userResponse}

# The Results of Your Previous attempt at generating the final design specification .
Carefully review for any change requests, answers to questions, etc., from the user.
${updatedContents}

# The Design Specification
${plan}

# And the complete file contents of files to be modified.
${fileBlocks}

Generate the code blocks. Produce your answer using the **Code Edit Template** below. 
- **Code Blocks**:
  - For each file added/modified output the code block as follows:
    File: the path to the file extracted from the design specifications followed by either (MODIFIED) or (ADDED), for example: packages/services/google/src/lib/delegates/sendEmail.ts (MODIFIED)
    \`\`\`<language (for added files) or diff (for modified files)>
    <YOUR_CODE_HERE>
    \`\`\`
`
    : `
# Instructions
Generate the code blocks for the design specification below. Ensure you adhere to the specified programming language
style, and rules. 

# Rules for answer synthesis
- For modified files output a diff view of the changes. Output the smallest change set possible. For example do not output the entire contents of the types file if all you are doing is adding a single property to a type. Just output a diff of that type with your changes applied.
- Do not nest type definitions inside functions
- Make sure you code is complete and free form error
- Prefer use of array methods like map, forEach, reduce etc and chain operations to achieve the desired output state as much as possible
- Always use Maps when you need key/value lookups. When populating a map prefer an array of tuples passed to the constructor over multiple calls to set or loops.
- Never use await inside loops, collect promises and use Promise.all or Promise.allSettled for operations where failure of some promises is acceptable
- Prefer pure functions
- Prefer stateless functions when possible.
- Always clear references that might block garbage collection and cause memory leaks
- Leave all test cases blank for the developer to fill in. In the comments for each test scenario include the gherkin specification as comments.

# The Design Specification
${plan}

# And the complete file contents of files to be modified.
${fileBlocks}

Generate the code blocks. Produce your answer using the **Code Edit Template** below. 
- **Code Blocks**:
  - For each file added/modified output the code block as follows:
    File: the path to the file extracted from the design specifications followed by either (MODIFIED) or (ADDED), for example: packages/services/google/src/lib/delegates/sendEmail.ts (MODIFIED)
    \`\`\`<language (for added files) or diff (for modified files)>
    <YOUR_CODE_HERE>
    \`\`\`
`;

  const response = await softwareArchitect(user);

  if (userResponse) {
    // reset the user response so they can respond again!
    context[confirmUserIntentId].userResponse = undefined;
  }

  parsedMessages.push({
    user: user,
    system: response,
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  const msg = `
# Proposed Code Edits
${response}

# The complete current contents of all files being modified without any changes applied
${fileBlocks}
  `;

  const abs = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `proposedCodeEdits-${context.machineExecutionId}.md`);
  await fs.promises.writeFile(abs, msg, 'utf8');

  return {
    confirmationPrompt: msg,
    file: abs,
  };
}
