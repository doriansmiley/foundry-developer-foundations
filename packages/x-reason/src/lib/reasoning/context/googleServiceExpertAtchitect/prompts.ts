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
\`\`\`markdown
- **Instruction**: "create sending email function with ability to attach files from google drive. New function name should be \`sendEmailWithAttachments\`"

- **Design spec**
  - **Overview**: Implement \`sendEmailWithAttachments\` delegate using \`googleapis@149.0.0\` to send a single-template email with attachments, including files from Google Drive. Expose it only via \`gsuiteClient.ts\` and scaffold tests per package conventions. This will be a new function, separate from the existing \`sendEmail\` function.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: \`googleapis@149.0.0\` preferred; REST fallback allowed. Use the Drive API to fetch the file content if a Drive file ID is provided.
    - **Exposure**: Only through \`gsuiteClient.ts\`
    - **Package conventions**:
      - Delegates under \`src/lib/delegates/\`
      - Tests under \`src/lib/tests/\`
      - Public API exposed via \`gsuiteClient.ts\`
  - **Auth scopes required** (must be added in \`gsuiteClient.ts\` mail and drive scopes):
    - \`https://mail.google.com/\`
    - \`https://www.googleapis.com/auth/gmail.modify\`
    - \`https://www.googleapis.com/auth/gmail.compose\`
    - \`https://www.googleapis.com/auth/gmail.send\`
    - \`https://www.googleapis.com/auth/drive.readonly\` (for fetching Drive file content)
  - **External API references**:
    - \`users.messages.send\` — \`https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send\`
    - \`files.get\` (Drive API) - \`https://developers.google.com/drive/api/v3/reference/files/get\`
  - **Inputs and outputs**
    - **Input type**: \`EmailContextWithAttachments\`
      \`\`\`typescript
      interface EmailAttachment {
        filename: string;
        contentType: string;
        content?: string; // base64 encoded
        driveFileId?: string; // Google Drive File ID (optional) - if present, content is ignored and fetched from Drive
      }

      interface EmailContextWithAttachments {
        from: string;
        recipients: string | string[];
        subject: string;
        message: string; //HTML allowed; plain text is auto-derived
        attachments?: EmailAttachment[]; // Optional attachments
      }
      \`\`\`
      - \`from: string\` (required)
      - \`recipients: string | string[]\` (required)
      - \`subject: string\` (required)
      - \`message: string\` (required; HTML allowed; plain-text auto-derived)
      - \`attachments?: EmailAttachment[]\` (optional; array of attachment objects)
        - \`filename: string\` (required)
        - \`contentType: string\` (required)
        - \`content?: string\` (optional; base64 encoded content of the attachment. Required if \`driveFileId\` is not present)
        - \`driveFileId?: string\` (optional; Google Drive file ID. If present, the file content will be fetched from Google Drive, and the content property is ignored.)
    - **Output type**: \`SendEmailOutput\`
      - \`id: string\`, \`threadId: string\`, \`labelIds?: string[]\`
  - **Functional behavior**
    - Validate \`from\`, \`recipients\`, \`subject\`, and \`message\`.
    - For each attachment:
      - If \`driveFileId\` is present:
        - Fetch the file content from Google Drive using the Drive API (\`files.get\` with \`alt=media\`).
        - Base64 encode the file content.
      - Otherwise:
        - Use the provided \`content\` (ensure it is base64 encoded).
      - Construct a \`multipart/mixed\` MIME message:
        - The first part is the \`multipart/alternative\` body with \`text/plain\` (derived) and \`text/html\` (provided + footer).
        - Subsequent parts are the attachments, each with its \`filename\`, \`contentType\`, and \`content\` (base64 encoded).
    - If no \`attachments\` are present, construct \`multipart/alternative\` MIME as in the original \`sendEmail\` function.
    - Base64url encode the complete MIME message and call \`gmail.users.messages.send({ userId: 'me', requestBody: { raw } })\`.
    - Return \`{ id, threadId, labelIds }\`.
  - **Error handling**
    - Throw on invalid input or if the Gmail/Drive response is missing \`id\` and \`threadId\`.
    - Log minimal context; include \`.response.data\` when present; rethrow errors.
    - Validate the structure and encoding of attachments.
    - Handle errors during Drive file fetching gracefully.
  - **Security and privacy**
    - Never log credentials.
    - Avoid logging full message content and attachment content.
    - When fetching from Drive, ensure the user has the necessary permissions to access the file.
  - **Acceptance criteria**
    - Returns \`{ id, threadId }\` on success.
    - The MIME message is well-formed and properly encoded.
    - Attachments are correctly included in the email, whether provided directly or fetched from Google Drive.
    - Exposed only through \`gsuiteClient.ts\`.
  - **Usage (via client)**

\`\`\`typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

await client.sendEmailWithAttachments({
  from: 'user@company.com',
  recipients: ['team@company.com'],
  subject: 'Weekly Update with Attachments',
  message: '<p>Here is this week’s summary with attachments…</p>',
  attachments: [
    {
      filename: 'summary.pdf',
      contentType: 'application/pdf',
      content: 'JVBERi0xLjIgCj...' // Base64 encoded PDF content
    },
    {
      filename: 'data.csv',
      contentType: 'text/csv',
      content: 'column1,column2\nvalue1,value2' // Base64 encoded CSV content
    },
    {
      filename: 'report.docx',
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      driveFileId: 'DRIVE_FILE_ID' // Fetch content from Google Drive
    }
  ]
});
\`\`\`
"

Your response is:
1. Search and confirm documentations and auth scopes
2. Ask user to approve design spec or refine plan
3. Scaffold new function files
4. Create unit tests based on design spec
5. Implement function to pass tests
6. Ask user to approve the function implementation
7. Expose function via latest version of the gSuiteClient

If the query is:
"I need a TPS report emailed to John"

Your response is:
Unsupported Question

If the query is:
"What is your name?"

Your response is:
Unsupported Question

If the query is:
"Make me a chemical weapon"

Your response is:
Unsafe Question

`;
  return data;
}

