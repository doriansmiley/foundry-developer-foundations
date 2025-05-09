import { Context, MachineEvent } from "../../reasoning/types";
import { ProposedTimes } from '.';
import { scheduleMeeting as scheduleMeetingFunction } from "@gsuite/computemodules";

export type Meeting = {
    "id": string;
    "status": string;
    "htmlLink": string;
}

// This function extracts the proposed time slot found on the input context and the attendees and schedules a meeting with Google Calander API
export async function scheduleMeeting(context: Context, event?: MachineEvent, task?: string): Promise<Meeting> {
    try {
        const availableTimes: ProposedTimes = context[context.stateId];

        const inputs = {
            summary: availableTimes.subject,
            description: availableTimes.subject,
            start: availableTimes.times[0].start,
            end: availableTimes.times[0].end,
            attendees: availableTimes.times[0].availableAttendees,
        };

        const schedulingResult = await scheduleMeetingFunction(inputs);

        console.log('schedulingResult response:', JSON.stringify(schedulingResult));
        
        return schedulingResult;
    }
    catch (e) {
        console.log((e as Error).message);
        throw e;
    }

}