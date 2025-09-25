#!/usr/bin/env node

import { input, select } from '@inquirer/prompts';
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

export async function googleCodingAgent(executionId?: string, contextUpdateInput?: string, task?: string) {
  const larry = new Larry();
  let result: LarryResponse | undefined;
  let answer;
  let readme;
  const readmePath = path.resolve(
    process.cwd(),
    '../../packages/services/google/src/lib/README.LLM.md'
  );

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

  if (!executionId) {
    // start a new execution and thread using the input task
    readme = await fs.readFileSync(readmePath, 'utf8');
    answer = task;
    executionId = uuidv4();
    const initialMessage = `# User Question
      ${answer}
      
      # Repo and Environment Setup
      Use the documentation from the README below to understand the current package and environment setup, programming language, and libraries use as well as current public apis, tests, etc
${readme}
      `;
    // TODO replace with a scoped context
    globalThis.initialMessage = initialMessage;

    result = await larry.askLarry(
      `# User Question
      ${answer}
      `,
      process.env.FOUNDRY_TEST_USER
    );
    executionId = result.executionId;
  } else {
    const machineDao = container.get<MachineDao>(TYPES.MachineDao);
    const { state } = await machineDao.read(executionId);
    const { context } = JSON.parse(state!) as { context: Context };

    if (
      context.stateId.includes('confirmUserIntent') ||
      context.stateId.includes('architectImplementation')
    ) {
      // capture any edits the MD files
      const prefix = context.stateId.includes('architectImplementation') ? 'designDoc' : 'spec';
      const p = path.join(process.cwd(), `${prefix}-${executionId}.md`);

      try {
        // check if the file exists
        await fs.promises.access(p, fs.constants.F_OK);
        const contents = await fs.promises.readFile(p, 'utf8');
        const inputUpdates = JSON.parse(contextUpdateInput || '{}');
        let currentStateValue = context[context.stateId] || {};
        if (inputUpdates[context.stateId]) {
          currentStateValue = { ...currentStateValue, ...inputUpdates[context.stateId] }
        }
        // destructure current values and override with new ones
        const contextUpdate = {
          ...inputUpdates,
          [context.stateId]: { ...currentStateValue, confirmationPrompt: contents },
        };

        contextUpdateInput = JSON.stringify(contextUpdate);
      } catch {
        console.log(`now file found for: ${p}`);
      }
    }

    await larry.getNextState(
      undefined,
      true,
      executionId,
      contextUpdateInput,
      SupportedEngines.GOOGLE_SERVICES_CODE_ASSIST,
      true,
    );
  }

  const machineDao = container.get<MachineDao>(TYPES.MachineDao);
  const threadsDao = container.get<ThreadsDao>(TYPES.SQLLiteThreadsDao);
  const { state } = await machineDao.read(executionId);
  const { messages } = await threadsDao.read(executionId);
  const { context } = JSON.parse(state!) as { context: Context };
  const parsedMessages = JSON.parse(messages || '[]') as { user?: string; system?: string }[];
  const systemResponse = parsedMessages?.[parsedMessages.length - 1]?.system;


  if (context.stateId.includes('generateEditMachine')) {
    // TODO call the code editor once the user approves the changes
    const p = path.join(process.cwd(), `${executionId}-ops.json`);
    // remember this is double encoded!
    const parsed = JSON.parse(JSON.parse(systemResponse));
    const formatted = JSON.stringify(parsed, null, 2);
    await fs.promises.writeFile(p, formatted, 'utf8');

    const userResponse = await input({
      message: `# REVIEW EDIT PLAN
\`\`\`JSON
${formatted}
\`\`\`  
      `,
    });

    parsedMessages.push({
      user: userResponse,
    });

    // we must capture the thread response so that if the AI transition moves to the next state it's captured
    // this might lead to redundant responses that those don't hurt anything, they are effectively idempotent
    await threadsDao.upsert(
      JSON.stringify(parsedMessages),
      'cli-tool',
      executionId,
    );

    // get the target stateId to apply the contextual update to, in this case where we left off
    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await googleCodingAgent(executionId, JSON.stringify(contextUpdate));
  }

  // context.stateId is the id of the state where we left off, not the final state in the machine which in pause, success, or fail
  if (
    context.stateId.includes('confirmUserIntent') ||
    context.stateId.includes('architectImplementation') ||
    context.stateId.includes('pause') // some states end on pause which also require human review
  ) {

    const prefix = context.stateId.includes('architectImplementation') ? 'designDoc' : 'spec';

    // write the spec file
    const p = path.join(process.cwd(), `${prefix}-${executionId}.md`);
    await fs.promises.writeFile(
      p,
      context[context.stateId]?.confirmationPrompt || '# No results found',
      'utf8'
    );

    // await user feedback
    const markdown = marked(
      // TODO we need a way to get back the questions for the user. 
      systemResponse ? systemResponse : messages
    ) as string;
    const userResponse = await input({
      message: `${markdown}`,
    });

    parsedMessages.push({
      user: userResponse,
    });

    // we must capture the thread response so that if the AI transition moves to the next state it's captured
    // this might lead to redundant responses that those don't hurt anything, they are effectively idempotent
    await threadsDao.upsert(
      JSON.stringify(parsedMessages),
      'cli-tool',
      executionId,
    );

    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await googleCodingAgent(executionId, JSON.stringify(contextUpdate));
  }
}

async function main() {
  const args = process.argv.slice(2);
  const executionIdArg = args[0];

  if (executionIdArg) {
    // TODO figure out how to resolve the coding agent from the executionIdArg
    // likely need to add an attribute to the machine execution object to track the agent 
    // or maintain a separate lookup table
    await googleCodingAgent(executionIdArg);
  }

  const whichAgent = await select({ message: 'select the agent', choices: ['googleCodingAgent'] })
  const task = await input({ message: 'What would you like to do today:' });

  switch (whichAgent) {
    case 'googleCodingAgent':
      await googleCodingAgent(undefined, undefined, task);
  }
}

main();
