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
    const { messages } = await threadsDao.read(context.machineExecutionId!);
    const parsedMessages = JSON.parse(messages || '[]') as { user?: string, system?: string }[];
    // get any user response that is incoming from the cli
    const searchDocumentationId = context.stack?.slice().reverse().find(item => item.includes('architectImplementation')) || '';
    const userResponse = (context[searchDocumentationId] as UserIntent)?.userResponse;

    if (userResponse) {
        parsedMessages.push({
            user: userResponse,
        });
    } else {
        // this should only happen on the first iteration,
        // but there may be edge cases where this task was reentered without asking the user a question
        parsedMessages.push({
            user: task,
        });
    }

    const prompt = `
    The complete message thread including the README that explains our current codebase and the proposed plan
    As well as the user's request and follow up answers
    ${messages}
    `;

    const response = await architect(prompt);

    parsedMessages.push({
        system: response,
    });

    await threadsDao.upsert(JSON.stringify(parsedMessages), 'cli-tool', context.machineExecutionId!);

    return {
        confirmationPrompt: `# The Architect's Response
Hello there, it's the architect here. Please review my proposed final design spec and let me know if we are good to proceed.
        
${response}`,
    }
}