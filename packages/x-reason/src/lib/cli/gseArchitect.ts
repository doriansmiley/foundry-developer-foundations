import { SupportedEngines, xReasonFactory } from '../factory';
import engineV1 from '../engineV1';
import * as fs from 'fs/promises';
import {
  colorize,
  printSectionHeader,
  printSubSection,
} from './utils/cliPrintUtils';
import { getState } from '../orchestratorV1';
import { preflightUserTask } from '../functions/codeAssistant/architect/preflightUserTask';
import { groundUserTask } from '../functions/codeAssistant/architect/groundUserTask';

export async function gseArchitect(task: string) {
  console.clear();
  console.log(
    colorize('cyan', colorize('bold', '🏗️  Google Service Expert Architect'))
  );
  console.log(colorize('gray', `Task: ${task}`));

  const response = await preflightUserTask(task, '012');

  if (response.shouldContinue) {
    const groundResponse = await groundUserTask(
      response.response,
      response.conversationId
    );

    const { solver: architectSolver } = xReasonFactory(
      SupportedEngines.GOOGLE_SERVICE_EXPERT_ARCHITECT
    )({});

    console.log(
      printSectionHeader('Gathering more information for design specification')
    );

    const architectTaskList = await engineV1.solver.solve(
      groundResponse,
      architectSolver
    );

    console.log(architectTaskList);

    const solution = {
      input: groundResponse,
      id: `x-reason-architect-cli-${Date.now()}`,
      plan: architectTaskList || '',
    };

    console.log(printSubSection('Grounding the task step by step'));

    // TODO add hydration here accordingly to Dorian's instructions
    const result = await getState(
      solution,
      true,
      {},
      SupportedEngines.GOOGLE_SERVICE_EXPERT_ARCHITECT,
      { debug: true }
    );
    console.log('RESULT', result);

    process.exit(0);
    // here run solver with this response
  } else {
    process.exit(0);
  }
}
