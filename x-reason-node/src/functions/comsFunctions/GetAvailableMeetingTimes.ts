import { Gemini_2_0_Flash } from "@foundry/models-api/language-models";

import { Context, MachineEvent } from "../../reasoning/types";
import { findOptimalMeetingTime } from "@gsuite/computemodules";
import { extractJsonFromBackticks, uuidv4 } from "../../utils";

export type AvailableTime = {
    start: string; // Available start time
    end: string; // IANA time zone (e.g., "America/New_York")
    availableAttendees: string[]; // Attendees available at this time
    unavailableAttendees: string[]; // Attendees unavailable at this time
};

export type ProposedTimes = {
    times: AvailableTime[]; // Array of available time slots
    subject: string; // Meeting subject or title
    agenda?: string; // Optional agenda
    durationInMinutes: number; // Meeting duration in minutes
    allAvailable: boolean; // are all required attendees available
};

export type MeetingRequest = {
    participants: Array<string>;
    subject: string;
    timeframe_context: 'user defined exact date/time' | 'as soon as possible' | 'this week' | 'next week';
    localDateString?: string,
    duration_minutes: number;
    working_hours: {
        start_hour: number;
        end_hour: number;
    }
}


// This function gets the attendees from the input context and then
// uses Google Calander APIs to find available meeting times for anyone with a codestrap.me (we should mayne make the home domain configurable) email address
// For external emails it will send an email asking for available time slots if it can not find them on the input context
// The calling function in the function catalog will then determine whether or not to pause machine exeuction waiting for a response of continue forward
export async function getAvailableMeetingTimes(context: Context, event?: MachineEvent, task?: string): Promise<ProposedTimes> {
    try {
        const options = {
        timeZone: "America/Los_Angeles",
        timeZoneName: "short" // This will produce "PST" or "PDT"
        };
        //@ts-ignore
        const formatter = new Intl.DateTimeFormat("en-US", options);
        const formatted = formatter.format(new Date());

        console.log(`formatted int date: ${formatted}`);
        const isPDT = formatted.includes("PDT");

        // we are all on the west coast so we hard code our time zone for now
        const system = `You are a helpful virtual assistant tasked with meeting scheduling.
    You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Viki, Code's AI EA" or similar. 
    You can get creative on your greeting, taking into account the day of the week. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}. 
    You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
    The current local date/time is ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}. 
    When scheduling meetings you always extract the key details from the input task.`;

        const user = `
# Task
Using the meeting request from the end user extract the key details. You must extract:
1. The participants
2. the meeting subject
3. The meeting duration
4. The time frame
5. The local date string for the proposed day/time if any

# The meeting request from the end user:
${task}

The complete task list which may contain additional infomration about the meeting such as the subject or agenda:
${context.solution}

Let's take this step by step.
1. First determin if any people mentioned in the input task most likely match the people below. If so return the matching participan(s) in the participant array
Connor Deeks <connor.deeks@codestrap.me> - Connor Deeks in the CEO and board memeber in charge of platform leads, business strategy, and investor relations.
Dorian Smiley <dsmiley@codestrap.me> - Dorian is the CTO who manages the software engineers and is responsible for technology strategy, execution, and the lead applied AI engineer.
2. Insert any explicit email addresses into the participants array
3. Extract the meting subject based on the meeting request from the end user. Most meeting requests from the ens user incude Subject: THE_MEETING_SUBJECT
4. If the meeting request from the end user does not contain a subject, use the provided complete task list to extract it. 
If not subject can be extracted for this meeting request use "Circle Up"
5. Extract the meeting duration in minutes. If the duration can not be infered return 30.
6. Determine the time frame as one of the following: "user defined exact date/time", "as soon as possible", "this week", or "next week". If the user did not specify a timeframe you must use "as soon as possible".
7. If the time frame is "user defined exact date/time" outputput the local date string in the proposed timezone. 
The current day/time in your timezone is: ${new Date().toString()}
PDT in effect (indicated if Pacific Daylight Time is in effect): ${isPDT}

You can only respond in JSON in the following format:
{
    participants: Array<string>;
    subject: string;
    timeframe_context: 'user defined exact date/time' | 'as soon as possible' | 'this week' | 'next week';
    localDateString: string,
    duration_minutes: number;
}

For example:
If the ask from the user is:
"Schedule a meeting with Connor and Dorian for next week to discuss new Palantir features from DevCon"

Your response is:
{
    "participants:" ["dsmiley@codestrap.me", "connor.deeks@codestrap.me"],
    "subject": "DevCon Feature Recap",
    "timeframe_context": "next week",
    "duration_minutes": 30;
}

If the ask from the user is:
"Schedule a meeting with Connor, Dorian, and keith@eriestreet.com to discuss investement ask"

Your response is:
{
    "participants": ["connor.deeks@codestrap.me", "dsmiley@codestrap.me", "keith@eriestreet.com"],
    "subject": "Investment Ask",
    "timeframe_context": "as soon as possible",
    "duration_minutes": 30;
}

If the ask from the user is (assuming the current local day/time in your time zone is 'Tue Apr 08 2025 08:26:19 GMT-0700 (Pacific Daylight Time))':
"Schedule a meeting with Connor and Dorian to discuss to internal projects this Friday at 9 AM MT for 1 hour"

Your response is:
{
    "participants": ["connor.deeks@codestrap.me", "dsmiley@codestrap.me"],
    "subject": "Internal Projects",
    "timeframe_context": "user defined exact date/time",
    "localDateString": "Fri Apr 11 2025 09:00:00 GMT-0600 (Mountain Daylight Time)"
    "duration_minutes": 60;
}
`;

        const response = await Gemini_2_0_Flash.createGenericChatCompletion(
            {
                messages: [
                    { role: "SYSTEM", contents: [{ text: system }] },
                    { role: "USER", contents: [{ text: user }] }
                ]
            }
        );
        const result = extractJsonFromBackticks(response.completion?.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}");

        const parsedResult = JSON.parse(result) as MeetingRequest;
        const timeFrame = (parsedResult.timeframe_context === 'user defined exact date/time') ? parsedResult.localDateString! : parsedResult.timeframe_context;
        // @ts-ignore
        const participants = Array.from(new Set(parsedResult.participants))
        //remove external email addresses since we can't check them
        const codeStrapParticipants = participants.filter(participat => participat.indexOf('codestrap.me') >= 0 || participat.indexOf('codestrap.com') >= 0);
        const inputs = {
            participants: codeStrapParticipants,
            timeframe_context: timeFrame,
            duration_minutes: parsedResult.duration_minutes,
            working_hours: {
                start_hour: 8,
                end_hour: 17,
            },
            timezone: "America/Los_Angeles", // hard code for now, should be the organizer's time zone
        }

        let availableTimes = await findOptimalMeetingTime(inputs);

        // no times found
        if (availableTimes.suggested_times.length === 0) {
            switch (inputs.timeframe_context) {
                case 'as soon as possible':
                    inputs.timeframe_context = 'this week';
                    break;
                case 'this week':
                    inputs.timeframe_context = 'next week';
                    break;
            }
            availableTimes = await findOptimalMeetingTime(inputs);
        }

        // try next week
        if (availableTimes.suggested_times.length === 0 && inputs.timeframe_context !== 'next week') {
            inputs.timeframe_context = 'next week';
            availableTimes = await findOptimalMeetingTime(inputs);
        }

        // still nothing, return allAvailable false to resolve manually
        if (availableTimes.suggested_times.length === 0) {
            return {
                times: [], // Array of available time slots
                subject: parsedResult.subject, // Meeting subject or title
                durationInMinutes: inputs.duration_minutes, // Meeting duration in minutes
                allAvailable: false, // findOptimalMeetingTime will always find a timeslot currently since it does not allow you to specify an exact day/time yet
            }
        }
        // the array is presorted based on score, so we take the first one:
        const time = availableTimes.suggested_times[0];
        const message = availableTimes.message;

        const returnValue: ProposedTimes = {
            times: [
                {
                    start: time.start,
                    end: time.end,
                    availableAttendees: participants,
                    unavailableAttendees: [],
                }
            ], // Array of available time slots
            agenda: message,
            subject: parsedResult.subject, // Meeting subject or title
            durationInMinutes: inputs.duration_minutes, // Meeting duration in minutes
            allAvailable: true, // findOptimalMeetingTime will always find a timeslot currently since it does not allow you to specify an exact day/time yet
        }

        console.log('findOptimalMeetingTime response:', JSON.stringify(availableTimes));

        return returnValue;
    } catch (e) {
        console.log((e as Error).message);
        throw e;
    }
}