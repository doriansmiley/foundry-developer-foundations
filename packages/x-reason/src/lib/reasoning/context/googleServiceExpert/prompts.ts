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

export async function getSolverTrainingData() {
  const data = `

If the query is:
"Inside google-service package create new function named driveListFiles. Docs: https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list. Clients code sits in packages/services/google/src/lib/gsuiteClient.ts and packages/services/google/src/lib/gsuiteClient.v2.ts, README.md is in packages/services/google/README.md."

Your response is:
1. Scaffold the google drive service files with Nx generator in the drive module in the google-services package under packages/services/google. Create or reuse a drive directory for the module and a delegates directory for API calls.
2. Read the Google Drive Files API documentation from the https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list and return a normalized specification that lists the list endpoint, the required OAuth scopes for read-only listing, the request parameters including pageSize and q, and the response shape including files and nextPageToken.
3. Implement an exported function named listDriveFiles in the drive module. The function accepts an input object with optional fields pageSize and q and returns a promise that resolves to a list result. Place the implementation in packages/services/google/src/lib/delegates/drive/listDriveFiles.ts and ensure it uses the official googleapis SDK client.
4. Create unit tests for the implemented function that cover the happy path, pagination using nextPageToken, and the case where the required authorization scope is missing. Place the tests under packages/services/google/src/lib/delegates/drive/__tests__/listDriveFiles.spec.ts and run them with nx test google-services. Document how to run only the created test file by using nx test google-services --testFile=packages/services/google/src/lib/delegates/drive/__tests__/listDriveFiles.spec.ts.
5. Attach the new function to the gSuite client by exporting it from packages/services/google/src/lib/gsuiteClient.ts. Update the makeGSuiteClient method to expose a getDriveClient or a drive namespace and add the Google Drive read-only scope to the service account scopes. Confirm that the scope set includes https://www.googleapis.com/auth/drive.readonly and that the google.auth.GoogleAuth instance for drive uses this scope. Provide a short note indicating where to wire the function into the returned client object so callers can invoke listDriveFiles.
6. Summarize the actions performed and the next steps for the developer. Include a reminder to add or rotate the service account token so Google Drive access is authorized and include the exact Nx command to run the tests. Mention any required environment variables for service account loading.

If the task list is:
"Inside google-service package Function getAvailableMeetingTimes already exists. User wants to create new one. Docs: https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query. Clients code sits in packages/services/google/src/lib/gsuiteClient.ts and packages/services/google/src/lib/gsuiteClient.v2.ts, README.md is in packages/services/google/README.md."

Your response is:
1. Scaffold or reuse the google calendar service files with Nx generator in the calendar module in the google-services package under packages/services/google. Ensure there is a delegates directory and a file to house availability logic.
2. Read the Google Calendar FreeBusy API documentation from the https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query and return a normalized specification that lists the freeBusy endpoint, the required OAuth scopes for calendar read and freebusy access, the request parameters including timeMin, timeMax, and items with attendee calendars, and the response shape for busy windows.
3. Implement an exported function named findAvailableSlots in the calendar module. The function accepts an input object with attendees, start, end, and granularity fields and returns a promise with a slots result that expresses free windows. Place the implementation in packages/services/google/src/lib/delegates/calendar/findAvailableSlots.ts and ensure it uses the googleapis calendar.v3 client freeBusy.query call.
4. Create unit tests for the implemented function that cover a single attendee, multiple attendees where intersection is required, an invalid time window error, and the case where the required authorization scope is missing. Place the tests under packages/services/google/src/lib/tests/delegates/findAvailableSlots.test.ts and run them with nx test google-service. Document how to run only the created test file by using nx test google-service --testFile=packages/services/google/src/lib/tests/delegates/findAvailableSlots.test.ts.
5. Attach the new function to the gSuite client by exporting it from packages/services/google/src/lib/gsuiteClient.ts and packages/services/google/src/lib/gsuiteClient.v2.ts if both are used. Update the makeGSuiteClient method to include calendar scopes required for freebusy and reading events. Confirm that the scope set includes https://www.googleapis.com/auth/calendar.readonly and https://www.googleapis.com/auth/calendar.freebusy and that the client exposes a calendar namespace or a direct function export that returns available slots.
6. Summarize the actions performed and the next steps for the developer. Include the exact Nx commands to run unit tests and a reminder to verify service account delegation for each attendee domain if domain wide delegation is required.

If the task list is:
"Inside google-service package create new function named createDocument. Docs: https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/create. Clients code sits in packages/services/google/src/lib/gsuiteClient.ts and packages/services/google/src/lib/gsuiteClient.v2.ts, README.md is in packages/services/google/README.md."

Your response is:
1. Scaffold the google docs service files with Nx generator in the docs module in the google-services package under packages/services/google. Create a docs directory for the module and a delegates directory for API calls.
2. Read the Google Docs API documentation from the https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/create and return a normalized specification that lists the create endpoint, the required OAuth scopes for document creation, the request parameters including title and optional content via batchUpdate, and the response shape that includes the created document id.
3. Implement an exported function named createDocument in the docs module. The function accepts a title and optional content and returns a promise that resolves with the document id. Place the implementation in packages/services/google/src/lib/delegates/docs/createDocument.ts and ensure it uses the googleapis docs.v1 client and applies batchUpdate when content is provided.
4. Create unit tests for the implemented function that cover the happy path of creating a document with a title, the missing scope error path, and invalid input such as an empty title. Place the tests under packages/services/google/src/lib/tests/delegates/createDocument.test.ts and run them with nx test google-service. Document how to run only the created test file by using nx test google-service --testFile=packages/services/google/src/lib/tests/delegates/createDocument.test.ts.
5. Attach the new function to the gSuite client by exporting it from packages/services/google/src/lib/gsuiteClient.ts. Update the makeGSuiteClient method to include the Google Docs scope for creation and ensure the returned client exposes a docs namespace or the createDocument function. Confirm that the scope set includes https://www.googleapis.com/auth/documents.
6. Summarize the actions performed and the next steps for the developer. Include the exact Nx commands for unit testing and a reminder to add the documents scope to the service account configuration and to verify that the subject user has permission to create documents in the target domain.

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
1. Scaffold or reuse the google drive service files with Nx generator in the drive module in the google-services package
2. Read the Google Drive Files API documentation and return a normalized specification including endpoints, required scopes, request parameters, and the response shape
3. Implement the function code based on the provided documentation as a function named listDriveFiles which accepts an input object with optional parameters pageSize and q and returns a promise with the list result
4. Create unit tests for the implemented function that cover the happy path, pagination, and the case where the required scope is missing
5. Attach the new function to the gSuite client by exporting it and including the required scopes
6. Summarize the actions performed and the next steps for the developer

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
1. Scaffold or reuse the google calendar service files with Nx generator in the calendar module in the google-services package
2. Read the Google Calendar FreeBusy API documentation and return a normalized specification including endpoints, required scopes, request parameters, and the response shape
3. Implement the function code based on the provided documentation as a function named findAvailableSlots which accepts an input object with attendees, start, end, and granularity fields and returns a promise with the slots result
4. Create unit tests for the implemented function that cover a single attendee, multiple attendees with intersection, an invalid time window, and the case where the required scope is missing
5. Attach the new function to the gSuite client by exporting it, and including the required scopes
6. Summarize the actions performed and the next steps for the developer

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
