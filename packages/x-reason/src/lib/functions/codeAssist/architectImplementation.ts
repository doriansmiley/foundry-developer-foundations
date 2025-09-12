import { CodingArchitect, Context, MachineEvent, ThreadsDao, UserIntent, } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import {
    TYPES,
} from '@codestrap/developer-foundations-types';
export async function architectImplementation(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<UserIntent> {

    const architect = container.get<CodingArchitect>(TYPES.CodingArchitect);
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
    // we use the thread because it should not aonly contain the design specification but user comments as well
    const thread = await threadsDao.read(context.machineExecutionId!);

    const prompt = `
    The complete conversation thread which includes the design specification:
    ${thread}

    Task:
    ${task}
    `;

    const response = await architect(prompt);

    return {
        confirmationPrompt: `# The Architect's Response
Hello there, it's the architect here. Please review my proposed final design spec and let me know if we are good to proceed.
        
${response}`,
    }
}