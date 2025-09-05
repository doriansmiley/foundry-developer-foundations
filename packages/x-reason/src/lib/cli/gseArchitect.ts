import { SupportedEngines, xReasonFactory } from '../factory';
import engineV1 from '../engineV1';
import * as fs from 'fs/promises';
import {
  colorize,
  printSectionHeader,
  printSubSection,
} from './utils/cliPrintUtils';
import { getState } from '../orchestratorV1';

export async function gseArchitect(task: string) {
  console.clear();
  console.log(
    colorize('cyan', colorize('bold', '🏗️  Google Service Expert Architect'))
  );
  console.log(colorize('gray', `Task: ${task}`));

  // Read files once
  const readme = await fs.readFile(
    'packages/services/google/README.md',
    'utf8'
  );

  const { solver: architectSolver } = xReasonFactory(
    SupportedEngines.GOOGLE_SERVICE_EXPERT_ARCHITECT
  )({});

  console.log(
    printSectionHeader('Analysis started by Google Service Expert Architect')
  );

  const enhancedPromptWithReadme = `inside google-service package ${task}
README:
${readme}
  `;
  const architectTaskList = await engineV1.solver.solve(
    enhancedPromptWithReadme,
    architectSolver
  );

  console.log(architectTaskList);
  const solution = {
    input: task,
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
    { debug: false }
  );

  // if result === new intent, then run solver once again with the new query
}
