import { State } from 'xstate';

import { xReasonFactory, SupportedEngines } from './factory';
import {
  headlessInterpreter,
  engineV1 as engine,
} from '@codestrap/developer-foundations-x-reason';
import {
  sanitizeJSONString,
  uuidv4,
} from '@codestrap/developer-foundations-utils';
import {
  Solutions,
  ActionType,
  Context,
  MachineEvent,
  StateConfig,
} from '@codestrap/developer-foundations-types';
import { getLogger } from '@codestrap/developer-foundations-utils';

export async function getState(
  solution: Solutions,
  forward = true,
  workflow?: Record<string, any>,
  xreason: SupportedEngines = SupportedEngines.GOOGLE
) {
  const { programmer, aiTransition, evaluate, functionCatalog } =
    xReasonFactory(xreason)({});
  let currentState: State<Context, MachineEvent> | undefined;
  const { getLog, log } = getLogger();

  const dispatch = (action: ActionType) => {
    log(
      `${solution.id} Google x-reason dispatch callback called: ${action.type}`
    );
    switch (action.type) {
      case 'SET_STATE':
        currentState = action.value?.currentState as State<
          Context,
          MachineEvent
        >;
        break;
    }
  };

  // Create sendProxy that will be connected to state machine send function
  let stateMachineSend: (action: ActionType, stateId?: string) => void;

  const sendProxy = (action: ActionType) => {
    if (stateMachineSend) {
      stateMachineSend(action, action.payload?.stateId as string);
    }
  };

  // Build function catalog with sendProxy (like vickie-bennie)
  const catalog = functionCatalog(sendProxy);

  // Setup context like vickie-bennie
  let inputContext: Context = {
    requestId: uuidv4(),
    machineExecutionId: solution.id,
    status: 0,
    solution: sanitizeJSONString(solution.plan),
    stack: [],
    ...workflow,
  };

  const executeWorkflow = async (query: string) => {
    try {
      log(`${solution.id} Starting Google AI Agent workflow for: ${query}`);

      // Step 1: Generate the state machine using programmer (like vickie-bennie)
      const toolsCatalog = Array.from(catalog.entries()).map((item) => {
        return [item[0], { description: item[1].description }];
      });

      const result: StateConfig[] = await engine.programmer.program(
        query,
        JSON.stringify(Array.from(toolsCatalog.entries())),
        programmer
      );

      log(`${solution.id} Generated state machine: ${JSON.stringify(result)}`);

      // Step 2: Execute using headlessInterpreter (like vickie-bennie)
      const { done, start, send, getContext, serialize } = headlessInterpreter(
        result,
        catalog,
        dispatch,
        inputContext,
        undefined, // startingState
        false // includesLogic
      );

      // Connect sendProxy to the actual state machine send function
      stateMachineSend = send;

      log(`${solution.id} Starting state machine execution`);
      start();

      // Wait for completion (like vickie-bennie)
      let iterations = 0;
      const MAX_ITERATIONS = 60;
      while (!done() && iterations < MAX_ITERATIONS) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        log(`${solution.id} Awaiting state machine completion...`);
        iterations++;
      }

      if (iterations >= MAX_ITERATIONS) {
        throw new Error('State machine execution timeout');
      }

      const finalContext = getContext();
      const jsonState = currentState
        ? serialize(currentState as any)
        : JSON.stringify(finalContext);

      log(`${solution.id} 📊 Workflow completed successfully`);

      return {
        stateMachine: result,
        context: finalContext,
        jsonState,
        success: true,
        query,
        stepsExecuted: result.length,
      };
    } catch (error) {
      log(`${solution.id} Workflow execution failed: ${error}`);
      throw error;
    }
  };

  return {
    dispatch,
    sendProxy,
    executeWorkflow,
    getCatalog: () => catalog,
    log: () => getLog,
  };
}
