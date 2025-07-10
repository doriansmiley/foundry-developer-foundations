import { Context, MachineEvent } from "@xreason/reasoning/types";
import { extractJsonFromBackticks } from "@xreason/utils";
import { GeminiService, ProposedTimes, TYPES, OfficeService } from "@xreason/types";
import { container } from "@xreason/inversify.config";

export type DraftAtendeeEmailResponse = {
    emailId: string,
    message: string,
    modelDialog: string,
    dayTimes: string;
    meetingSubject: string;
    meetingDuration: number;
    meetingAgenda?: string;
    ts: number,
}

// This function extracts the channel ID and recepients from the input context and sends a slack message
export async function resolveUnavailableAttendees(context: Context, event?: MachineEvent, task?: string): Promise<DraftAtendeeEmailResponse> {
    // TODO see if there is a better way to do this. I think we can assume though that the only time this is invoked
    // is if we failed to find available times in the getAvailableMeetingTimes execution
    // we calculate the index this way because at this point in excution the entry function has already pushed this state
    // into the the stack, ie context.stack?.push(state.id); See the programmerV1.ts for the exact line, but should be line 47
    const index = (context.stack?.length ?? 0) - 2;

    if (index < 0) {
        throw new Error(`Invalid index found ${index}`);
    }
    const stateId = context.stack?.[context.stack?.length - 2];

    console.log(`resolveUnavailableAttendees found stateId: ${stateId}`);

    if (!stateId) {
        throw new Error('Unable to find associated getAvailableMeetingTimes state in the machine stack.')
    }

    let emails: string[] = [];
    const resultOfMeetingSchedulingAttempt = context[stateId] as ProposedTimes;
    const dayTimes = resultOfMeetingSchedulingAttempt.times.reduce((acc, cur) => {
        emails = [...emails, ...cur.unavailableAttendees, ...cur.availableAttendees]
        acc = `${acc}
        
        start: ${new Date(cur.start).toString()},
        end: ${new Date(cur.end).toString()},
        available: ${cur.availableAttendees.join(', ')},
        unavailable: ${cur.unavailableAttendees.join(', ')}
        `;
        return acc;
    }, '');

    console.log(`resolveUnavailableAttendees found the resultOfMeetingSchedulingAttempt: ${JSON.stringify(resultOfMeetingSchedulingAttempt || {})}`);
    console.log(`resolveUnavailableAttendees emails is: ${JSON.stringify(emails || [])}`);

    if (emails.length === 0) {
        throw new Error('resolveUnavailableAttendees did not find any email addresses to send and email to!')
    }

    const user = `
    Draft an email message asking all attendees asking if anyone can move blockers to make any of the day/time work:
    Required attendees: 
    ${Array.from(new Set(emails).values()).join(', ')}

    Available Day/Time:
    ${dayTimes}

    You can only respond in JSON in the following format:
    {
        message: string,
        recipients: string[],
    }

    For example if the attendees are times are:
    Required attendees:
    "jane.doe@example.com>", "john.doe@example.com"

    Available Day/Time:
    start: Mon Mar 10 2025 01:00:00 GMT-0700 (Pacific Daylight Time),
    end: Mon Mar 10 2025 01:30:00 GMT-0700 (Pacific Daylight Time),
    available: jane.doe@example.com,
    unavailable: john.doe@example.com,

    Your response is:
    {
        "recipients": ["jane.doe@example.com", "john.doe@example.com"],
        "message": "Hi Jane and John, Happy Friday! I'm having trouble finding an available day/time that works for the both of you. Jane is available at Mon Mar 10 2025 01:00:00 GMT-0700 (Pacific Daylight Time) but John is not. Please respond to this email with a proposed day time that works. If you can make any of the unavailable times work that would be preferred. Best, Viki.",
    }
    `;

    const system = `You are a helpful AI assistant tasked with authoring Slack messages. 
    You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Viki, Code's AI EA" or similar. 
    You can get creative on your greeting, taking into account the dat of the week. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}. 
    You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
    The current month is ${new Date().toLocaleDateString('en-US', { month: 'long' })}.`;

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(user, system);
    // eslint-disable-next-line no-useless-escape
    const result = extractJsonFromBackticks(response.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}");
    const parsedResult = JSON.parse(result);
    const message = parsedResult.message;
    const modelDialog = parsedResult.message;

    const officeService = await container.getAsync<OfficeService>(TYPES.OfficeService);

    const emailResponse = await officeService.sendEmail(
        {
            from: process.env.OFFICE_SERVICE_ACCOUNT,
            recipients: parsedResult.recipients,
            subject: resultOfMeetingSchedulingAttempt.subject,
            message,
        }
    );

    // TODO: implement email threading with event listeners
    // This will involve saving this intital email to a "threads" ontology object
    // then having the event listern monitor the Gmail inbox, then when it fins an email from Vicki
    // lookup the corresponding email thread on the ontology based on the emailResponse.id (should math the PK field of the ontology object)
    return {
        emailId: emailResponse.id,
        message,
        meetingSubject: resultOfMeetingSchedulingAttempt.subject,
        meetingDuration: resultOfMeetingSchedulingAttempt.durationInMinutes,
        meetingAgenda: resultOfMeetingSchedulingAttempt.agenda,
        dayTimes,
        modelDialog,
        ts: new Date().getTime(),
    };
}