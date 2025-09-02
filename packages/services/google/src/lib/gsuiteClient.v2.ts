import {
  MeetingRequest,
  OfficeServiceV2,
  Summaries,
} from '@codestrap/developer-foundations-types';
import { makeGSuiteClient } from './gsuiteClient';
import { findOptimalMeetingTimeV2 } from './delegates/findOptimalMeetingTime.v2';
import { deriveWindowFromTimeframe } from './delegates/deriveWindowFromTimeframe';
import { summarizeCalendars } from './delegates/summerizeCalanders';

export async function makeGSuiteClientV2(
  user: string
): Promise<OfficeServiceV2> {
  const v1Client = await makeGSuiteClient(user);

  return {
    ...v1Client,
    summarizeCalendars: async (args: {
      emails: string[];
      timezone: string;
      windowStartLocal: Date;
      windowEndLocal: Date;
    }): Promise<Summaries> => {
      const result = await summarizeCalendars({
        ...args,
        calendar: v1Client.getCalendarClient(),
      });

      return result;
    },
    getAvailableMeetingTimes: async (
      meetingRequest: MeetingRequest
    ): Promise<{
      message: string;
      suggested_times: { start: string; end: string; score: number }[];
    }> => {
      // TODO, get the TZ from the user profile
      const timezone = 'America/Los_Angeles';
      const fallbackOffsetMinutes = -420;

      console.log(`calling with deriveWindowFromTimeframe ${JSON.stringify(meetingRequest, null, 2)}`);

      const { windowStartLocal, windowEndLocal, slotStepMinutes } =
        deriveWindowFromTimeframe(meetingRequest, timezone, timezone);

      console.log(`deriveWindowFromTimeframe returned start time of ${windowStartLocal} and end time of ${windowEndLocal}`)

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

      const suggested_times = slots.map((s) => ({
        start: s.start,
        end: s.end,
        score: s.score ?? 0,
      }));

      return {
        message: `Found ${suggested_times.length} suggested times`,
        suggested_times,
      };
    },
  };
}
