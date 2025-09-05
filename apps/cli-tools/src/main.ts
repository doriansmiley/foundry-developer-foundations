#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

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
  let currentState;

  // Configure marked to render for the terminal
  marked.setOptions({
    renderer: new TerminalRenderer(),
  });

  if (!executionId) {
    answer = await input({ message: 'What would you like to do today:' });
    result = await larry.askLarry(answer, process.env.FOUNDRY_TEST_USER);
    currentState = result.state;
    executionId = result.executionId;
  } else {
    nextState = await larry.getNextState(
      undefined,
      true,
      executionId,
      JSON.stringify(contextUpdateInput),
      SupportedEngines.GOOGLE_SERVICES_CODE_ASSIST // IMPORTANT: The X-Reason factory needs to be updated to support whatever key you define for this x-Reason
    );
    currentState = nextState.value;
  }

  const machineDao = container.get<MachineDao>(TYPES.MachineDao);
  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

  const { state } = await machineDao.read(executionId);
  const { messages } = await threadsDao.read(executionId);

  // get the target stateId to apply the contextual update to, in this case where we left off
  const { context } = JSON.parse(state!) as { context: Context };

  // context.stateId is the id of the state where we left off, not the final state in the machine which in pause, success, or fail
  if (context.stateId.indexOf('confirmUserIntent') >= 0) {
    const userResponse = await input({
      message: `${marked(messages)}`,
    });

    console.log(answer);

    const contextUpdate = {
      [context.stateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
    };

    await main(executionId, JSON.stringify(contextUpdate));
  }
}

main();
