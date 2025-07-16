import { google } from 'googleapis';
import { Buffer } from 'buffer';
import { CalendarContext, EmailContext, FindOptimalMeetingTimeOutput, MeetingRequest, OfficeService, ReadEmailHistoryContext, ScheduleMeetingOutput, SendEmailOutput, WatchEmailsInput } from '@xreason/types';
import { findOptimalMeetingTime } from '@xreason/services/delegates/gsuite/findOptimalMeetingTime';
import { scheduleMeeting } from '@xreason/services/delegates/gsuite/scheduleMeeting';
import { sendEmail } from '@xreason/services/delegates/gsuite/sendEmail';
import { readEmailHistory } from './delegates/gsuite/readEmailHistory';
import { watchEmails } from './delegates/gsuite/watchEmails';

export enum GSUITE_SCOPES {
    CALENDAR_READ = 'https://www.googleapis.com/auth/calendar.readonly',
    CALENDAR_WRITE = 'https://www.googleapis.com/auth/calendar.events',
    CALENDAR_FREEBUSY = 'https://www.googleapis.com/auth/calendar.freebusy',
    CALENDAR_ALL = 'https://www.googleapis.com/auth/calendar',
    GMAIL_SEND = 'https://www.googleapis.com/auth/gmail.send',
    GMAIL_READ = 'https://www.googleapis.com/auth/gmail.readonly',
    GMAIL_META = 'https://www.googleapis.com/auth/gmail.metadata',
    GMAIL_MODIFY = 'https://www.googleapis.com/auth/gmail.modify',
}

export type ServiceAccountCredentials = {
    type: string,
    project_id: string,
    private_key_id: string,
    private_key: string,
    client_email: string,
    client_id: string,
    auth_uri: string,
    token_uri: string,
    auth_provider_x509_cert_url: string,
    client_x509_cert_url: string,
    universe_domain: string
}

async function loadServiceAccount() {
    if (!process.env.GSUITE_SERVICE_ACCOUNT) {
        throw new Error('GSUITE_SERVICE_ACCOUNT environment variable not set');
    }

    const jsonString = Buffer.from(process.env.GSUITE_SERVICE_ACCOUNT, 'base64').toString('utf8');
    const credentials = JSON.parse(jsonString) as ServiceAccountCredentials;

    console.log('✅ Service account file loaded successfully');
    return credentials;
}

async function makeClient(user: string) {
    console.log(`Creating client for user: ${user}`);
    // load the service account one time
    const credentials = await loadServiceAccount();

    const mailScopes: GSUITE_SCOPES[] = [
        GSUITE_SCOPES.GMAIL_SEND,
        GSUITE_SCOPES.CALENDAR_READ,
        GSUITE_SCOPES.GMAIL_READ,
    ]

    const calendarScopes: GSUITE_SCOPES[] = [
        GSUITE_SCOPES.CALENDAR_ALL,
        GSUITE_SCOPES.CALENDAR_FREEBUSY,
        GSUITE_SCOPES.CALENDAR_READ,
        GSUITE_SCOPES.CALENDAR_WRITE,
    ]

    const emailAuth = new google.auth.GoogleAuth({
        credentials,
        scopes: mailScopes,
        clientOptions: { subject: user }
    });

    const calAuth = new google.auth.GoogleAuth({
        credentials,
        scopes: calendarScopes,
        clientOptions: { subject: user }
    });

    const mailClient = await emailAuth.getClient();
    const calClient = await calAuth.getClient();

    if (!mailClient.getRequestHeaders || !calClient.getRequestHeaders) {
        throw new Error('Invalid auth client - missing methods');
    }

    const calendarClient = google.calendar({ version: 'v3', auth: calAuth });
    const emailClient = google.gmail({ version: 'v1', auth: emailAuth });

    return { emailClient, calendarClient }
}

export async function makeGSuiteClient(user: string): Promise<OfficeService> {
    const { emailClient, calendarClient } = await makeClient(user);

    return {
        getAvailableMeetingTimes: async (meetingRequest: MeetingRequest): Promise<FindOptimalMeetingTimeOutput> => {
            const result = await findOptimalMeetingTime(calendarClient, meetingRequest);

            return result;
        },
        scheduleMeeting: async (meeting: CalendarContext): Promise<ScheduleMeetingOutput> => {
            const result = await scheduleMeeting(calendarClient, meeting);

            return result;
        }
        ,
        sendEmail: async (email: EmailContext): Promise<SendEmailOutput> => {
            const result = await sendEmail(emailClient, email);

            return result;
        },
        readEmailHistory: async (context: ReadEmailHistoryContext) => {
            const { emailClient } = await makeClient(context.email);
            const result = await readEmailHistory(emailClient, context);

            return {
                messages: result,
            }
        },
        watchEmails: async (context: WatchEmailsInput) => {
            // we pass makeClient because this operations requires scoped clients to the user's email!
            const result = await watchEmails(context, makeClient);

            return result;
        },
    }
}
