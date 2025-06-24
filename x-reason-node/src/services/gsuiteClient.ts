import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { CalendarContext, EmailContext, FindOptimalMeetingTimeOutput, Meeting, MeetingRequest, OfficeService, ScheduleMeetingOutput, SendEmailOutput } from '@xreason/types';
import { findOptimalMeetingTime } from '@xreason/services/delegates/gsuite/findOptimalMeetingTime';
import { scheduleMeeting } from '@xreason/services/delegates/gsuite/scheduleMeeting';
import { sendEmail } from '@xreason/services/delegates/gsuite/sendEmail';

export enum GSUITE_SCOPES {
    CALENDAR_READ = 'https://www.googleapis.com/auth/calendar.readonly',
    CALENDAR_WRITE = 'https://www.googleapis.com/auth/calendar.events',
    CALENDAR_FREEBUSY = 'https://www.googleapis.com/auth/calendar.freebusy',
    CALENDAR_ALL = 'https://www.googleapis.com/auth/calendar',
    GMAIL_SEND = 'https://www.googleapis.com/auth/gmail.send',
    GMAIL_READ = 'https://www.googleapis.com/auth/gmail.readonly',
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
    const credentialsPath = process.env.GSUITE_SERVICE_ACCOUNT;
    if (!credentialsPath) {
        throw new Error('GSUITE_SERVICE_ACCOUNT environment variable not set');
    }

    const absolutePath = path.resolve(process.cwd(), credentialsPath);
    const fileContents = fs.readFileSync(absolutePath, 'utf-8');
    const credentials = JSON.parse(fileContents) as ServiceAccountCredentials;
    console.log('✅ Service account file loaded successfully');
    return credentials;
}

//OfficeService<GSUITE_SCOPES[]>
export async function makeGSuiteClient(user: string): Promise<OfficeService> {
    console.log(`Creating client for user: ${user}`);
    // load the service account one time
    const credentials = await loadServiceAccount();

    const mailScopes: GSUITE_SCOPES[] = [
        GSUITE_SCOPES.GMAIL_SEND,
        GSUITE_SCOPES.CALENDAR_READ,
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
        }
    }
}
