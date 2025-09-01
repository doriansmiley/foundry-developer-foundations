import {
  Context,
  MachineEvent,
  Task,
  ActionType,
} from '@codestrap/developer-foundations-types';
import { F } from 'ramda';
import inquirer from 'inquirer';
import { searchForGoogleDocsLinks } from '../../../cli/delegates/searchForGoogleDocs';
import { printSubSection } from '../../../cli/utils/cliPrintUtils';

type AgentAction = {
  intent: string;
  functionName: string;
  moduleName: string;
  documentationLinks?: string[];
  functionImplementationExplanation?: string;
  functionImplementationPaths?: string[];
  functionUsagePaths?: string[];
  lastModifiedBy: string;
};
/*
Structure around architect is:
{
  "agentActions": [
    {
      "intent": "create",
      "functionName": "listDriveFiles",
      "moduleName": "drive",
      "documentationLinks": [
        "https://developers.google.com/drive/api/v3/reference/files/list"
      ]
    },
    {
      "intent": "modify",
      "functionName": "sendEmail",
      "moduleName": "gmail",
      "functionImplementationExplanation": "...",
      "functionImplementationPaths": [
        "packages/google-services/src/lib/delegates/gmail/sendEmail.ts"
      ],
      "functionUsagePaths": [
        "packages/google-services/src/lib/useCases/sendEmail.ts"
      ],
      "documentationLinks": [
        "https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send"
      ]
    },
  ]
}

*/

function getLastStepAgentActions(event?: MachineEvent) {
  const payload = event?.payload;
  if (!payload) {
    return [];
  }

  const lastStepId = payload.stateId;
  if (lastStepId && payload[lastStepId]?.agentActions) {
    return Array.isArray(payload[lastStepId].agentActions)
      ? payload[lastStepId].agentActions
      : [];
  }

  return [];
}

function getPayload(context: Context, result: Record<string, any>) {
  const stateId = context.stack?.[context.stack?.length - 1];
  if (!stateId) {
    throw new Error('Unable to find associated state in the machine stack.');
  }
  const payload = {
    stateId,
    [stateId]: {
      // we destructure to preserve other keys like result which holds values from user interaction
      ...context[stateId],
      ...result,
    },
  };

  return payload;
}
export function getFunctionCatalog(dispatch: (action: ActionType) => void) {
  return new Map<string, Task>([
    [
      'SetIntentAndFunctionName',
      {
        description:
          'Confirm user intent to create or modify function together with confirmation of function name and confirm module name',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          // Parse task string for intent, functionName, and moduleName
          const intentMatch = task?.match(/intent(?:\s+to)?\s+"([^"]+)"/i);
          const functionMatch = task?.match(/function\s+"([^"]+)"/i);
          const moduleMatch = task?.match(/module\s+"([^"]+)"/i);

          const actionIntent: {
            intent: string | undefined;
            functionName: string | undefined;
            moduleName: string | undefined;
          } = {
            intent: intentMatch?.[1],
            functionName: functionMatch?.[1],
            moduleName: moduleMatch?.[1],
          };

          console.log(
            `I figured out that you want to ${actionIntent.intent} function ${actionIntent.functionName} in module ${actionIntent.moduleName}.Please confirm it:`
          );

          // dispatch pause to wait for user input
          dispatch({
            type: 'PAUSE',
          });

          // Prompt user to confirm or provide missing values
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'functionName',
              message: `Function name:`,
              default: actionIntent.functionName,
            },
            {
              type: 'input',
              name: 'intent',
              message: actionIntent.intent
                ? `Do you want to ${actionIntent.intent}?`
                : 'Do you want to create or modify?',
              default: actionIntent.intent,
            },
            {
              type: 'input',
              name: 'moduleName',
              message: actionIntent.moduleName
                ? `Looks like function is inside ${actionIntent.moduleName} module. Is that correct?`
                : 'I wasn able to figure out the Google Service module name. Please provide it: (e.g. drive, gmail, docs etc.)',
              default: actionIntent.moduleName,
            },
          ]);

          const finalActionIntent = {
            intent: answers.intent || undefined,
            functionName: answers.functionName || undefined,
            moduleName: answers.moduleName || undefined,
            lastModifiedBy: context.stack?.[context.stack?.length - 1],
          };

          const agentActions = getLastStepAgentActions(event);
          agentActions.push(finalActionIntent);

          const payload = getPayload(context, {
            agentActions,
          });

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'FunctionAlreadyExists',
      {
        description:
          'Tell user that function or set of functions already exists under given path or paths',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            'FunctionAlreadyExists implementation in function catalog called'
          );

          // TODO obtain this data from task or use LLM for it
          const result = {
            functionAlreadyExists: true,
            functionPaths: [
              'packages/google-services/src/lib/delegates/drive/listDriveFiles.ts',
            ],
          };

          // Then confirm this data through inquirer prompt here

          const payload = getPayload(context, result);

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'ExplainFunctionality',
      {
        description:
          'Explain the functionality of the function or set of functions',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            'FunctionAlreadyExists implementation in function catalog called'
          );

          // TODO obtain this data from task or use LLM for it
          const result = {
            functionExplanation: `TBD`,
          };

          // Then confirm this data through inquirer prompt here

          const payload = getPayload(context, result);

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'SearchForDocumentation',
      {
        description: 'Search for documentation for the given API',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(printSubSection('Searching for documentation'));
          const lastStepId = event?.payload?.stateId;

          const agentActions = getLastStepAgentActions(event);

          const actionsModifiedByLastStep = agentActions.filter(
            (action: AgentAction) => action.lastModifiedBy === lastStepId
          );

          for (const action of actionsModifiedByLastStep) {
            const links = await searchForGoogleDocsLinks(action.functionName);
            action.documentationLinks = links;
            action.lastModifiedBy = context.stack?.[context.stack?.length - 1];
          }

          const payload = getPayload(context, {
            agentActions: [...agentActions, ...actionsModifiedByLastStep],
          });

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'SearchInCodebase',
      {
        description: 'Search in codebase for the function references',
        implementation: async (context: Context) => {
          console.log(
            `SearchInCodebase called on path: ${
              context.stack?.[context.stack?.length - 1]
            }`
          );

          const payload = getPayload(context, {
            intent: 'modify', // || createV2Function
            codebaseSearchResults: [
              {
                path: 'packages/google-services/src/lib/delegates/drive/listDriveFiles.ts',
                content: 'function listDriveFiles() { ... }',
              },
            ],
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'CreateGroundedPrompt',
      {
        description:
          'Create grounded prompt for Google Service Expert AI agent',
        implementation: async (context: Context, event?: MachineEvent) => {
          const agentActions = getLastStepAgentActions(event);

          console.log(
            'Now can create grounded prompt or use this state machine to implement the actions'
          );

          console.log(agentActions);

          const payload = getPayload(context, {
            agentActions,
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'UnsafeQuestion',
      {
        description: 'Default state to display for unsafe questions',
        implementation: (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log('UnsafeQuestion implementation called');
          dispatch({ type: 'success' });
        },
      },
    ],
    [
      'UnsupportedQuestion',
      {
        description: 'Default state to display for unsupported questions',
        implementation: (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log('UnsupportedQuestion implementation called');
          dispatch({ type: 'success' });
        },
      },
    ],
  ]);
}
