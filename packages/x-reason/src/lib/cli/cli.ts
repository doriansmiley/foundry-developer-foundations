import inquirer from 'inquirer';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'packages/x-reason/.env' });

import { getState } from '../orchestratorV1';
import { SupportedEngines } from '../factory';
import { gseArchitect } from './gseArchitect';
import { colorize, printHeader } from './utils/cliPrintUtils';

// Available X-Reason engines for CLI selection
const AVAILABLE_ENGINES = [
  {
    name: 'Google Service Expert',
    value: SupportedEngines.GOOGLE_SERVICE_EXPERT,
    description: 'AI expert for Google Services integration and development',
  },
  {
    name: 'Slack Service Expert',
    value: 'unspecified',
    description: '[In progress]',
  },
  {
    name: 'Microsoft 365 Service Expert',
    value: 'unspecified',
    description: '[In progress]',
  },
  {
    name: 'Atlassian Service Expert',
    value: 'unspecified',
    description: '[In progress]',
  },
];

async function promptEngineSelection() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'engine',
      message: colorize(
        'magenta',
        'Which X-Reason engine would you like to use?'
      ),
      choices: AVAILABLE_ENGINES.map((engine) => ({
        name: `${engine.name} - ${engine.description}`,
        value: engine.value,
      })),
      default: AVAILABLE_ENGINES[0].value, // Auto-select the first (and currently only) option
    },
  ]);

  return answers.engine as SupportedEngines;
}

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'task',
      message: colorize('magenta', 'What do you want me to do?'),
      validate: function (value: string) {
        if (value.trim().length === 0) {
          return 'Please enter a task description.';
        }
        return true;
      },
    },
  ]);

  return answers as { task: string };
}

async function executeWorkflow(task: string, engine: SupportedEngines) {
  try {
    switch (engine) {
      case SupportedEngines.GOOGLE_SERVICE_EXPERT:
        console.log(
          colorize(
            'blue',
            "\nHi there 👋, Google Service Expert here, let's ground the task"
          )
        );

        const { groundedPrompt, taskList } = await gseArchitect(task);

        console.log(colorize('green', '✅ Task grounded!'));
        console.log(colorize('blue', '━'.repeat(50)));

        const solution = {
          input: groundedPrompt,
          id: `x-reason-cli-${Date.now()}`,
          plan: taskList || '',
        };
        await getState(solution, true, {}, engine);

        break;
      default:
        throw new Error(`Engine ${engine} not supported`);
    }

    return { success: true, error: null };
  } catch (error) {
    const err = error as Error;
    console.log(err);
    console.log(colorize('red', `\n❌ Workflow failed: ${err.message}`));
    console.log(colorize('yellow', '\n🔍 Debug info:'));
    console.log(err.stack);
    return { success: false, error: err.message };
  }
}

async function askContinue() {
  const { continueWorking } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continueWorking',
      message: colorize('magenta', 'Would you like to do something else?'),
      default: true,
    },
  ]);

  return continueWorking;
}

async function main() {
  try {
    printHeader();

    // Select engine once at the beginning
    const selectedEngine = await promptEngineSelection();
    console.log(
      colorize(
        'green',
        `\n✅ Selected engine: ${
          AVAILABLE_ENGINES.find((e) => e.value === selectedEngine)?.name
        }`
      )
    );
    console.log('\n' + colorize('blue', '━'.repeat(50)) + '\n');

    let continueWorking = true;

    while (continueWorking) {
      // Get user input
      const { task } = await promptUser();

      // Execute the workflow
      const result = await executeWorkflow(task, selectedEngine);

      // Ask if user wants to continue
      continueWorking = await askContinue();

      if (continueWorking) {
        console.log('\n' + colorize('blue', '━'.repeat(50)) + '\n');
      }
    }

    console.log(colorize('green', '\n👋 Thanks for using X-Reason AI Agent!'));
    console.log(colorize('blue', 'Have a great day! 🚀\n'));
  } catch (error) {
    const err = error as Error;
    console.error(colorize('red', `\n💥 Fatal error: ${err.message}`));
    console.error(
      colorize('yellow', '\nPlease check your setup and try again.')
    );
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(colorize('yellow', '\n\n👋 Goodbye! Thanks for using X-Reason!'));
  process.exit(0);
});

main().catch((error) => {
  const err = error as Error;
  console.error(colorize('red', `\n💥 Unhandled error: ${err.message}`));
  process.exit(1);
});
