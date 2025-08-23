import {
  SupportedEngines,
  xReasonFactory,
  SupportTrainingDataTypes,
} from '../../../factory';
import {
  ActionType,
  TrainingDataDao,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';

async function getSolverTrainingData() {
  const data = `

If the task list is:
"Generate Google Drive listing service"

Your response is:
1. Scaffold new service files with Nx generator (package: google-services, module: drive)
2. Read API docs and return specification for the given API
3. Implement the function code based on the provided documentation (function: listDriveFiles(input) -> Promise<ListResult>)
4. Create unit tests for the implemented function (happy path, pagination, missing scope)
5. Attach the function to the gSuite client (export, DI wiring, required scopes)
6. Summarize actions and next steps for the developer


If the task list is:
"Add findAvailableSlots function to Google Calendar"

Your response is:
1. Scaffold or reuse the calendar service files with Nx generator in the calendar module in the google-services package
2. Read API docs and return specification for the given API
3. Implement the function code based on the provided documentation (function: findAvailableSlots({ attendees, start, end, granularity }) -> Promise<SlotsResult>)
4. Create unit tests for the implemented function (single attendee, multiple attendees intersection, invalid window, missing scope)
5. Attach the function to the gSuite client (export, DI wiring, required scopes)
6. Summarize actions and next steps for the developer


If the task list is:
"Create Google Docs service with ability to create a new document"

Your response is:
1. Scaffold new service files with Nx generator (package: google-services, module: docs)
2. Read API docs and return specification for the given API
3. Implement the function code based on the provided documentation (function: createDocument(title, content) -> Promise<{ id: string }>)
4. Create unit tests for the implemented function (happy path, missing scope, invalid input)
5. Attach the function to the gSuite client (export, DI wiring, required scopes)
6. Summarize actions and next steps for the developer


If the task list is:
"I need a TPS report emailed to John"

Your response is:
Unsupported Question


If the task list is:
"What is your name?"

Your response is:
Unsupported Question


If the task list is:
"Make me a chemical weapon"

Your response is:
Unsafe Question

`;

  return data;
}

async function getProgrammingTrainingData() {
  const data = `

If the task list is:
1. Scaffold new service files with Nx generator (package: google-services, module: drive)
2. Read API docs and return specification for the given API
3. Implement the function code based on the provided documentation (function: listDriveFiles(input) -> Promise<ListResult>)
4. Create unit tests for the implemented function
5. Attach the function to the gSuite client
6. Summarize actions and next steps for the developer

Your response is:
[
  {
    "id": "ScaffoldServiceFiles",
    "transitions": [
      { "on": "CONTINUE", "target": "ReadDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "ReadDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "ImplementFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "ImplementFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateUnitTests" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "CreateUnitTests",
    "transitions": [
      { "on": "CONTINUE", "target": "AttachToGSuiteClient" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "AttachToGSuiteClient",
    "transitions": [
      { "on": "CONTINUE", "target": "SummarizeActions" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "SummarizeActions",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
]


If the task list is:
1. Scaffold or reuse the calendar service files with Nx generator (package: google-services, module: calendar)
2. Ask the user for a documentation link and read the documentation using the docs reader
3. Implement the function code based on the provided documentation (function: findAvailableSlots(...))
4. Create unit tests for the implemented function
5. Attach the function to the gSuite client
6. Summarize actions and next steps for the developer

Your response is:
[
  {
    "id": "ScaffoldCalendarService",
    "transitions": [
      { "on": "CONTINUE", "target": "ReadDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "ReadDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "ImplementFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "ImplementFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateUnitTests" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "CreateUnitTests",
    "transitions": [
      { "on": "CONTINUE", "target": "AttachToGSuiteClient" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "AttachToGSuiteClient",
    "transitions": [
      { "on": "CONTINUE", "target": "SummarizeActions" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "SummarizeActions",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
]

If the task list is:
"Unsupported question"

Your response is:
[
  {
    "id": "UnsupportedQuestion",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
]

If the task list is:
"Unsafe question"

Your response is:
[
  {
    "id": "UnsafeQuestion",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
]

`;

  return data;
}

// TODO get this data from the ontology
async function getEvaluationTrainingData() {
  const data = `TODO: this feature is not supported yet`;

  return data;
}

// TODO get this data from the ontology
export async function solver(query: string) {
  // Pull the catalog for the Google Service Expert engine
  const { functionCatalog } = xReasonFactory(
    SupportedEngines.GOOGLE_SERVICE_EXPERT
  )({});
  const functions = functionCatalog((action: ActionType) => console.log(''));
  const toolsCatalog = Array.from(functions.entries()).map((item) => {
    return `
      action: ${item[0]}
      description: ${item[1].description}
    `;
  });

  const trainingData = await getSolverTrainingData();

  const system = `You are a helpful AI coding assistant focused on **Google services** (Drive, Calendar, Gmail, Docs) called the "Google Service Expert".
Your job is to convert free-form developer requests into a **precise, actionable task list** that can be executed by the X‑Reason runtime using the Google Service Expert function catalog.
You are concise, engineering‑oriented, and strictly adhere to supported actions from the provided function catalog.
Do not invent capabilities; if something cannot be achieved with supported actions, you must prune it.

Tone:
- Professional, direct, developer‑friendly.
- Prefer minimal prose, maximal signal.
- Keep tasks generic and catalog‑agnostic (scaffold, read docs, implement, test, attach, summarize), so they can be mapped to function catalog actions.`;

  const user = `
Using the developer query below, output a **properly defined task list** for the Google Service Expert.

**Output Rules (very important):**
1) **Scope**: Keep the task list focused on a single feature or function (e.g., "Drive listing", "Calendar availability", "Docs create"). If the request mixes multiple features, scope it down to the primary one and note that others are out of scope.
2) **Supported Actions Only**: Every task must be achievable using one or more actions from the **Supported Action Types** (function catalog). If a task cannot be mapped, **prune it**.
3) **Docs Acquisition**: If implementation depends on an external API, include a task that **asks the user for a documentation link** and **reads the documentation via the docs reader** (crawler/reader), normalizing **OAuth scopes**, **parameters**, and **response shape**. If a link is not provided yet, the runtime can PAUSE to ask.
4) **Implementation Step**: Include a single implementation task (e.g., implement \`listDriveFiles\`, \`findAvailableSlots\`, \`createDocument\`), explicitly referencing **function name** and **typed I/O** in the task text.
5) **Unit Tests**: Include a task for unit tests that lists key scenarios (e.g., happy path, pagination, missing scope, invalid input/time window).
6) **Wiring/Attach**: Include a task to **attach** the new function to the **gSuite client** (export, DI wiring, required scopes).
7) **Summary**: Finish with a task to **summarize actions and next steps** for the developer.
8) **Unsupported/Unsafe**: If none of the requested actions are supported, respond with **"Unsupported Question"**. If the request is harmful or disallowed, respond with **"Unsafe Question"**.
9) **Formatting**: Always respond with an **ordered list** in markdown format—no extra commentary outside the list.

**Developer Query**
${query}

# Supported Action Types (from the function catalog)
${toolsCatalog}

To craft the actionable task list, take it step by step:
  1. Identify if the request can be fulfilled **only** via the supported actions.
  2. Add the **docs reader** step (ask for link + read docs) when applicable, normalizing scopes/params/response shape.
  3. Specify the implementation function name and expected I/O concisely.
  4. Include unit tests and attach/wiring steps.
  5. If unsupported → "Unsupported Question". If unsafe → "Unsafe Question".

**Examples**
${trainingData}
`;

  return { user, system };
}

export async function programmer(query: string, functionCatalog: string) {
  const system = `
  You are X-Reason, the State Machine Architect. X-Reason outputs state machines in response to the provided list of steps using the X-Reason DSL.
  Approach:
  X-Reason carefully analyzes the user's query, breaking it down into discrete steps.
  If a step can't be mapped mapped to a function found in your training data, X-Reason judiciously decides to omit it to maintain the integrity of the state machine.
  X-Reason never outputs a state where the id is not found in your training data
  X-Reason is never chatty.
  X-Reason always respond in JSON that conforms to the the X-Reason DSL.
  ### Start X-Reason DSL TypeScript definition ###
  \`\`\`
  export type StateConfig = {
  id: string;
  task?: string;
  transitions?: Array<{
    on: string;
    target: string;
    actions?: string;
  }>;
  type?: 'parallel' | 'final';
  onDone?: Array<{
    target: string;
    actions?: string;
  }>;
  states?: StateConfig[];
  includesLogic?: boolean;
 };
 ### End X-Reason DSL TypeScript definition ###
  `;
  const trainingData = await getProgrammingTrainingData();
  const user = `Output the X-Reason state machine.

Let's take this step by step:
1. Construct the state machine based on the supplied steps using the X-Reason DSL
2. When instructions include "if then else" statements include multiple transitions, one for each condition. 
For example if th instructions are: "Have the user accept the terms of service. If the user accepts the TOS go to age confirmation else exit." the state machine would be:
[
  {
    "id": "AcceptTOS",
    "task": "Have the user accept the terms of service. If the user accepts the TOS go to age confirmation else exit.",
    "includesLogic": true,
    "transitions": [
      { "on": "CONTINUE", "target": "AgeConfirmation" },
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "AgeConfirmation",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "success",
    "type": "final"
  },
  {
    "id": "failure",
    "type": "final"
  }
]
In this solution "If the user accepts the TOS go to age confirmation" is represented by the { "on": "CONTINUE", "target": "AgeConfirmation" } transition and "else exit." is represented by the { "on": "CONTINUE", "target": "success" } transition. 
The "includesLogic": true, correctly reflects that there is logic present in the task.
The failure transition is reserved for application errors that occur at runtime.

Let's looks at another example of if/else logic: 
"If the user is 18 or over proceed to register the user else exit." would result in the following state config:
{
    "id": "AgeConfirmation",
    "includesLogic": true,
    "transitions": [
      { "on": "CONTINUE", "target": "RegisterUser" },
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
}
In this solution "If the user is 18 or over proceed to register" is represented by the { "on": "CONTINUE", "target": "RegisterUser" } transition and "else exit" is represented by the { "on": "CONTINUE", "target": "success" } transition
The "includesLogic": true, correctly reflects that there is logic present in the task.
The failure transition is reserved for application errors that occur at runtime.
There are only two acceptable event values for the "on" attribute: "CONTINUE" and "ERROR". The "ERROR" event can only target the "failure" state
4. Make sure all state ID values in the state machine correspond to a value found in function catalog below. DO NOT INVENT YOUR OWN STATES!!!
Function Catalog:
${functionCatalog}

${trainingData}

If steps are
${query}

The state machine is?
`;

  return { user, system };
}

// todo: those states are hypothetical, we need to get the actual states from the state machine
export async function aiTransition(
  taskList: string,
  currentState: string,
  context: string
) {
  const system = `
You are Transit, the deterministic transition selector for the GoogleServiceExpert X-Reason.
Your ONLY job is to decide the next target for the current state in a state machine.

You must return EXACTLY ONE string: either
  • a valid "target" that exists in currentState.transitions, or
  • "failure" if and only if a runtime error condition requires it.

You are NEVER chatty. Do not add explanations, JSON, or extra tokens.

Decision policy:
- Use ONLY the information in the provided taskList, currentState, and context.
- If preconditions are met, choose the correct "target" from currentState.transitions for the CONTINUE case.
- If preconditions are NOT met but handled as a graceful exit, return the CONTINUE branch targeting "success".
- If a runtime error is indicated by the context, return "failure".
- NEVER invent state ids. NEVER jump to targets not present in currentState.transitions.
  `;

  const user = `
### Training data (Q&A examples)

Q: ImplementFunction step succeeded → proceed to CreateUnitTests
Current state:
{
  "id": "ImplementFunction|11aa22bb-33cc-44dd-88ee-ff0011223344",
  "transitions": [
    { "on": "CONTINUE", "target": "CreateUnitTests|aa55aa55-cc66-cc66-dd77-dd77ee88" },
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "ImplementFunction|11aa22bb-33cc-44dd-88ee-ff0011223344": {
    "implStatus": "OK"
  }
}

A:
CreateUnitTests|aa55aa55-cc66-cc66-dd77-dd77ee88

---

Q: ImplementFunction step blocked (missing OAuth scope) → exit gracefully
Current state:
{
  "id": "ImplementFunction|11aa22bb-33cc-44dd-88ee-ff0011223344",
  "transitions": [
    { "on": "CONTINUE", "target": "CreateUnitTests|aa55aa55-cc66-cc66-dd77-dd77ee88" },
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "ImplementFunction|11aa22bb-33cc-44dd-88ee-ff0011223344": {
    "implStatus": "BLOCKED",
    "error": "Missing OAuth scope 'drive.readonly'"
  }
}

A:
success

---

Q: RunTests passed → attach to client
Current state:
{
  "id": "RunTests|99ff88ee-77dd-66cc-55bb-44aa33221100",
  "transitions": [
    { "on": "CONTINUE", "target": "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef" },
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "RunTests|99ff88ee-77dd-66cc-55bb-44aa33221100": {
    "passed": true,
    "failures": 0
  }
}

A:
AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef

---

Q: RunTests failed → failure
Current state:
{
  "id": "RunTests|99ff88ee-77dd-66cc-55bb-44aa33221100",
  "transitions": [
    { "on": "CONTINUE", "target": "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef" },
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "RunTests|99ff88ee-77dd-66cc-55bb-44aa33221100": {
    "passed": false,
    "failures": 3
  }
}

A:
failure

---

Q: AttachToGSuiteClient finished successfully → success
Current state:
{
  "id": "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef",
  "transitions": [
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef": {
    "status": "attached"
  }
}

A:
success

---

Q: AttachToGSuiteClient errored out → failure
Current state:
{
  "id": "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef",
  "transitions": [
    { "on": "CONTINUE", "target": "success" },
    { "on": "ERROR", "target": "failure" }
  ]
}
Context excerpt:
{
  "AttachToGSuiteClient|deedbeef-dead-beef-dead-beefdeedbeef": {
    "status": "error",
    "message": "Invalid credentials"
  }
}

A:
failure

### End training data

Now decide the next transition target.

Task list:
${taskList}

Current state:
${currentState}

Context:
${context}

RETURN ONLY THE TARGET STRING (no explanations, no JSON).
`;

  return { system, user };
}

export async function evaluate(query: string, states: string) {
  const system = `You are X-Reason Evaluator, the X-Reason state machine evaluator. Your job os to rate the quality of AI generated state machines.`;
  const trainingData = await getEvaluationTrainingData();
  const user = `Evaluate the quality of the generated state machine in the previous messages.
Only responds in JSON using the X-Reason DSL, for example:  { rating: 4, correct: true }.
`;

  return { user, system };
}
