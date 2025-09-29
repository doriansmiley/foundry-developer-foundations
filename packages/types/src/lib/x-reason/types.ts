import { EventObject, StateNode } from "xstate";
import { Message } from "../types";

export type ActionType = {
  type: string;
  value?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  stateId?: string;
};

export type Context = {
  requestId: string;
  status: number;
  machineExecutionId?: string;
  stack?: string[];
  userId?: string,
  solution?: string; // holds the output from the solver which is the solution plan to execute. This is used by individual state functions to assemble their required input parameters
  // Index signature for additional properties
  [key: string]: any;
};

export type MachineEvent = {
  type: "PAUSE_EXECUTION" | "RESUME_EXECUTION" | "RETRY" | "INVOKE" | string;
  payload?: { [key: string]: any };
  stateId?: string;
  data?: { [key: string]: any };
} & EventObject;

export type Transition = Map<string, (context: Context, event: MachineEvent) => boolean>;

export type Task = {
  description: string;
  implementation: (context: Context, event?: MachineEvent, task?: string) => void;
  component?: (context: Context, event?: MachineEvent, task?: string) => any;
  transitions?: Transition;
};

export interface StateMachineConfig {
  [key: string]: StateNode<Context, any, MachineEvent>;
}

export type Solver = {
  // generates the instructions for solving the query
  solve(query: string, solver: Prompt): Promise<string>;
};

export type Programer = {
  // the input is the result of Solver.solve
  // generates the state machine config used by the interpreter
  program(query: string, functionCatalog: string, programmer: Prompt): Promise<StateConfig[]>;
};

export type EvaluationInput = {
  query?: string;
  instructions?: string;
  states: StateConfig[];
  tools?: Map<string, Task>,
};

export type EvaluatorResult = { rating: number; error?: Error, correct?: boolean, revised?: string };

export type Evaluator = {
  // takes the user's query with the generated instructions from the solver
  // and the output machine config from the programmer
  evaluate(input: EvaluationInput, evaluate: Prompt): Promise<EvaluatorResult>;
};

export type AiTransition = {
  // takes the task list returned by the solver, the id of the current state, 
  // and the value returned by the state's implementation function
  // returns true or false
  transition(taskList: string, currentState: string, stateValue: string, aiTransition: Prompt, executionId: string): Promise<string>;
};

export type Prompt = (...args: any[]) => Promise<{ user: string; system: string; }>

export type ReasoningEngine = {
  solver: Solver;
  programmer: Programer;
  evaluator: Evaluator;
  logic: AiTransition;
};

export interface ICallable {
  (...args: any[]): any;
}

export type InterpreterInput = {
  functions: Map<string, Task>;
  states: StateConfig[];
  context?: Context;
};

export type Interpreter = {
  interpret(input: InterpreterInput): void;
};

export type StateConfig = {
  id: string;
  parentId?: string;
  transitions?: Array<{
    on: string;
    target: string;
    cond?: string;
    actions?: string;
  }>;
  type?: "parallel" | "final";
  onDone?: string;
  states?: StateConfig[];
  task?: string;
  includesLogic?: boolean;
};

export interface Result {
  context: string;
  nextState: string;
  planId: string;
  machine: string;
}

export interface Workflow {
  context: string | undefined;
  nextState: string | undefined;
  planId: string;
  machine: string | undefined;
  implementation1: string | undefined;
}

export type Solutions = {
  input: string;
  id: string;
  plan: string;
};

export type SystemStatus = {
  status: number;
  message: string;
};

export type Messages = {
  user?: string;
  system?: string;
}

export type AbstractReviewState = {
  approved: boolean;
  messages?: Messages[];
  file?: string;
}

export type CodeReviewState = {

} & AbstractReviewState;

export type SpecReviewState = {

} & AbstractReviewState;

export type ArchitectureReviewState = {

} & AbstractReviewState;
