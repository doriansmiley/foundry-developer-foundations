import { mockProcessEmailEventExecution } from '@xreason/__fixtures__/MachineExecutions';
import { mockCalendarInsert, mockCalendarList, mockEmailHistoryWithResolution, mockEmailResponse, mockMessageGetResponse, mockMessageGetThreadsResponse } from '@xreason/__fixtures__/Email';


let counter = 0;

jest.mock('@xreason/utils', () => ({
    ...jest.requireActual('@xreason/utils'),
    uuidv4: jest.fn(() => (++counter).toString()),
}));

/* We are not mocking gemini to test our prompts to make sure we get resolutions for our test email chains
jest.mock("@xreason/services/geminiService", () => (
    {
        geminiService: jest.fn(() => {
            return mockProcessEmailEventExecution.machine;
        }),
    }
));*/

jest.mock('@xreason/domain/machineDao', () => ({
    makeMachineDao: jest.fn(() => ({
        upsert: jest.fn((id: string, stateMachine: string, state: string, logs: string) => {
            return mockProcessEmailEventExecution;
        }),
        delete: jest.fn(),
        read: jest.fn((machineExecutionId: string) => {
            return Promise.resolve(mockProcessEmailEventExecution);
        }),
    })),
}));

jest.mock('googleapis', () => ({
    ...jest.requireActual('googleapis'), // Keep other actual exports

    google: {
        // Mock the 'gmail' function as before
        gmail: jest.fn((version: string, auth: any) => {
            return {
                users: {
                    messages: {
                        send: jest.fn((request: any) => {
                            console.log(`Gmail mock messages.send called with: ${request}`);
                            return Promise.resolve(mockEmailResponse);
                        }),
                        list: jest.fn((request: any) => {
                            console.log(`Gmail mock messages.list called with: ${request}`);
                            return Promise.resolve(mockEmailHistoryWithResolution);
                        }),
                        get: jest.fn((request: any) => {
                            console.log(`Gmail mock messages.get called with: ${request}`);
                            return Promise.resolve(mockMessageGetResponse);
                        }),
                    },
                    threads: {
                        get: jest.fn((request: any) => {
                            console.log(`Gmail mock threads.get called with: ${request}`);
                            return Promise.resolve(mockMessageGetThreadsResponse);
                        }),
                    }
                }
            };
        }),

        // Mock the 'calendar' function as before
        calendar: jest.fn((version: string, auth: any) => {
            return {
                events: {
                    insert: jest.fn((request: any) => {
                        console.log(`Calendar mock called with: ${request}`);
                        return Promise.resolve(mockCalendarInsert);
                    }),
                    list: jest.fn((params: any) => {
                        console.log(`Calendar mock events.list called with: ${JSON.stringify(params)}`);
                        return Promise.resolve(mockCalendarList);
                    }),
                },
                /* ---------- freebusy.query mock ---------- */
                freebusy: {
                    query: jest.fn((params: any) => {
                        console.log(`Calendar mock freebusy.query called with: ${JSON.stringify(params)}`);
                        return Promise.resolve({
                            data: {
                                kind: 'calendar#freeBusy',
                                timeMin: params.requestBody.timeMin,
                                timeMax: params.requestBody.timeMax,
                                calendars: {
                                    // each email requested in params.requestBody.items[*].id gets an entry:
                                    'dsmiley@codestrap.me': {
                                        busy: [
                                            {
                                                start: '2025-07-22T18:00:00Z',
                                                end: '2025-07-22T19:00:00Z',
                                            },
                                            {
                                                start: '2025-07-23T15:00:00Z',
                                                end: '2025-07-23T16:30:00Z',
                                            },
                                        ],
                                    },
                                },
                            },
                        });
                    }),
                },
            };
        }),

        // Mock the 'customsearch' function as before
        customsearch: jest.fn((version: string) => {
            return {
                cse: {
                    list: jest.fn((params: any) => {
                        console.log(`Custom Search mock called with: ${params}`);
                        return Promise.resolve({
                            data: {
                                items: [
                                    { title: 'Mock Result 1', link: 'http://mock.com/1' },
                                    { title: 'Mock Result 2', link: 'http://mock.com/2' },
                                ],
                            },
                        });
                    }),
                },
            };
        }),

        // Add a mock for the 'auth' object and its 'GoogleAuth' constructor
        auth: {
            GoogleAuth: jest.fn().mockImplementation((config) => {
                console.log('Mocked GoogleAuth constructor called');

                // Return a mock object that mimics the behavior of a GoogleAuth instance
                return {
                    // Mock methods that are called on the GoogleAuth instance
                    getClient: jest.fn().mockResolvedValue({
                        getRequestHeaders: jest.fn().mockResolvedValue({ /* mock headers */ }), // Mock getRequestHeaders if used
                    }),
                };
            }),
        },
    },
}));

import { uuidv4 } from '@xreason/utils';
import { Vickie } from '@xreason/Vickie';
describe('testing Vickie', () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('it handle a mock event using processEmailEvent', async () => {
        const vickie = new Vickie();
        const result = await vickie.processEmailEvent('eyJlbWFpbEFkZHJlc3MiOiJkc21pbGV5QGNvZGVzdHJhcC5tZSIsImhpc3RvcnlJZCI6MTc5MDUxMn0=', '2025-07-22T20:43:55.184Z');
        expect(result).toBeDefined();
        expect(result.message).toBeDefined();
        expect(result.status).toBe(200);
    }, 120000);

});