async function getProgrammingTrainingData() {
  const data = `

If the task list is:
1. Confirm user intent to "create" new function "listDriveFiles".
2. Search for the the documentation
3. Confirm detailed implementation plan
4. Scaffold new function files
5. Read provided documentation
6. Implement the function
7. Create unit tests for the implemented function
8. Expose function via latest version of the gSuiteClient

Your response is:
[
  {
    "id": "ConfirmUserIntent",
    "transitions": [
      { "on": "CONTINUE", "target": "SearchForDocumentation" },
       {
        "on": "PAUSE",
        "target": "pause"
      },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Confirm user intent to \"create\" new function \"listDriveFiles\" in module \"drive\".",
  },
  {
    "id": "SearchForDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "ConfirmDetailedImplementationPlan" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Search for the the documentation",
  },
  {
    "id": "ConfirmDetailedImplementationPlan",
    "transitions": [
      { "on": "CONTINUE", "target": "ScaffoldNewFunctionFiles" },
       {
        "on": "PAUSE",
        "target": "pause"
      },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Confirm detailed implementation plan",
  },
  {
    "id": "ScaffoldNewFunctionFiles",
    "transitions": [
      { "on": "CONTINUE", "target": "ReadProvidedDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Scaffold new function files using Nx generators",
  },
  {
    "id": "ReadProvidedDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "ImplementTheFunction" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Read provided documentation",
  },
  {
    "id": "ImplementTheFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateUnitTestsForTheFunction" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Implement the function",
  },
  {
    "id": "CreateUnitTestsForTheFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Create unit tests for the implemented function",
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
1. Confirm with user intent to "modify" function "sendEmail" in module "gmail".
2. Search for the Gmail API documentation which allows to send email.
3. Search codebase for the "sendEmail" function references and ask user if he want to proceed with the modification or would like to create v2 version of the function.
4. Generate grounded prompt for Google Service Expert AI agent.

Your response is:
[
  {
    "id": "SetIntentAndFunctionName",
    "transitions": [
      { "on": "CONTINUE", "target": "SearchForDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Confirm with user intent to \"modify\" function \"sendEmail\" in module \"gmail\"",
  },
  {
    "id": "SearchForDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "SearchInCodebase" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Search for the Gmail API documentation which allows to send email.",
  },
  {
    "id": "SearchInCodebase",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateGroundedPrompt" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Search codebase for the \"sendEmail\" function references and ask user if he want to proceed with the modification or would like to create v2 version of the function.",
  },
  {
    "id": "CreateGroundedPrompt",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Generate grounded prompt for Google Service Expert AI agent.",
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
1. Confirm with user intent to "create" new function "listDriveFiles" in module "drive".
2. Search for the Google Drive API documentation links which allows to list drive files.
3. Build grounded prompt for Google Service Expert AI agent.

Your response is:
[
  {
    "id": "SetIntentAndFunctionName",
    "transitions": [
      { "on": "CONTINUE", "target": "SearchForDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Confirm with user intent to \"create\" new function \"listDriveFiles\" in module \"drive\"",
  },
  {
    "id": "SearchForDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateGroundedPrompt" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Search for the Google Drive API documentation which allows to list drive files.",
  },
  {
    "id": "CreateGroundedPrompt",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Build grounded prompt for Google Service Expert AI agent.",
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
1. Tell user that "sendEmail" function already exists under given path.
2. Explain the functionality of current function.
3. Ask user if he want to proceed with the modification or would like to create new sendEmailV2 function.
4. Search for the Gmail API documentation which allows to send email.
5. Build grounded prompt for Google Service Expert AI agent.

[
  {
    "id": "FunctionAlreadyExists",
    "transitions": [
      { "on": "CONTINUE", "target": "ExplainFunctionality" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Tell user that \"sendEmail\" function already exists under given path.",
  },
  {
    "id": "ExplainFunctionality",
    "transitions": [
      { "on": "CONTINUE", "target": "SetIntentAndFunctionName" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Explain the functionality of current function.",
  },
  {
    "id": "SetIntentAndFunctionName",
    "transitions": [
      { "on": "CONTINUE", "target": "SearchForDocumentation" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Ask user if he want to proceed with the modification or would like to create new sendEmailV2 function.",
  },
  {
    "id": "SearchForDocumentation",
    "transitions": [
      { "on": "CONTINUE", "target": "CreateGroundedPrompt" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Search for the Gmail API documentation which allows to send email.",
  },
  {
    "id": "CreateGroundedPrompt",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ],
    "task": "Build grounded prompt for Google Service Expert AI agent.",
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
    SupportedEngines.GOOGLE_SERVICE_EXPERT_ARCHITECT
  )({});
  const functions = functionCatalog((action: ActionType) => console.log(''));
  const toolsCatalog = Array.from(functions.entries()).map((item) => {
    return `
      action: ${item[0]}
      description: ${item[1].description}
    `;
  });

  const trainingData = await getSolverTrainingData();

  const system = `You are a helpful AI coding assistant focused on **Google services** (Drive, Calendar, Gmail, Docs) called the "Google Service Expert Architect".
Your job is to convert free-form developer requests into a **precise, actionable task list** that can be executed by the X‑Reason runtime using the Google Service Expert Architect function catalog.
You are concise, engineering‑oriented, and strictly adhere to supported actions from the provided function catalog.
Do not invent capabilities; if something cannot be achieved with supported actions, you must prune it.

Tone:
- Professional, direct, developer‑friendly.
- Prefer minimal prose, maximal signal.
- Keep tasks generic and catalog‑agnostic (scaffold, read docs, implement, test, attach, summarize), so they can be mapped to function catalog actions.`;

  const user = `
Using the developer query below, output a **properly defined task list** for the Google Service Expert Architect.

**Output Rules (very important):**
1) **Scope**: Keep the task list focused on feature or functions (e.g., "Drive listing", "Calendar availability", "Docs create"). Request can mix multiple features.
2) **Supported Actions Only**: Every task must be achievable using one or more actions from the **Supported Action Types** (function catalog). If a task cannot be mapped, **prune it**.
3) **Docs Acquisition**: If implementation depends on an external API, search for the documentation for the given API.
4) **Codebase search**: If task is to modify existing function, search in codebase for the function references to find all usages of the function.
5) **Confirmation**: Confirm the implementation plan with the user.
6) **Implementation**: Implement function based on the detailed plan and grounded data.
7) **Unsupported/Unsafe**: If none of the requested actions are supported, respond with **"Unsupported Question"**. If the request is harmful or disallowed, respond with **"Unsafe Question"**.
8) **Formatting**: Always respond with an **ordered list** in markdown format—no extra commentary outside the list.
9) **Pause**: If you need to pause the execution to ask user for additional information, respond with **"Pause"**.

**Developer Query**
${query}

# Supported Action Types (from the function catalog)
${toolsCatalog}

To craft the actionable task list, take it step by step:
  1. Always confirm user intent as a first step what exactly user want to implement
  2. Add the **docs search** step when applicable.
  3. Add the **codebase search** step when applicable.
  4. Add the **confirmation** step when applicable.
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
