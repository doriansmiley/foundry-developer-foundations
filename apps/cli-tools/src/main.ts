#!/usr/bin/env node

import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';

import {
  Larry,
  LarryResponse,
} from '@codestrap/developer-foundations-agents-vickie-bennie';
import { container } from '@codestrap/developer-foundations-di';
import {
  AbstractReviewState,
  Context,
  MachineDao,
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
    // restart where we left off
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
  const { state } = await machineDao.read(executionId);
  const { context } = JSON.parse(state!) as { context: Context };

  // handle human review states
  if (context.stateId.includes('specReview') ||
    context.stateId.includes('architectureReview') ||
    context.stateId.includes('codeReview') ||
    context.stateId.includes('pause')
  ) {
    let stateId = context.stateId;
    // sometimes we land on pause due to race conditions. I need to track them down. Once fixed we should be able to remove this
    if (context.stateId.includes('pause')) {
      // reset to the first state that is not pause
      stateId = context.stack
        ?.slice()
        .reverse()
        .find((item) => !item.includes('pause')) || '';
    }

    if (!stateId) {
      throw new Error('unable to resolve stateID')
    }

    if (!stateId.includes('specReview') &&
      !stateId.includes('architectureReview') &&
      !stateId.includes('codeReview')
    ) {
      return;
    }

    // get the system response by grabbing the last instance of system response from the messages array
    const { messages, reviewRequired } = context[stateId] as AbstractReviewState;
    const lastMessage =
      messages
        ?.slice()
        .reverse()
        .find((item) => item.user === undefined);

    if (reviewRequired) {
      const approved = (await select({ message: 'Approved', choices: ['yes', 'no'] })) === 'yes';

      if (!approved) {
        const userResponse = await input({
          message: 'Please provide feedback on what you would like changed',
        });

        lastMessage.user = userResponse;
      } else {
        lastMessage.user = 'Looks good, approved.';
      }


      // get the target stateId to apply the contextual update to, in this case where we left off
      const contextUpdate = {
        [context.stateId]: { messages, approved }, // messages will be destructured onto the rest of the context values
      };

      await googleCodingAgent(executionId, JSON.stringify(contextUpdate));
    }
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
