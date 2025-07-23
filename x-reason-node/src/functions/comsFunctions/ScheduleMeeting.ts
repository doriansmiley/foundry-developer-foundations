import { Context, MachineEvent } from "@xreason/reasoning/types";
import { Meeting, ProposedTimes, TYPES, OfficeService } from "@xreason/types";
import { container } from "@xreason/inversify.config";

// This function extracts the proposed time slot found on the input context and the attendees and schedules a meeting with Google Calander API
export async function scheduleMeeting(context: Context, event?: MachineEvent, task?: string): Promise<Meeting> {
    try {
        const { subject, times }: ProposedTimes = context[context.stateId];

        const inputs = {
            summary: subject,
            description: subject,
            start: times[0].start,
            end: times[0].end,
            attendees: times[0].availableAttendees,
        };

        const officeService = await container.getAsync<OfficeService>(TYPES.OfficeService);

        const schedulingResult = await officeService.scheduleMeeting(inputs);

        console.log('schedulingResult response:', JSON.stringify(schedulingResult));

        return schedulingResult;
    }
    catch (e) {
        console.log((e as Error).message);
        throw e;
    }

}