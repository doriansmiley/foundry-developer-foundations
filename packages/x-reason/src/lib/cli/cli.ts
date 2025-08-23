import inquirer from 'inquirer';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'packages/x-reason/.env' });

import { getState } from '../orchestratorV1';
import { SupportedEngines, xReasonFactory } from '../factory';
import engineV1 from '../engineV1';
import headlessInterpreter from '../interpreterV1Headless';
import { State } from 'xstate';
import { Context, MachineEvent } from '@codestrap/developer-foundations-types';

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

// ANSI color codes for better CLI experience
const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function colorize(color: keyof typeof colors, text: string) {
  return `${colors[color]}${text}${colors.reset}`;
}

function printHeader() {
  console.clear();
  console.log(colorize('cyan', colorize('bold', '🤖 X-Reason AI Agent')));
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
  console.log(colorize('green', "Hello! I'm your X-Reason AI Assistant."));
  console.log();
  console.log(colorize('yellow', '🚀 Available capabilities:'));
  console.log('  • Google Services integration and development');
  console.log('  • More engines coming soon...');
  console.log();
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
}

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
    {
      type: 'input',
      name: 'docs_link',
      message: colorize('magenta', 'What is the docs link?'),
      validate: function (value: string) {
        if (value.trim().length === 0) {
          return 'Please enter a docs link.';
        }
        return true;
      },
    },
  ]);

  return answers as { task: string; docs_link: string };
}

async function executeWorkflow(
  task: string,
  docs_link: string,
  engine: SupportedEngines
) {
  try {
    console.log(colorize('blue', '\n🔄 Initializing X-Reason orchestrator...'));

    const { solver, programmer, functionCatalog, aiTransition } =
      xReasonFactory(engine)({});
    const taskQuery = `
  I want to generate Google Service, specificaly: ${task}
  Here is the docs link: ${docs_link}
  `; // it should interactive before running the solver
    const taskList = await engineV1.solver.solve(taskQuery, solver);

    // Initialize the orchestrator
    const solution = {
      input: task,
      id: `x-reason-cli-${Date.now()}`,
      plan: taskList,
    };
    await getState(solution, true, {}, engine);

    console.log(colorize('green', '✅ Orchestrator ready!'));
    console.log(colorize('blue', `\n🚀 Starting workflow for: "${task}"`));
    console.log(colorize('yellow', '\n📋 Execution log:'));
    console.log(colorize('blue', '━'.repeat(50)));

    // Execute the workflow - getState handles the execution internally
    
    return;
    console.log('Generated task list:');
    console.log(taskList);

    const states = await engineV1.programmer.program(
      task,
      taskList,
      programmer
    );

    // todo evaluate the program

    const functions = functionCatalog((action: any) =>
      send(action, action.payload?.stateId as string)
    );
    const dispatch = (action: any) => {
      // todo implement dispatch
    };

    const { done, start, send, getContext, serialize } = headlessInterpreter(
      states,
      functions,
      dispatch,
      {
        requestId: '123',
        status: 200,
        machineExecutionId: '123',
        stack: [],
        userId: '123',
        solution: taskList,
      }
    );

    start();

    send({
      type: 'INVOKE',
      stateId: states[0].id,
    });
    ///
    engineV1.logic.transition(
      taskList,
      states[0].id,
      '{}',
      aiTransition,
      '123'
    );

    // state architect

    console.log(getContext());
    console.log(colorize('green', '\n✅ Workflow completed successfully!'));
    console.log(colorize('blue', '━'.repeat(50)));

    return { success: true, result: 'success' };
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
      const { task, docs_link } = await promptUser();

      // Execute the workflow
      const result = await executeWorkflow(task, docs_link, selectedEngine);

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
