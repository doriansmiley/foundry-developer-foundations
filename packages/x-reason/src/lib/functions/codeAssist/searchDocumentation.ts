import { Context, MachineEvent, ResearchAssistant } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import {
    TYPES,
} from '@codestrap/developer-foundations-types';

export type ResearchReport = {
    searchResults: string;
}

export async function searchDocumentation(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<ResearchReport> {

    const researchAssistant = container.get<ResearchAssistant>(TYPES.ResearchAssistant);

    // find the last instance of a resolveUnavailableAttendees state in the stack
    const confirmUserIntentStateId = context.stack
        ?.slice()
        .reverse()
        .find((item) => item.includes('confirmUserIntent'));

    const prompt = (confirmUserIntentStateId) ? `
    Design Specification:
    ${context[confirmUserIntentStateId]}
    Task:
    ${task}
    ` : `${task}`;

    const response = await researchAssistant(prompt);

    return {
        searchResults: response,
    }
}