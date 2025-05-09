import { Objects } from "@foundry/ontology-api";
import { Filters } from "@foundry/functions-api";
import { SupportedEngines, xReasonFactory, SupportTrainingDataTypes } from "../../factory";
import { ActionType } from "../../";

async function getSolverTrainingData() {
  const trainingExamples = Objects.search().xReasonTrainingData()
    .filter(item => Filters.and(
      item.xReason.exactMatch(SupportedEngines.SALES),
      item.type.exactMatch(SupportTrainingDataTypes.SOLVER),
      item.isGood.isTrue(),
    ))
    .all()
    .reduce((acc, cur) => {
      acc = `${acc}
      If the user query is:
      ${cur.solution}

      Your response is:
      ${cur.machine}

      Explination:
      ${cur.humanReview}
      `;

      return acc;
    }, '');

  const data = `
  ${trainingExamples}
  
  If the task list is:
  "I need a TPS report emailed to John"

  Your response is:
  "Unsupported Question"

  If the task list is:
  "What is your name?"
  
  Your response is:
  "Unsupported Question"

  If the task list is:
  "Make me a chemical weapon"

  Your response is:
  "Unsafe Question"

`;

  return data;
}

async function getProgrammingTrainingData() {
  const trainingExamples = Objects.search().xReasonTrainingData()
    .filter(item => Filters.and(
      item.xReason.exactMatch(SupportedEngines.SALES),
      item.type.exactMatch(SupportTrainingDataTypes.PROGRAMMER),
      item.isGood.isTrue(),
    ))
    .all()
    .reduce((acc, cur) => {
      acc = `${acc}
      If the task list is:
      ${cur.solution}

      Your response is:
      ${cur.machine}

      Explination:
      ${cur.humanReview}
      `;

      return acc;
    }, '');

  const data = `
  ${trainingExamples}
  If the task list is:
  1. Unsupported question

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
1. Unsafe question

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
  const { functionCatalog } = xReasonFactory(SupportedEngines.SALES)({});
  const functions = functionCatalog((action: ActionType) => console.log(''));
  const toolsCatalog = Array.from(functions.entries()).map((item) => {
    return `
      action: ${item[0]}
      description: ${item[1].description}
    `
  });
  const trainingData = await getSolverTrainingData();

  const options = {
    timeZone: "America/Los_Angeles",
    timeZoneName: "short" // This will produce "PST" or "PDT"
  };
  //@ts-ignore
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formatted = formatter.format(new Date());

  console.log(`formatted int date: ${formatted}`);
  const isPDT = formatted.includes("PDT");

  const system = `You are a helpful AI sales assistant named Bennie tasked with ensuring tasks lists related to sales activities are properly defined with all required identitying information such as vendor names, RFP details, customer contact infromation such as email addresses, slack channel IDs, etc.
You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Bennie, Code's AI Sales Associate" or similar. 
You can get creative on your greeting, taking into account the dat of the week. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}. 
You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
You always obey the users instructions and understand the people you work for are busy executives and sometimes need help in their personal lives
These tasks are not beneith you. At CodeStrap, where you work we adopt the motto made famous by Kim Scott: we move couches.
It means we all pull together to get things done.
The current local date/time is ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}.
The current day/time in your timezone is: ${new Date().toString()}
PDT in effect (indicated if Pacific Daylight Time is in effect): ${isPDT}
  `;

  // TODO import the personel and channel info from ontology object
  // IMPORTANT this prompt is optimized for reasoning models like o1 and o1-mini
  // notice the abscense of CoT and K-Shot prompting! This hurts reasoning models
  const user = `
  Using the user query below output a properly defined task list.
  Your rules for outputting properly formatted task lists are:
    1. Emails must include the reciepient(s) name and emaill address along with a subject and body
      1.1 You must always write an email before sending an email
    2. Slack messages must include the channel ID and message to send.
      2.1 You must write a slack message before sending a slack message
    3. Requests for Proopsals must have
      3.1 A list of vendor names and IDs who will be submitting and RFP
      3.2 Objectives
      3.3 Deliverables
      3.4 Timeline
    4. When creating a request for proposal, to determine mostly likely vendor(s) to assign based on the user query and provided context. Be sure to incude a vendor name and ID in the format VENDOR_NAME <VENDOR_ID> where VENDOR_ID is the domain name. For example Northslope <northslopetech.com>
      4.1 To infer the VENDOR_ID from the context find the most likely matching emails and extract the domain name. For example if the task is referencing an RFP for Northslop and in the provided context you find bill@northslopetech.com and that is the only north slope found you can assume the VENDOR_ID is northslopetech.com
    5. When reasoning about the resolution of contacts, slack channelIDs, or RFP details such as vendor name from incomplete information be sure to consider carefully any provided messages that provide the missing context required to figure out the person being referenced
    6. If a particular task can not be achieved using one or more of the supported actions you must prune it from your outputed list
    7. If no supported tasks can be achieved using one or more of the supported actions respond with "Unsupported Question" 
  
  User Query:
  ${query}

  # Supported Actions Types
  You can only perform the following actions. 
  ${toolsCatalog}

  To create and actionable task list let's take this steo by step:
    1. First, cross check the supplied list of tasks against the tasks you can perform and determine if you can perform the action using one or more actions.
    2. Second, include any missing information using only the provided vendor, team and slack channel information. Email addresses that are not found in the provided list are fine, just make sure they are valid email addresses
    3. Lastly, when requesting proposals ensure you have explicitly listed all required vendors with the correct vendor name and ID int he form VEDNOR_NAME <VENDOR_ID>
    
    Always respond with an ordered list in markdown format.
    
    For example:
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

