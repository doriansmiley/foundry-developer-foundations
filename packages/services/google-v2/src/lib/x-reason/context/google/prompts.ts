// TODO: Implement training data retrieval
async function getProgrammingTrainingData() {
  // Scaffolding - implement actual training data retrieval
  const data = `  
  If the task list is:
  1. Create Google Drive read function

  Your response is:
  [
  {
    "id": "listCapabilities",
    "transitions": [
      { "on": "CONTINUE", "target": "createFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "createFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "implementFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "implementFunction",
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

async function getSolverTrainingData() {
  // Scaffolding - implement actual training data retrieval
  const data = `
  // TODO: Add solver training examples here
  `;

  return data;
}

export async function programmer(query: string, functionCatalog: string) {
  const system = `
  You are X-Reason, the State Machine Architect. X-Reason outputs state machines in response to the provided list of steps using the X-Reason DSL.
  Approach:
  X-Reason carefully analyzes the user's query, breaking it down into discrete steps.
  If a step can't be mapped to a function found in your training data, X-Reason judiciously decides to omit it to maintain the integrity of the state machine.
  X-Reason never outputs a state where the id is not found in your training data
  X-Reason is never chatty.
  X-Reason always respond in JSON that conforms to the X-Reason DSL.
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
For example if the instructions are: "List capabilities first. If functions exist, update client else create new function." the state machine would be:
[
  {
    "id": "listCapabilities",
    "transitions": [
      { "on": "CONTINUE", "target": "updateClient" },
      { "on": "CONTINUE", "target": "createFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "updateClient",
    "transitions": [
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "createFunction",
    "transitions": [
      { "on": "CONTINUE", "target": "implementFunction" },
      { "on": "ERROR", "target": "failure" }
    ]
  },
  {
    "id": "implementFunction",
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
The failure transition is reserved for application errors that occur at runtime.

There are only two acceptable event values for the "on" attribute: "CONTINUE" and "ERROR". The "ERROR" event can only target the "failure" state
3. Make sure all state ID values in the state machine correspond to a value found in function catalog below. DO NOT INVENT YOUR OWN STATES!!!
Function Catalog:
${functionCatalog}

${trainingData}

If steps are
${query}

The state machine is?
`;

  return { user, system };
}

export async function solver(query: string) {
  const trainingData = await getSolverTrainingData();

  const system = `
  You are a Google Services problem solver that determines naming, domains, and existing capabilities.

  Your job is to analyze user requests and determine:
  1. Function names (prefer descriptive, avoid conflicts with existing)
  2. Domain folder (calendar, gmail, drive, docs, sheets, etc.)
  3. Whether clients exist or need creation
  4. Prefer creating NEW functions over modifying existing ones

  Based on the listCapabilities output, decide the best approach for implementation.
  Always prefer duplication over modification to avoid breaking existing functionality.
  
  Training examples:
  ${trainingData}
  `;

  const user = `
  Problem: ${query}
  
  Analyze this request and determine:
  - Suggested function name (e.g., findAvailableTimeV2)
  - Domain folder for organization
  - Whether existing clients can be used or new ones needed
  - Any naming conflicts to avoid
  
  Base decisions on capabilities that will be discovered via listCapabilities.
  `;

  return { system, user };
}

export async function aiTransition(planText: string) {
  const system = `
  You are a Google Services task orchestrator that converts plans into ordered function calls.

  Convert the plan into an ordered sequence of catalog calls:
  1. listCapabilities (always first)
  2. createFunction (if new function needed) 
  3. implementFunction (after successful scaffold)
  4. createClient (if new client needed)
  5. implementClient (after successful client scaffold)
  6. updateClient (to expose functions via existing clients)

  Each step should include checkpoint validation (cp:function:created, cp:function:implemented, etc.).
  
  Return a JSON array with the exact function names and parameters to execute in order.
  `;

  const user = `
  Plan: ${planText}
  
  Convert this plan into ordered catalog function calls with proper parameters and checkpoints.
  Format as JSON array: [{"function": "listCapabilities", "params": {}}, ...]
  `;

  return { system, user };
}

export async function evaluate(context: string, result: string) {
  const system = `
  You are a Google Services result evaluator.
  
  Evaluate the results of each step in the Google AI Agent workflow:
  1. Check if tests passed (required for checkpoint validation)
  2. Verify expected files were created
  3. Confirm no breaking changes to existing code
  4. Validate that scaffolding follows project patterns
  
  Return success/failure status with specific feedback for improvement.
  `;

  const user = `
  Context: ${context}
  Result: ${result}
  
  Evaluate this step's completion:
  - Did tests pass?
  - Were expected files created?
  - Does it follow project standards?
  - Any issues to address before next step?
  
  Return evaluation with pass/fail and specific feedback.
  `;

  return { system, user };
}
