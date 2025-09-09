#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';
import * as fs from 'fs';
import * as path from 'path';

import { Larry, LarryResponse } from '@codestrap/developer-foundations-agents-vickie-bennie';
import { container } from '@codestrap/developer-foundations-di';
import {
  Context,
  GetNextStateResult,
  MachineDao,
  ThreadsDao,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { SupportedEngines } from '@codestrap/developer-foundations-x-reason';
import 'dotenv/config';

async function main(executionId?: string, contextUpdateInput?: string) {
  const larry = new Larry();
  let result: LarryResponse | undefined;
  let answer;
  let nextState: GetNextStateResult | undefined;
  let userMessage;
  let systemResponse;
  let readme;
  const readmePath = path.resolve(
    process.cwd(),
    '../../packages/services/google/src/lib/README.LLM.md'
  );

  const args = process.argv.slice(2);
  const executionIdArg = args[0];

  if (executionIdArg && !executionId) {
    executionId = executionIdArg;
  }

  // Configure marked to render for the terminal
  // install terminal renderer (like the test does)
  marked.use(markedTerminal({
    reflowText: true,
    tab: 4,
  }));

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
    result = await larry.askLarry(`#Context\
      Using the contents of the README below: 
      ${readme}

      answer the user question below
      # User Input:
      ${answer}`, process.env.FOUNDRY_TEST_USER);
    executionId = result.executionId;
  } else {
    nextState = await larry.getNextState(
      undefined,
      true,
      executionId,
      contextUpdateInput,
      SupportedEngines.GOOGLE_SERVICES_CODE_ASSIST // IMPORTANT: The X-Reason factory needs to be updated to support whatever key you define for this x-Reason
    );

    const lastStateExecuted = nextState.orderTheTasksWereExecutedIn.pop();

    if (lastStateExecuted.includes('confirmUserIntent')) {
      userMessage = nextState.theResultOfEachTask[0].taskOutput.userResponse;
      systemResponse = nextState.theResultOfEachTask[0].taskOutput.confirmationPrompt;
    }

    const { messages } = await threadsDao.read(executionId);
    // the getNextState is not a conversation endpoint so we have to manually update the thread, boo!
    await threadsDao.upsert(`${messages}\nThe user responded with: ${userMessage}\nAnd the system responded with: ${systemResponse}`, 'larry', executionId)
  }

  const { state } = await machineDao.read(executionId);
  const { messages } = await threadsDao.read(executionId);

  // get the target stateId to apply the contextual update to, in this case where we left off
  const { context } = JSON.parse(state!) as { context: Context };

  const markdown = marked((systemResponse) ? systemResponse : messages) as string;

  // context.stateId is the id of the state where we left off, not the final state in the machine which in pause, success, or fail
  if (context.stateId.indexOf('confirmUserIntent') >= 0) {
    const userResponse = await input({
      message: `${markdown}`,
    });

    console.log(answer);

    // update the thread so the user response is persisted. This ensures it's factored in in the transition logic
    await threadsDao.upsert(`${messages}\nThe user responded with: ${userResponse}\n`, 'larry', executionId);

    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await main(executionId, JSON.stringify(contextUpdate));
  }
}

main();