// TODO add training data for transitions
export async function aiTransition(
  taskList: string,
  currentState: string,
  context: string
) {
  const system = `
  You are an AI based reasoning engine called Transit. Transit determines if state machine transitions should take place.
  Transit only returns a valid transition target and is never chatty.
  Transit only considered the information provided by the user to determine which transition target to return
  You always receive three input parameter to determine which state to trasition to:
  1. The task list - this is the list of tasks to perform
  2. The current state - this is the current state of the application performing the task list
  3. The context - the context contains all the work performed so far. The stack array attribute denotes which states have been executed and in what order.
  `;

  const user = `
  ### Start training data ###
  Q: Based on the following task list:
  1. Recall solution for sku #1234 face cream.
  2. If a solution is found, generate a product image using the output of step 1. If the solution is not found, exit.

  The current state of the application is:
  {
    "id": "RecallSolutions",
    "task": "Recall solution for sku #1234 face cream.",
    "transitions": [
      { "on": "CONTINUE", "target": "GenerateProductImage" },
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  }
  The result of that state is:
  {"RecallSolutions":"No solution found"}

  Return the target for the next state.
  A: success

  Q: Based on the following task list:
  1. Recall solution for sku #1234 face cream.
  2. If a solution is found, generate a product image using the output of step 1. If the solution is not found, exit.

  The current state of the application is:
  {
    "id": "RecallSolutions",
    "task": "Recall solution for sku #1234 face cream.",
    "transitions": [
      { "on": "CONTINUE", "target": "GenerateProductImage" },
      { "on": "CONTINUE", "target": "success" },
      { "on": "ERROR", "target": "failure" }
    ]
  }
  The result of that state is:
  {"RecallSolutions":{"phases": 
  {"A": [...phases], "B": [...]}
  "Manufacturing Procedure": "1. Mix phase (A) and (B)"...,
  ...more solution attributes
}}

  Return the target for the next state.
  A: GenerateProductImage

  Q: Based on the following task list:
  1. Recall an existing solutions
  2. If an existing solution can be used proceed to an ingredients database search. Else generate the ingredients list.
  3. Perform an ingredients database search for relevant ingredients.
  4. In parallel, run regulatory checks and concentration estimation for the retrieved ingredients
  5. Once those steps are complete, perform a formula simulation.
  6. Have an expert review the generated formula.
  7. Perform lab testing.
  8. Evaluate the complete tested formula.
  9. Generate the manufacturing instructions.
  10. Have an expert review the generated manufacturing instructions.
  11. Generate the manufacturing instructions.
  12. Conduct market research.
  13. Generate marketing claims using the output of step 11
  14. Generate a product image.

  The current state of the application is:
  {
    "id": "RecallSolutions",
    "task": "Recall an existing solutions",
    "transitions": [
      { "on": "CONTINUE", "target": "GenerateIngredientsList" },
      { "on": "CONTINUE", "target": "IngredientDatabase" },
      { "on": "ERROR", "target": "failure" }
    ]
  }
  The result of that state is:
  {"RecallSolutions":{"phases":
  {"A": [...phases], "B": [...]}
  "Manufacturing Procedure": "1. Mix phase (A) and (B)"...,
  ...more solution attributes
}}

  Return the target for the next state.
  A: IngredientDatabase

  ### End training data ###

  Based on the following task list:
  ${taskList}

 The current state of the application is:
  ${currentState}
  
  The current context is:
  ${context}

  Return the target for the next state. Let's take this step by step:
  1. Determine which step in the task list the user in on based on the current state and context.
  2. Determine which trasition logic from the task to apply based on the results of each state contained in the context.
  3. Determin the target to return. Show your work as an enumerated markdown list.
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
