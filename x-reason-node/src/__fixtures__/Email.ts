import { Context } from "@xreason/reasoning";

// Mock email response data
export const mockEmailResponse = {
    data: {
        id: '8675309',
        threadId: '2468',
        labelIds: ['labels', 'schmabels'],
    }
};

export const validEmailData = {
    message: 'Hello World',
    subject: 'Test Subject',
    recipients: ['test@example.com'],
    modelDialog: 'sample dialog',
    ts: 1234567890
};

export const validContext = {
    stack: ['emailData', 'bullshit'],
    emailData: validEmailData
} as any as Context;

export const missingRecipientContext = {
    stack: ['emailData', 'bullshit'],
    emailData: {
        // message is missing
        subject: 'Test',
        modelDialog: 'sample dialog',
        ts: 1234567890
    }
} as any as Context;

const THREAD_ID = 'mock-thread-id-1';

/* ── messages.get ─────────────────────────────────────────────── */
export const mockMessageGetResponse = {
    data: {
        id: 'mock-email-id-1',
        threadId: THREAD_ID,
        payload: {
            headers: [
                {
                    name: 'Subject',
                    value:
                        'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                },
            ],
        },
        snippet: 'Mock message snippet',
    },
};

/* ── messages.list (no‑resolution) ────────────────────────────── */
export const mockEmailHistoryNoResolution = {
    data: {
        messages: [
            {
                subject:
                    'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                threadId: THREAD_ID,
                from: 'vici@codestrap.me',
                body: `Hey Dorian and Connor Happy Thursday! …`,
                id: 'mock-email-id',
            },
        ],
    },
};

/* ── messages.list (with resolution) ──────────────────────────── */
export const mockEmailHistoryWithResolution = {
    data: {
        messages: [
            {
                subject:
                    'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                threadId: THREAD_ID,
                from: 'vici@codestrap.me',
                body: `Hey Dorian and Connor Happy Thursday! …`,
                id: 'mock-email-id-1',
            },
            {
                subject:
                    'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                threadId: THREAD_ID,
                from: 'dsmiley@codestrap.me',
                body: `Hey Connor what about tomorrow at 1 PM?`,
                id: 'mock-email-id-2',
            },
            {
                subject:
                    'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                threadId: THREAD_ID,
                from: 'connor.deeks@codestrap.me',
                body: `That works.`,
                id: 'mock-email-id-3',
            },
        ],
    },
};

/* ── threads.get ──────────────────────────────────────────────── */
export const mockMessageGetThreadsResponse = {
    data: {
        id: THREAD_ID,
        messages: [
            {
                id: mockEmailHistoryWithResolution.data.messages[0].id,
                threadId: THREAD_ID,
                payload: {
                    headers: [
                        {
                            name: 'Subject',
                            value:
                                'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                        },
                        { name: 'From', value: 'vici@codestrap.me' },
                    ],
                    body: {
                        data: Buffer.from(
                            mockEmailHistoryWithResolution.data.messages[0].body,
                            'utf8'
                        ).toString('base64'),
                    },
                },
                snippet: 'Mock thread snippet',
            },
            {
                id: mockEmailHistoryWithResolution.data.messages[1].id,
                threadId: THREAD_ID,
                payload: {
                    headers: [
                        {
                            name: 'Subject',
                            value:
                                'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                        },
                        { name: 'From', value: 'dsmiley@codestrap.me' },
                    ],
                    body: {
                        data: Buffer.from(
                            mockEmailHistoryWithResolution.data.messages[1].body,
                            'utf8'
                        ).toString('base64'),
                    },
                },
                snippet: 'Mock thread snippet',
            },
            {
                id: mockEmailHistoryWithResolution.data.messages[2].id,
                threadId: THREAD_ID,
                payload: {
                    headers: [
                        {
                            name: 'Subject',
                            value:
                                'Resolve Meeting Conflicts - ID f41b004c-c032-4f3a-b7b8-be831804cb03',
                        },
                        { name: 'From', value: 'connor.deeks@codestrap.me' },
                    ],
                    body: {
                        data: Buffer.from(
                            mockEmailHistoryWithResolution.data.messages[2].body,
                            'utf8'
                        ).toString('base64'),
                    },
                },
                snippet: 'Mock thread snippet',
            },
        ],
    },
};

export const mockCalendarList = {
    data: {
        items: [
            {
                id: 'mockEventId',
                summary: 'Meet with Komatsu',
                start: { dateTime: '2025-07-21T20:00:00Z' },
                end: { dateTime: '2025-07-21T21:00:00Z' },
            },
            {
                id: 'mockEventId2',
                summary: 'Stand Up',
                start: { dateTime: '2025-07-21T21:00:00Z' },
                end: { dateTime: '2025-07-21T21:30:00Z' },
            },
        ],
        nextPageToken: null,
        // other Schema$Events fields can be added if your code reads them
    },
};

export const mockCalendarInsert = {
    data: {
        id: 'mockEventId',
        hangoutLink: 'https://meet.google.com/mock-link',     // direct Meet link
        conferenceData: {                                    // redundant but harmless
            entryPoints: [
                {
                    entryPointType: 'video',
                    uri: 'https://meet.google.com/mock-link',
                },
            ],
        },
    },
};
