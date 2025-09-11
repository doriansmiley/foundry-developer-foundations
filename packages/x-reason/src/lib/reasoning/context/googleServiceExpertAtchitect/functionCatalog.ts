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
import { getDocumentationLinksFromDesignSpec } from '../../../functions/codeAssistant/documentationAnalysis/getDocumentationLinksFromDesignSpec';
import { searchForDocumentation } from '../../../functions/codeAssistant/documentationAnalysis/searchForDocumentation';
import { readDocumentationAndUpdateDesignSpec } from '../../../functions/codeAssistant/documentationAnalysis/readDocumentationAndUpdateDesignSpec';
import { readConversation } from '../../../storage/conversationStore';

// @ts-ignore
marked.use(markedTerminal());

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
      'SearchAndConfirmDocumentationOfDesignSpec',
      {
        description:
          'Search and confirm documentation based on one provided in design spec or search new one based on instruction',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          // TODO: get conversationId from context
          const conversationId = '010';
          let links = [];

          try {
            links = await searchForDocumentation(conversationId);
            console.log('SEARCH RESULT', links);
          } catch (error) {
            console.error('Error searching for documentation', error);
          }

          if (links.length === 0) {
            links = await getDocumentationLinksFromDesignSpec(conversationId);
            // read documentation from design spec if exists
            // update the design spec with the search result
          }

          console.log(
            'I`m going to read those documentation pages to tune up design specification accordingly to latest documentation'
          );

          // confirm the links with the user via inquirer prompt
          const { links: selectedLinks } = await inquirer.prompt([
            {
              type: 'checkbox',
              name: 'links',
              message: 'Please confirm the links',
              choices: links,
            },
          ]);

          const { customLinksInput } = await inquirer.prompt([
            {
              type: 'input',
              name: 'customLinksInput',
              message:
                'Optional: paste additional link(s) to include (comma-separated). Press Enter to skip',
              filter: (input: string) => (input || '').trim(),
            },
          ]);

          const additionalLinks = (
            customLinksInput
              ? (customLinksInput as string)
                  .split(',')
                  .map((l) => l.trim())
                  .filter((l) => l.length > 0)
              : []
          ) as string[];

          const finalLinks = Array.from(
            new Set<string>([
              ...(selectedLinks as string[]),
              ...additionalLinks,
            ])
          );

          console.log('Reading pages...');

          const conversation = await readConversation(conversationId);
          console.log(conversation);

          const finalDesignSpec = await readDocumentationAndUpdateDesignSpec(
            finalLinks,
            conversationId
          );

          console.log('Final design spec', finalDesignSpec);
          const payload = getPayload(context, {
            designSpec: finalDesignSpec,
          });

          dispatch({ type: 'CONTINUE', payload });
        },
      },
    ],
    [
      'AskUserToApproveDesignSpec',
      {
        description:
          'Ask user to approve design spec or refine plan, if user won`t approve, return and ask for re-run solver',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(context);

          console.log('AskUserToApproveDesignSpec implementation called');

          inquirer.prompt([
            {
              type: 'confirm',
              name: 'approve',
              message: 'Do you approve the design spec?',
            },
          ]);

          // TODO obtain this data from task or use LLM for it
          const result = {};

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
      'AskUserToApproveFunctionImplementation',
      {
        description: 'Ask user to approve the function implementation',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            printSubSection('Ask user to approve the function implementation')
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
      'ExposeFunctionViaLatestVersionOfGSuiteClient',
      {
        description: 'Expose function via latest version of the gSuiteClient',
        implementation: async (
          context: Context,
          event?: MachineEvent,
          task?: string
        ) => {
          console.log(
            printSubSection(
              'Exposing function via latest version of the gSuiteClient'
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
