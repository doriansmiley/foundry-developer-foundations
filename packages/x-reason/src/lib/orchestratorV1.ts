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
  LoggingService,
  MachineDao,
  MachineExecutions,
  TYPES,
  StateConfig,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';


export async function getState(
  solution: Solutions,
  forward = true,
  workflow?: Record<string, any>,
  xreason: SupportedEngines = SupportedEngines.COMS
) {
  const { programmer, aiTransition, evaluate, functionCatalog } = xReasonFactory(xreason)({});
  let currentState: State<Context, MachineEvent> | undefined;

  const dispatch = (action: ActionType) => {
    console.log(`route dispatch callback called`);
    switch (action.type) {
      case "SET_STATE":
        currentState = action.value?.currentState as State<
          Context,
          MachineEvent
        >;
        break;
    }
  };

  const sendProxy = (action: ActionType) => {
    send(action, action.payload?.stateId as string);
  };

  const functions = functionCatalog(sendProxy);

  const toolsCatalog = Array.from(functions.entries()).map((item) => {
    return [item[0], { description: item[1].description }];
  });

  const { getLog, log } = container.get<LoggingService>(TYPES.LoggingService);

  // retrieve previous execution if there was one
  const machineDao = container.get<MachineDao>(TYPES.MachineDao);
  let execution: undefined | MachineExecutions = undefined;

  try {
    execution = await machineDao.read(solution.id);
  } catch (e) {
    const error = (e as Error);

    log(solution.id, `machineDao.read returned the following error:\n${error.message}\n${error.stack}`);
    console.log(e);
  }

  const machine: StateConfig[] =
    execution && execution.machine ? JSON.parse(execution.machine) : undefined;
  const stateDefinition =
    execution && execution.state ? JSON.parse(execution.state) : undefined;
  // setup a default context
  let inputContext: Context = {
    requestId: uuidv4(),
    machineExecutionId: solution.id,
    status: 0,
    solution: sanitizeJSONString(solution.plan),
    stack: [],
    ...workflow,//capture any incoming updates from the UI Layer
  };

  // if a state definition is defined we want to use it and transfer the updated state to it
  if (stateDefinition) {
    inputContext = stateDefinition.context;
    // Map the values passed by the consumer onto the context.
    if (workflow) {
      const keys = Object.keys(workflow);
      keys.forEach((key) => {
        // we use destructing to preserve existing values not in the workflow params
        stateDefinition.context[key] = { ...stateDefinition.context[key], ...workflow[key] };
      });
    }
  }

  // get the last state visited in the stack to find where we left off on the previous run
  //stateDefinition?.context?.stack?.[stateDefinition.context.stack.length-1]
  const savePoint =
    stateDefinition?.context?.stack?.[
    stateDefinition?.context?.stack.length - 1
    ];
  const previousState =
    stateDefinition?.context?.stack?.[
    stateDefinition?.context?.stack.length - 2
    ];

  if (forward && savePoint && stateDefinition && savePoint !== stateDefinition.value) {
    log(solution.id, `resetting stateDefinition.value from ${stateDefinition.value} to ${savePoint}`);
    console.log(
      `resetting stateDefinition.value from ${stateDefinition.value} to ${savePoint}`
    );

    stateDefinition.value = savePoint;
  } else if (
    !forward &&
    previousState &&
    stateDefinition &&
    previousState !== stateDefinition.value
  ) {
    console.log(
      `resetting stateDefinition.value from ${stateDefinition.value} to ${previousState}`
    );
    log(solution.id, `resetting stateDefinition.value from ${stateDefinition.value} to ${previousState}`);

    stateDefinition.value = previousState;
    // remove the last element of the stack
    stateDefinition?.context?.stack?.pop();
  }

  if (!forward && stateDefinition) {
    // stateDefinition must be defined in these cases or you should get an error
    const targetState: State<Context, MachineEvent> = State.create<Context, MachineEvent>(stateDefinition);

    // if we are not moving forward we do not want to rerun the machine or effect its state
    // we just want to return the previous state and let the consumer execute by calling next
    const context = targetState.context;
    const jsonState = JSON.stringify(targetState);

    log(solution.id, `moving backward, returning previous state of ${targetState.value}`);
    console.log(`moving backward, returning previous state of ${targetState.value}`);

    return {
      stateMachine: machine,
      // hard code the evaluation result since this is for a previous execution
      evaluationResult: { rating: 5, correct: true },
      context,
      jsonState,
    };
  }

  let startingState: State<Context, MachineEvent> | undefined = stateDefinition ? State.create<Context, MachineEvent>(stateDefinition) : undefined;

  const programmedState = machine?.find(
    (value) => value.id === startingState?.value
  );

  if (stateDefinition && startingState) {
    startingState = State.create<Context, MachineEvent>(stateDefinition)

    if (programmedState?.includesLogic) {
      // Use an LLM to figure out what the next state should be based on the login in the last list and the current state of the machine
      // Structured outputs could be very useful here to restrict acceptable state output values to a enum based on the functions catalog id values
      // not sure if Foundry supports structured outputs yet or not
      const nextState = await engine.logic.transition(
        solution.plan,
        JSON.stringify(programmedState),
        JSON.stringify(stateDefinition.context),
        aiTransition,
        solution.id
      );

      log(solution.id, `The AI transition returned the target state of: ${nextState}`);
      console.log(`resetting the starting state to: ${nextState}`);
      // Create a new State object with the updated value
      startingState = State.create<Context, MachineEvent>({
        value: nextState, // The new state value returned by the AI model
        context: stateDefinition.context, // Preserve the existing context
        history: startingState.history, // Preserve history if needed
        actions: startingState.actions, // Preserve actions if needed
        activities: startingState.activities, // Preserve activities if needed
        meta: startingState.meta, // Preserve meta if needed
        events: startingState.events, // Preserve events if needed
        configuration: startingState.configuration, // Preserve configuration if needed
        // Required properties for StateConfig
        _event: startingState._event || { type: '' }, // Default _event if not available
        _sessionid: startingState._sessionid || null, // Default _sessionid if not available
        transitions: startingState.transitions || [], // Default transitions if not available
        children: startingState.children || {}, // Default children if not available
      });
    }
  }

  // generate the program
  const result: StateConfig[] = machine
    ? machine
    : await engine.programmer.program(
      solution.plan,
      JSON.stringify(Array.from(toolsCatalog.entries())),
      programmer
    );
  // evaluate the generated program. Currently, this just checks if the machine compiles
  // in the future we will use specially trained evaluation models
  const evaluationResult = await engine.evaluator.evaluate(
    {
      query: `${solution.plan}\n${result}`,
      states: result,
      tools: functions,
    },
    evaluate
  );
  if (!evaluationResult.correct) {
    throw (
      evaluationResult.error ||
      new Error("The provided solution failed evaluation")
    );
  }

  const { done, start, send, getContext, serialize } = headlessInterpreter(
    result,
    functions,
    dispatch,
    inputContext,
    startingState,
    // if the programmed state includes logic we need to manually trigger state execution
    programmedState?.includesLogic ?? false
  );

  log(solution.id, `calling start on the machine with starting state of: ${startingState?.value}`);
  console.log(`calling start on the machine with starting state of: ${startingState?.value}`);

  start();

  if (stateDefinition && startingState && (programmedState?.includesLogic ?? false) === false) {
    // manually advance the machine if we did not use an LLM to advance the machine to a target state
    // if we don't do this the machine will stay stuck on the current state 
    send({ type: 'CONTINUE' });
  }

  let iterations = 0;
  // this effectively acts as a timeout. Be sure to adjust if you have long running functions in your states!
  const MAX_ITERATIONS = 60;
  while (!done() && iterations < MAX_ITERATIONS) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    log(solution.id, `awaiting results`);
    console.log("awaiting results");

    iterations++;
  }

  if (iterations >= MAX_ITERATIONS) {
    console.warn("Exceeded maximum iterations while awaiting results.");
  }

  const context = getContext();
  const jsonState = serialize(currentState);

  return {
    stateMachine: result,
    evaluationResult,
    context,
    jsonState,
    logs: getLog(solution.id),
  };
}
