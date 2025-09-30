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

export async function googleCodingAgent(
  executionId?: string,
  contextUpdateInput?: string,
  task?: string
): Promise<{ executionId: string }> {
  const larry = new Larry();
  let result: LarryResponse | undefined;
  let answer;
  let readme;
  const readmePath = path.resolve(
    process.cwd(),
    '../../packages/services/google/src/lib/README.LLM.md'
  );

  console.log('updated context:: ', contextUpdateInput);
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

    return { executionId };
  } else {
    const machineDao = container.get<MachineDao>(TYPES.MachineDao);
    const { state } = await machineDao.read(executionId);
    const { context } = JSON.parse(state!) as { context: Context };

    if (
      context.stateId.includes('confirmUserIntent') ||
      context.stateId.includes('architectImplementation') ||
      context.stateId.includes('pause')
    ) {
      if (context.stateId.includes('pause')) {
        const lastStateBeforePause = context.stack?.[context.stack?.length - 1];
        if (
          !lastStateBeforePause ||
          !context.stateId.includes('confirmUserIntent') ||
          !context.stateId.includes('architectImplementation')
        ) {
          // we entered pause from some other state transition
          return;
        }
      }
      // capture any edits the MD files
      const prefix = context.stateId.includes('architectImplementation')
        ? 'designDoc'
        : 'spec';
      const p = path.join(process.cwd(), `${prefix}-${executionId}.md`);

      try {
        // check if the file exists
        await fs.promises.access(p, fs.constants.F_OK);
        const contents = await fs.promises.readFile(p, 'utf8');
        const inputUpdates = JSON.parse(contextUpdateInput || '{}');
        let currentStateValue = context[context.stateId] || {};
        if (inputUpdates[context.stateId]) {
          currentStateValue = {
            ...currentStateValue,
            ...inputUpdates[context.stateId],
          };
        }
        // destructure current values and override with new ones
        const contextUpdate = {
          ...inputUpdates,
          [context.stateId]: {
            ...currentStateValue,
            confirmationPrompt: contents,
          },
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
      true
    );
  }

  // TODO confirm with Dorian how it should work

  return { executionId };
}
