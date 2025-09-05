import {
  Context,
  MachineEvent,
  Task,
  ActionType,
} from '@codestrap/developer-foundations-types';
import { F } from 'ramda';
import inquirer from 'inquirer';

import { printSubSection } from '../../../cli/utils/cliPrintUtils';
import * as fs from 'fs';
import { container } from '@codestrap/developer-foundations-di';
import { GeminiService, TYPES } from '@codestrap/developer-foundations-types';
import { grepSearchForFiles } from '../../../functions/codeAssistant/codebaseAnalysis/grepSearchForFiles';
import { explainCode } from '../../../functions/codeAssistant/explainCode/explainBasedOnDocumentation';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

// @ts-ignore
marked.use(markedTerminal());

type AgentFunctionMetadata = {
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
  "agentFunctionMetadata": [
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

function getLastStepAgentFunctionMetadata(event?: MachineEvent) {
  const payload = event?.payload;
  if (!payload) {
    return [];
  }

  const lastStepId = payload.stateId;
  if (lastStepId && payload[lastStepId]?.agentFunctionMetadata) {
    return Array.isArray(payload[lastStepId].agentFunctionMetadata)
      ? payload[lastStepId].agentFunctionMetadata
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
      'ConfirmUserIntent',
      {
        description:
          'Confirm user intent to create, modify, delete or explain functionality. Confirm function name and functionality to implement',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          const system = `You are the Google Service Intent Validator for the Architect.
Your job: infer and validate intent, functionName, and a concise functionalityExplanation from minimal inputs.
Rules:
- intent ∈ ["create","modify","delete","explain"].
- functionName: lowerCamelCase, descriptive, verb first (e.g., listDriveFiles, updateDriveFile).
- Extraction-first: Derive values directly from originalTask when present. For example, if originalTask contains patterns like: Confirm user intent to "create" new function "attachFilesAndSendEmail" then extract intent=create and functionName=attachFilesAndSendEmail without asking for more info.
- Determine alreadyExists: If originalTask or phrasing implies modification/deletion, or mentions that a function exists, set alreadyExists=true. If the task is clearly to create a new function, set alreadyExists=false. When uncertain, make a best-guess based on intent and phrasing.
- If information is missing, infer the most reasonable best-guess from originalTask; if still insufficient, set the field to null and add a short message in "missing".
- Never be chatty. Respond ONLY with a single JSON object. No backticks, markdown, or prose.`;
          const getUserPrompt = (
            functionalityExplanation: string | undefined,
            intent: string | undefined,
            functionName: string | undefined,
            originalTaskOverride?: string
          ) => `Validate and normalize the following developer input for Google Service scope.

Inputs:
- originalTask: "${originalTaskOverride ?? task ?? ''}"
- functionalityExplanation (optional): "${functionalityExplanation ?? ''}"
- suggestedIntent (optional): "${intent ?? ''}"
- suggestedFunctionName (optional): "${functionName ?? ''}"

Guidance:
- Prefer originalTask for extraction; only use suggested fields if originalTask is silent. If suggestions conflict with originalTask, ignore suggestions.
- If functionName is present in originalTask (quoted or camelCase), extract it as-is and normalize functionalityExplanation from it.
- Determine alreadyExists using the intent and task phrasing: modify/delete → likely true; create → likely false; explicit mentions of existence override.

Allowed values:
- allowedIntents: ["create","modify","delete","explain"]

Output strictly as JSON with this exact shape:
{
  "isSufficient": boolean,
  "missing": string[],
  "intent": "create"|"modify"|"delete"|"explain"|null,
  "functionName": string|null,
  "normalizedFunctionality": string|null,
  "alreadyExists": boolean,
  "confidence": number
}

Prefer originalTask over conflicting suggestions. If a field cannot be determined from originalTask, best-guess; if uncertainty remains, set it to null and add a precise message to "missing".
Return ONLY the JSON object.`;

          // Initialize empty and let the LLM infer first
          const actionIntent: {
            intent: string | undefined;
            functionName: string | undefined;
            functionalityExplanation: string | undefined;
            alreadyExists: boolean;
          } = {
            intent: undefined,
            functionName: undefined,
            functionalityExplanation: undefined,
            alreadyExists: false,
          };

          // dispatch pause to wait for user input
          dispatch({ type: 'PAUSE' });

          // ask llm here to get the intent, functionName, and functionalityExplanation
          const geminiService = container.get<GeminiService>(
            TYPES.GeminiService
          );
          const raw = await geminiService(
            getUserPrompt(undefined, undefined, undefined),
            system,
            { topP: 0.1, maxTokens: 512, extractJsonString: true }
          );
          const result = JSON.parse(raw);
          actionIntent.intent = result.intent ?? actionIntent.intent;
          actionIntent.functionName =
            result.functionName ?? actionIntent.functionName;
          actionIntent.functionalityExplanation =
            result.normalizedFunctionality ??
            actionIntent.functionalityExplanation;
          actionIntent.alreadyExists =
            typeof result.alreadyExists === 'boolean'
              ? result.alreadyExists
              : actionIntent.alreadyExists ?? false;

          const messages = {
            allDefined: `So based on my understanding you want to ${actionIntent.intent} function ${actionIntent.functionName}. Do you confirm it?`,
            functionalityExplanationMissing: `I figured out that you want to ${
              actionIntent.intent ?? 'work on a function'
            }. But I'm not getting functionality you want to create, hence I'm not able to propose function name. Can you briefly describe the functionality?`,
            intentMissing: `I didn't get the purpose, do you want to create, modify/update, delete or explain existing functionality?`,
          };

          const isAllDefined = () =>
            Boolean(
              actionIntent.intent &&
                actionIntent.functionName &&
                actionIntent.functionalityExplanation
            );

          // Always perform an initial LLM inference pass from original task.
          try {
            const geminiService = container.get<GeminiService>(
              TYPES.GeminiService
            );
            const raw = await geminiService(
              getUserPrompt(undefined, undefined, undefined),
              system,
              { topP: 0.1, maxTokens: 512, extractJsonString: true }
            );
            const result = JSON.parse(raw);
            actionIntent.intent = result.intent ?? actionIntent.intent;
            actionIntent.functionName =
              result.functionName ?? actionIntent.functionName;
            actionIntent.functionalityExplanation =
              result.normalizedFunctionality ??
              actionIntent.functionalityExplanation;
            actionIntent.alreadyExists =
              typeof result.alreadyExists === 'boolean'
                ? result.alreadyExists
                : actionIntent.alreadyExists ?? false;
          } catch {}

          // Bounded refinement loop
          const MAX_ATTEMPTS = 3;
          let attempts = 0;

          while (!isAllDefined() && attempts < MAX_ATTEMPTS) {
            attempts++;
            try {
              const geminiService = container.get<GeminiService>(
                TYPES.GeminiService
              );
              const raw = await geminiService(
                getUserPrompt(
                  actionIntent.functionalityExplanation,
                  actionIntent.intent,
                  actionIntent.functionName
                ),
                system,
                { topP: 0.1, maxTokens: 512, extractJsonString: true }
              );
              const result = JSON.parse(raw);
              actionIntent.intent = result.intent ?? actionIntent.intent;
              actionIntent.functionName =
                result.functionName ?? actionIntent.functionName;
              actionIntent.functionalityExplanation =
                result.normalizedFunctionality ??
                actionIntent.functionalityExplanation;
              actionIntent.alreadyExists =
                typeof result.alreadyExists === 'boolean'
                  ? result.alreadyExists
                  : actionIntent.alreadyExists ?? false;
            } catch {}

            if (!actionIntent.functionalityExplanation) {
              const answers = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'functionalityExplanation',
                  message: messages.functionalityExplanationMissing,
                  default: '',
                },
              ]);
              actionIntent.functionalityExplanation =
                answers.functionalityExplanation ||
                actionIntent.functionalityExplanation;
            }

            if (!actionIntent.intent) {
              const answers = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'intent',
                  message: messages.intentMissing,
                  default: '',
                },
              ]);
              actionIntent.intent = answers.intent || actionIntent.intent;
            }
          }

          // If function seems to exist, try generating an explanation from docs/code (best-effort)
          let functionExplanation = '';
          if (actionIntent.alreadyExists && actionIntent.functionName) {
            let codeImplementations: string[] = [];
            const codeImplementationPaths = grepSearchForFiles({
              path: 'packages/services/google/src/lib/',
              searchTerm: actionIntent.functionName,
              fileExtensions: ['ts'],
            }) as Array<{ path: string }>;

            codeImplementations = codeImplementationPaths.map(
              (value: { path: string }) => {
                const codeImplementation = fs.readFileSync(value.path, 'utf8');
                return `${value.path}\n${codeImplementation}`;
              }
            );

            try {
              const readmeContent = fs.readFileSync(
                'packages/services/google/README.md',
                'utf8'
              );
              functionExplanation = await explainCode({
                documentation: readmeContent,
                query: `explain ${actionIntent.functionName}`,
                codeImplementations:
                  codeImplementations.length > 0
                    ? codeImplementations
                    : undefined,
              });

              console.log(functionExplanation);
            } catch {}
          }

          // Confirmation loop with potential re-inference on user update
          let confirmed = false;
          let confirmAttempts = 0;
          const MAX_CONFIRM_ATTEMPTS = 3;
          while (!confirmed && confirmAttempts < MAX_CONFIRM_ATTEMPTS) {
            confirmAttempts++;
            const summary = [
              `I understood your intent as:`,
              `- intent: ${actionIntent.intent ?? 'unknown'}`,
              `- functionName: ${actionIntent.functionName ?? 'unknown'}`,
              `- functionality: ${
                actionIntent.functionalityExplanation ?? 'unknown'
              }`,
              `- alreadyExists: ${actionIntent.alreadyExists ? 'yes' : 'no'}`,
              `Do you confirm?`,
            ].join('\n');

            const confirmAnswer = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'confirm',
                message: summary,
                default: true,
              },
            ]);

            if (confirmAnswer.confirm) {
              confirmed = true;
              break;
            }

            const update = await inquirer.prompt([
              {
                type: 'input',
                name: 'updatedDescription',
                message:
                  'Please provide an updated description of what you want:',
                default: '',
              },
            ]);

            if (
              update.updatedDescription &&
              update.updatedDescription.trim().length > 0
            ) {
              try {
                const raw = await geminiService(
                  getUserPrompt(
                    undefined,
                    undefined,
                    undefined,
                    update.updatedDescription
                  ),
                  system,
                  { topP: 0.1, maxTokens: 512, extractJsonString: true }
                );
                const result = JSON.parse(raw);
                actionIntent.intent = result.intent ?? actionIntent.intent;
                actionIntent.functionName =
                  result.functionName ?? actionIntent.functionName;
                actionIntent.functionalityExplanation =
                  result.normalizedFunctionality ??
                  actionIntent.functionalityExplanation;
                actionIntent.alreadyExists =
                  typeof result.alreadyExists === 'boolean'
                    ? result.alreadyExists
                    : actionIntent.alreadyExists ?? false;
              } catch {}
            }
          }

          // Proceed on best-guess; confirmation happens in a later step
          const finalMetadataIntent: any = {
            ...actionIntent,
            functionImplementationExplanation: functionExplanation || undefined,
            lastModifiedBy: context.stack?.[context.stack?.length - 1],
          };

          const agentFunctionMetadata = getLastStepAgentFunctionMetadata(event);
          agentFunctionMetadata.push(finalMetadataIntent);

          const payload = getPayload(context, {
            agentFunctionMetadata,
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'ConfirmDetailedImplementationPlan',
      {
        description: 'Confirm detailed implementation plan',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(context);

          const latestFunctionMetadata =
            getLastStepAgentFunctionMetadata(event);

          console.log(latestFunctionMetadata);

          //       const system = `You are Larry, a helpful AI software engineering assistant that specializes in helping software engineers create well defined tasks.
          // You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Larry, your AI engineering assistant.
          // You can get creative on your greeting, taking into account the day of the week. Today is ${new Date().toLocaleDateString(
          //   'en-US',
          //   { weekday: 'long' }
          // )}.
          // You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc.
          // The current month is ${new Date().toLocaleDateString('en-US', {
          //   month: 'long',
          // })}.
          // When asking clarifying questions you always leverage your knowledge of APIs and SDKs with a focus on TypeScript/Node SDKs when available.
          // You also careful craft your clarifying questions to make sure the engineer does not leave out critical details or footgun themselves with more complex design details such as handling concurrent requests, rate limits, and timeouts`;

          //       const user = `
          // Below is the software engineers initial prompt to modify or create code within the google-services package,
          // and additional contextually relevant information about the tech stack and dependencies.
          // there me also be some message threads from previous interactions.
          // The initial prompt from the end user:
          // ${task}
          // Respond to the user with clarifying questions or comments to flush out their intentions and get to a point where their request is actionable.
          // Your goal is to get to a detailed specification with enough detail to make sure the engineer hasn't left out critical design details
          // but not so much detail nothing ever gets done. We want just enough to detail to uncover known unknowns
          // If the user has not provided enough detail to be helpful respond letting them know the additional details you need.

          // If the task is to create new function, then you need to ask for the function name confirmation, and module name e.g sheets, drive, gmail, etc.
          // You can figure out this information from the initial prompt from the end user.

          // If the task is to modify existing function, then you need to ask for the function name confirmation, and module name e.g sheets, drive, gmail, etc.

          // Some additional context that might be helpful:
          // Our tech stack is built on Palantir Foundry
          // Our primary programming languages are TypeScript, React, Javascript, Node, and Python.
          // We use Python for data science and data engineering. We use TypeScript, React, and Node for applications
          // We are an AI services startup that specializes in delivers consulting services as software products.
          // `;

          //       const geminiService = container.get<GeminiService>(
          //         TYPES.GeminiService
          //       );

          //       const response = await geminiService(user, system);
          dispatch({
            type: 'PAUSE',
          });

          // TODO obtain this data from task or use LLM for it
          const result = {};

          // Then confirm this data through inquirer prompt here

          const payload = getPayload(context, result);

          // dispatch({
          //   type: 'CONTINUE',
          //   payload,
          // });
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

          const agentFunctionMetadata = getLastStepAgentFunctionMetadata(event);

          console.log(agentFunctionMetadata);

          process.exit(0);
          // const metadataModifiedByLastStep = agentFunctionMetadata.filter(
          //   (action: AgentFunctionMetadata) =>
          //     action.lastModifiedBy === lastStepId
          // );

          // for (const action of metadataModifiedByLastStep) {
          //   const links = await searchForGoogleDocsLinks(action.functionName);
          //   action.documentationLinks = links;
          //   action.lastModifiedBy = context.stack?.[context.stack?.length - 1];
          // }

          // const payload = getPayload(context, {
          //   agentFunctionMetadata: [
          //     ...agentFunctionMetadata,
          //     ...metadataModifiedByLastStep,
          //   ],
          // });

          // dispatch({
          //   type: 'CONTINUE',
          //   payload,
          // });
        },
      },
    ],
    [
      'ScaffoldNewFunctionFiles',
      {
        description: 'Scaffold new function files using Nx generators',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            printSubSection(
              'Scaffolding new function files using Nx generators'
            )
          );

          const payload = getPayload(context, {});

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'ReadProvidedDocumentation',
      {
        description: 'Read provided documentation',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(printSubSection('Reading provided documentation'));

          const payload = getPayload(context, {});

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'ImplementTheFunction',
      {
        description: 'Implement the function',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(printSubSection('Implementing the function'));

          const payload = getPayload(context, {});

          dispatch({
            type: 'CONTINUE',
            payload,
          });
        },
      },
    ],
    [
      'CreateUnitTestsForTheFunction',
      {
        description: 'Create unit tests for the implemented function',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(printSubSection('Creating unit tests for the function'));

          const payload = getPayload(context, {});

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
