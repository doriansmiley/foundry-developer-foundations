import { MeetingRequest, OfficeService } from '@xreason/types';
import { makeGSuiteClient } from './gsuiteClient';
import { findOptimalMeetingTimeV2 } from './delegates/gsuite/findOptimalMeetingTime.v2';
import { deriveWindowFromTimeframe } from './delegates/gsuite/deriveWindowFromTimeframe';


export async function makeGSuiteClientV2(user: string): Promise<OfficeService> {
    const v1Client = await makeGSuiteClient(user);

    return {
        ...v1Client,
        getAvailableMeetingTimes: async (meetingRequest: MeetingRequest): Promise<{
            message: string;
            suggested_times: { start: string; end: string; score: number }[];
        }> => {
            const timezone = 'America/Los_Angeles';
            const fallbackOffsetMinutes = -420;

            const { windowStartLocal, windowEndLocal, slotStepMinutes } =
                deriveWindowFromTimeframe(meetingRequest, timezone);

            const slots = await findOptimalMeetingTimeV2({
                calendar: v1Client.getCalendarClient(),
                attendees: meetingRequest.participants,
                timezone,
                windowStartLocal,
                windowEndLocal,
                durationMinutes: meetingRequest.duration_minutes,
                workingHours: meetingRequest.working_hours,
                slotStepMinutes,
                skipFriday: false,
                fallbackOffsetMinutes,
            });

            const suggested_times = slots.map(s => ({
                start: s.start,
                end: s.end,
                score: s.score ?? 0,
            }));

            return {
                message: `Found ${suggested_times.length} suggested times`,
                suggested_times,
            };
        },

    }
}
