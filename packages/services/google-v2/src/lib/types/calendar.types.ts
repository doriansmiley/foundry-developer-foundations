import { Static, Type } from '@sinclair/typebox';

export const CalendarSchemas = {
  ScheduleMeeting: {
    input: Type.Object({
      summary: Type.String(),
      description: Type.Optional(Type.String()),
      start: Type.String(),
      end: Type.String(),
      attendees: Type.Array(Type.String()),
    }),
    output: Type.Object({
      id: Type.String(),
      htmlLink: Type.String(),
      status: Type.String(),
    }),
  },
  FindOptimalMeetingTime: {
    input: Type.Object({
      participants: Type.Array(Type.String()),
      timeframe_context: Type.String(),
      duration_minutes: Type.Optional(Type.Number({ default: 30 })),
      working_hours: Type.Optional(
        Type.Object({
          start_hour: Type.Number({ default: 9 }),
          end_hour: Type.Number({ default: 17 }),
        })
      ),
      timezone: Type.String(),
    }),
    output: Type.Object({
      suggested_times: Type.Array(
        Type.Object({
          start: Type.String(),
          end: Type.String(),
          score: Type.Number(),
        })
      ),
      message: Type.String(),
    }),
  },
};

export type FindOptimalMeetingTimeInput = Static<
  typeof CalendarSchemas.FindOptimalMeetingTime.input
>;
export type FindOptimalMeetingTimeOutput = Static<
  typeof CalendarSchemas.FindOptimalMeetingTime.output
>;

export type ScheduleMeetingInput = Static<
  typeof CalendarSchemas.ScheduleMeeting.input
>;
export type ScheduleMeetingOutput = Static<
  typeof CalendarSchemas.ScheduleMeeting.output
>;

export type MeetingRequest = {
  participants: Array<string>;
  subject: string;
  timeframe_context:
    | 'user defined exact date/time'
    | 'as soon as possible'
    | 'this week'
    | 'next week';
  localDateString?: string;
  duration_minutes: number;
  working_hours: {
    start_hour: number;
    end_hour: number;
  };
};

export type DerivedWindow = {
  windowStartLocal: Date;
  windowEndLocal: Date;
  slotStepMinutes: number;
};

export interface CalendarContext {
  summary: string;
  description?: string;
  start: string;
  end: string;
  attendees: string[];
}

export interface OptimalTimeContext {
  participants: string[];
  timeframe_context: string;
  duration_minutes?: number;
  working_hours?: WorkingHours;
  timezone?: string;
}

export interface TimeRange {
  startTime: Date;
  endTime: Date;
}

export interface BusyPeriod {
  start: string;
  end: string;
}

export interface WorkingHours {
  start_hour: number;
  end_hour: number;
}

export interface TimeSlot {
  start: string;
  end: string;
  score?: number;
  attendees?: string;
  id?: string;
  startLocalDate?: string;
  endLocalDate?: string;
  duration?: number;
}
