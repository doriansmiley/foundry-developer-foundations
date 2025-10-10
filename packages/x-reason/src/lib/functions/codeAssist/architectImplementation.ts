import * as path from 'path';
import * as fs from 'fs';

import {
  Completion,
  Context,
  FileOp,
  MachineEvent,
  ThreadsDao,
  UserIntent,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';
import {
  googleFileOpsGenerator,
  googleImplementationGenerator,
  openAiImplementationGenerator,
} from './delegates';

async function verifyFilePaths(ops: FileOp[]) {
  const root = process.cwd();
  const inInLocalDev = root.includes('foundry-developer-foundations');
  // TODO support an ENV var and fallback to hard coded values
  const repoRoot = inInLocalDev
    ? root.split('foundry-developer-foundations')[0]
    : root.split('workspace')[0];

  // TODO we need to check each file and confirm the path exists. If not retry. If still unresolved error out.
  const promises = ops
    .filter((f) => f.type === 'modified' || f.type === 'required')
    .map(
      (f) =>
        new Promise((resolve, reject) => {
          const filePath = path.join(
            inInLocalDev
              ? `${repoRoot}/foundry-developer-foundations`
              : `${repoRoot}/workspace`,
            f.file
          );

          if (!fs.existsSync(filePath)) {
            console.log(`file does not exist: ${filePath}`);
            reject(f);
          } else {
            resolve(f);
          }
        })
    );

  const fileContents = await Promise.allSettled(promises);
  const failed = fileContents.filter((result) => result.status === 'rejected');

  return failed;
}

async function getEffectedFileList(plan: string) {
  // TODO replace with direct call to gemini api passing schema for structured outputs
  const system = `You are a helpful AI coding assistant tasked with extracting the effected parts of the codebase from the design specification as JSON
  You always look for the file list in the spec. Below is an example:
  Files added/modified/required
  - Required: packages/services/palantir/src/lib/doa/communications/communications/upsert.ts
  - Required: packages/services/palantir/src/lib/doa/communications/communications/upsert.test.ts
  - Added: packages/services/palantir/src/lib/doa/communications/communications/upsert.v2.ts
  - Added: packages/services/palantir/src/lib/doa/communications/communications/upsert.v2.test.ts
  - Modified: packages/types/src/lib/types.ts (Machine)

Once the file list is isolated you must extract and return as JSON in the following format:
[
{
file: string;
type: string;
}
]

For example:
[
    {
        "file": "packages/services/palantir/src/lib/doa/communications/communications/upsert.ts",
        "type": "required"
    },
    {
        "file": "packages/services/palantir/src/lib/doa/communications/communications/upsert.test.ts",
        "type": "required"
    },
    {
        "file": "packages/services/palantir/src/lib/doa/communications/communications/upsert.v2.ts",
        "type": "added"
    },
    {
        "file": "packages/services/palantir/src/lib/doa/communications/communications/upsert.v2.test.ts",
        "type": "added"
    },
    {
        "file": "packages/types/src/lib/types.ts",
        "type": "modified"
    }
]
  `;
  const user = `extract the changes to the codebase from the plan below and return the JSON per your system instructions
  ${plan}
  `;

  const { ops } = await googleFileOpsGenerator(user, system);

  const failed = await verifyFilePaths(ops);

  if (failed.length > 0) {
    //retry
    const { ops } = await googleFileOpsGenerator(
      `${user}
Your previous response failed to resolve the following files
${JSON.stringify(failed)}
Try again and make sure paths match exactly the paths in the supplied plan
`,
      system
    );

    const retriedFailures = await verifyFilePaths(ops);
    if (retriedFailures.length > 0) {
      throw new Error(
        `can not resolve paths for the following files: ${JSON.stringify(
          retriedFailures
        )}`
      );
    }
  }

  return ops;
}

async function getEffectedFileBlocks(ops: FileOp[]) {
  // we overwrite every time to take into account that changes may have been introduced that effect the fil list
  // load the contents of the listed file where modified is true and await Promise.all
  const root = process.cwd();
  const inInLocalDev = root.includes('foundry-developer-foundations');
  const repoRoot = inInLocalDev
    ? root.split('foundry-developer-foundations')[0]
    : root.split('workspace')[0];
  const promises = ops
    .filter((f) => f.type === 'modified' || f.type === 'required')
    .map(
      (f) =>
        new Promise((resolve, reject) => {
          const filePath = path.join(
            inInLocalDev
              ? `${repoRoot}/foundry-developer-foundations`
              : `${repoRoot}/workspace`,
            f.file
          );

          if (!fs.existsSync(filePath)) {
            console.log(`file does not exist: ${filePath}`);
            resolve({
              file: filePath,
              modified: false,
              contents: undefined,
            });
          }

          fs.promises
            .readFile(filePath, 'utf8')
            .then((value) => {
              f.contents = value;
              resolve(f);
            })
            .catch((e) => {
              reject(e);
            });
        })
    );

  const fileContents = (
    (await Promise.all(promises)) as {
      file: string;
      modified: boolean;
      contents?: string;
    }[]
  ).filter((item) => item.contents !== undefined);

  const blocks = fileContents.reduce((acc, cur) => {
    acc = `${acc}
- File path: ${cur.file}
- Contents:
\`\`\`typescript
${cur.contents}
\`\`\`
`;
    return acc;
  }, `# Current contents of the Files to be Modified`);

  return blocks;
}

export async function architectImplementation(
  context: Context,
  event?: MachineEvent,
  task?: string
): Promise<Completion> {
  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
  // we use the thread because it should not only contain the design specification but user comments as well
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

  const { userResponse, file } =
    (context[architectImplementationId] as UserIntent) || {};

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

  const { file: designSpec } =
    (context[confirmUserIntentId] as UserIntent) || {};

  if (!designSpec || !fs.existsSync(designSpec))
    throw new Error(`File does not exist: ${designSpec}`);

  const plan = await fs.promises.readFile(designSpec, 'utf8');

  const files = await getEffectedFileList(plan);
  const fileBlocks = await getEffectedFileBlocks(files);

  const system = `
You are a helpful AI engineering architect that specializes in creating the final design specification based on the design specification created by the requirements team.
Your job is to create a clean specification grounded in the provided specification with the code to be written. You must generate the proposed code!
The specification includes citations to ground you in the sources of documentation to be used

### User Inputs Include
- A “Design Specification Conversation Thread” that may include:
  - API surface (functions, types, file paths)
  - Tech stack (languages, frameworks, SDKs, library names and versions)
  - Test names and error phrases
  - Environment/build tools (Nx, Jest, Next.js, ts-jest, Google APIs, etc.)
  - Explicit constraints (e.g., “25 MB total attachment size”)
- A user task/question.

You always carefully evaluate user input before generating your response.
  `;

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

Generate the code blocks. Produce your answer using the **Code Edit Template** below. 
- **Code Blocks**:
  - For each file added/modified output the code block as follows:
    File: the path to the file extracted from the design specifications followed by either (MODIFIED) or (ADDED), for example: packages/services/google/src/lib/delegates/sendEmail.ts (MODIFIED)
    \`\`\`<language (for added files) or diff (for modified files)>
    <YOUR_CODE_HERE>
    \`\`\`
`;

  const prompt = `${user}
# The Design Specification
${plan}

# And the complete file contents of files to be modified.
${fileBlocks}`;

  // TODO inject this
  const { answer, tokenomics } = await openAiImplementationGenerator(
    prompt,
    system
  );

  if (userResponse) {
    // reset the user response so they can respond again!
    context[confirmUserIntentId].userResponse = undefined;
  }

  parsedMessages.push({
    // we purposefully omit the file blocks and the plan from the messages to avoid massive bloat.
    // They can be reconstructed later by loading the plan file or extracting the fileBlocks from
    // the proposedCodeEdits md file (split on # The complete current contents of all files being modified without any changes applied)
    user: user,
    system: answer,
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  const msg = `
# Proposed Code Edits
${answer}

# The complete current contents of all files being modified without any changes applied
${fileBlocks}
  `;

  const abs = path.resolve(
    process.env.BASE_FILE_STORAGE || process.cwd(),
    `proposedCodeEdits-${context.machineExecutionId}.md`
  );
  await fs.promises.writeFile(abs, msg, 'utf8');

  return {
    confirmationPrompt: msg,
    file: abs,
    tokenomics,
  };
}
