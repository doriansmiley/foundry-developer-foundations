import { Context, MachineEvent, ThreadsDao } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import {
    GeminiService,
    TYPES,
} from '@codestrap/developer-foundations-types';

export type UserIntent = {
    confirmationPrompt: string;
}

export async function confirmUserIntent(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<UserIntent> {
    let userResponses;

    const system = `You are Larry, a helpful AI software engineering assistant that specializes in helping software engineers create well defined tasks.
    You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Larry, your AI engineering assistant. 
    You can get creative on your greeting, taking into account the day of the week. Today is ${new Date().toLocaleDateString(
        'en-US',
        { weekday: 'long' }
    )}. 
    You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
    The current month is ${new Date().toLocaleDateString('en-US', {
        month: 'long',
    })}. 
    When asking clarifying questions you always leverage your knowledge of APIs and SDKs with a focus on TypeScript/Node SDKs when available.
    You also careful craft your clarifying questions to make sure the engineer does not leave out critical details or footgun themselves with more complex design details such as handling concurrent requests, rate limits, and timeouts`;

    let user = `
    Below is the software engineers initial prompt to modify or create code within the code base, 
    and additional contextually relevant information about the tech stack and dependencies.
    there me also be some message threads from previous interactions.

    The initial prompt from the end user:
    ${task}

    This ensures you don't ask the user the same freaking questions over and over if they already provide an answer!

    Respond to the user with clarifying questions or comments to flush out their intentions and get to a point where their request is actionable.
    Your goal is to get to a detailed specification with enough detail to make sure the engineer hasn't left out critical design details
    but not so much detail nothing ever gets done. We want just enough to detail to uncover known unknowns

    If the user has not provided enough detail to be helpful respond letting them know the additional details you need.

    Some additional context that might be helpful:
    Our tech stack is built on Palantir Foundry
    Our primary programming languages are TypeScript, React, Javascript, Node, and Python. 
    We use Python for data science and data engineering. We use TypeScript, React, and Node for applications
    We are an AI services startup that specializes in delivers consulting services as software products.
    `;

    if (context.machineExecutionId) {
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
        try {
            userResponses = await threadsDao.read(context.machineExecutionId);
            if (userResponses) {
                user = `
Below is the current conversation thread with the user. Read and review if carefully 
and consider the users responses and current iteration ot the generated task list. 
User responses start the phrases like "The user responded with:"
Be sure to factor in information the user has already clarified!!! 
We don't want them answering a bunch of shit twice!
Output the remaining items that require clarification based on the message thread:
    ${userResponses?.messages}
            `;
            }
        } catch (e) { /* empty */ }
    }

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(user, system);

    return {
        confirmationPrompt: response,
    }
}