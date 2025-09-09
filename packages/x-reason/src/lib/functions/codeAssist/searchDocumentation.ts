import { Context, MachineEvent, ResearchAssistant, ThreadsDao } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import {
    TYPES,
} from '@codestrap/developer-foundations-types';

export type SearchDocumentationResults = {
    searchResults: string;
}

export async function searchDocumentation(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<SearchDocumentationResults> {

    const researchAssistant = container.get<ResearchAssistant>(TYPES.ResearchAssistant);
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

    const { messages } = await threadsDao.read(context.machineExecutionId!);

    const prompt = (messages) ? `
    Design Specification Conversation Thread:
    ${messages}

    Task:
    ${task}
    ` : `${task}`;

    const response = await researchAssistant(prompt);

    return {
        searchResults: response,
    }
}