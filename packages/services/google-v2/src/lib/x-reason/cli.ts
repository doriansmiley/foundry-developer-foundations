import inquirer from 'inquirer';
import { getState } from './orchestratorV1';
import { SupportedEngines } from './factory';
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';
import {
  geminiService,
  createFoundryClient,
} from '@codestrap/developer-foundations-services-palantir';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'packages/services/google-v2/src/lib/x-reason/.env' });

container.bind(TYPES.GeminiService).toConstantValue(geminiService);
container
  .bind(TYPES.FoundryClient)
  .toDynamicValue(createFoundryClient)
  .inSingletonScope();

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
  console.log(
    colorize('cyan', colorize('bold', '🤖 X-Reason Google AI Agent'))
  );
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
  console.log(
    colorize('green', "Hello! I'm your Google Services AI Assistant.")
  );
  console.log();
  console.log(colorize('yellow', '🚀 My capabilities:'));
  console.log('  • List existing Google SDK functions and clients');
  console.log('  • Create new functions using Nx generators');
  console.log('  • Implement function logic with tests');
  console.log('  • Create and configure service clients');
  console.log('  • Update existing clients to expose new functions');
  console.log();
  console.log(colorize('yellow', '📋 Example requests:'));
  console.log('  • "Create Google Drive read function"');
  console.log('  • "Add calendar integration for scheduling"');
  console.log('  • "Build Gmail send email functionality"');
  console.log('  • "Create Google Sheets data reader"');
  console.log();
  console.log(colorize('blue', '━'.repeat(50)));
  console.log();
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

  return answers as { task: string; proceed: boolean };
}

async function executeWorkflow(task: string) {
  try {
    console.log(colorize('blue', '\n🔄 Initializing X-Reason orchestrator...'));

    // Initialize the orchestrator
    const solution = {
      input: task,
      id: `x-reason-cli-${Date.now()}`,
      plan: '',
    };
    const orchestrator = await getState(
      solution,
      true,
      {},
      SupportedEngines.GOOGLE
    );

    console.log(colorize('green', '✅ Orchestrator ready!'));
    console.log(colorize('blue', `\n🚀 Starting workflow for: "${task}"`));
    console.log(colorize('yellow', '\n📋 Execution log:'));
    console.log(colorize('blue', '━'.repeat(50)));

    // Execute the workflow
    await orchestrator.executeWorkflow(task);

    return { success: true, result: 'success' };
  } catch (error) {
    const err = error as Error;
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

    let continueWorking = true;

    while (continueWorking) {
      // Get user input
      const { task } = await promptUser();

      // Execute the workflow
      const result = await executeWorkflow(task);

      // Ask if user wants to continue
      continueWorking = await askContinue();

      if (continueWorking) {
        console.log('\n' + colorize('blue', '━'.repeat(50)) + '\n');
      }
    }

    console.log(
      colorize('green', '\n👋 Thanks for using X-Reason Google AI Agent!')
    );
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
