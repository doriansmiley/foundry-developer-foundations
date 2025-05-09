import { State } from 'xstate';
import { whenObjectSet } from '@foundry/functions-testing-lib';
import { Objects, MachineExecutions } from '@foundry/ontology-api';
import { Filters } from "@foundry/functions-api";

import { headlessInterpreter, MachineEvent, Context, StateConfig, Task, getState } from '../reasoning';
import { SupportedEngines, SupportTrainingDataTypes } from '../reasoning/factory';
import { sendEmail } from '../functions';

let counter = 0;

jest.mock('../utils', () => ({
    ...jest.requireActual('../utils'),
    uuidv4: jest.fn(() => (++counter).toString()),
}));

jest.mock('../functions', () => ({
  ...jest.requireActual('../functions'),
  sendEmail: jest.fn(),
}));

// Mock email response data
const mockEmailResponse = {
  id: '8675309',
  threadId: '2468',
  labels: ['labels', 'schmabels'],
};

// Mock the GPT_4o module
jest.mock("@foundry/models-api/language-models", () => ({
    GPT_4o: {
        createChatCompletion: jest.fn(),
    },
    Gemini_2_0_Flash: {
        createGenericChatCompletion: jest.fn(),
    },
}));

import { uuidv4 } from '../utils';
import { GPT_4o, Gemini_2_0_Flash } from "@foundry/models-api/language-models";

jest.mock('@foundry/external-systems/sources', () => ({
    Slack: {
        getSecret: jest.fn().mockReturnValue('mock-bot-token'),
        getHttpsConnection: jest.fn().mockReturnValue({
            url: 'https://slack.com'
        })
    }
}));

// Mock fetch globally since it's used in SendSlackMessage
global.fetch = jest.fn().mockImplementation(() => 
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
            ok: true,
            channel: 'test-channel',
            ts: '1234567890.123456'
        })
    })
) as jest.Mock;

describe('testing interpreterV1Foundry', () => {
    const machineId = 'mock-execution-id';
    const machineId2 = 'mock-execution-id2';

    beforeAll(() => {
        // Create a mock MachineExecution object
        const mockExecution = Objects.create().machineExecutions(machineId);
        mockExecution.machine = `
        [
            {
                "id": "sendEmail",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendSlackMessage"
                    },
                    {
                        "on": "pause",
                        "target": "pause"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "sendSlackMessage",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendEmail"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "sendEmail",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "success"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "success",
                "type": "final"
            },
            {
                "id": "failure",
                "type": "final"
            }
        ]
        `;
        // this is the first state in the machine
        mockExecution.state = `{
            "actions":[{"type":"entry"}],
            "activities":{},
            "meta":{},
            "events":[],
            "value":"pause",
            "context":{
                "status":0,
                "requestId":"test",
                "stack":["sendEmail|2"],
                "sendEmail|2": {
                    "message": "Test message",
                    "channelId": "test-channel"
                }
            },
            "_event":{
                "name":"xstate.init",
                "data":{"type":"xstate.init"},
                "$$type":"scxml",
                "type":"external"
            },
            "_sessionid":"x:1",
            "event":{"type":"xstate.init"},
            "children":{},
            "done":false,
            "tags":[]
        }`;
        // this is the second state in the machine
        const mockExecution2 = Objects.create().machineExecutions(machineId2);
        mockExecution2.machine = `
        [
            {
                "id": "sendEmail",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendSlackMessage"
                    },
                    {
                        "on": "pause",
                        "target": "pause"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "sendSlackMessage",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "getAvailableMeetingTimes"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "getAvailableMeetingTimes",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "scheduleMeeting"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "scheduleMeeting",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendEmail"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "sendEmail",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "success"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "success",
                "type": "final"
            },
            {
                "id": "failure",
                "type": "final"
            }
        ]
        `;
        // this is the second state in the machine used to test backwards execution
        mockExecution2.state = `{
            "actions":[{"type":"entry"}],
            "activities":{},
            "meta":{},
            "events":[],
            "value":"pause",
            "context":{
                "status":0,
                "requestId":"test",
                "stack":["sendEmail","sendSlackMessage"],
                "sendEmail":{
                    "id":"message_id_here",
                    "threadId":"thread_id_here",
                    "labels":["label_name_1","label_name_2"]
                },
                "sendSlackMessage": {
                    "message": "Test message",
                    "channelId": "test-channel"
                }
            },
            "_event":{
                "name":"CONTINUE",
                "data":{
                    "type":"CONTINUE",
                    "payload":{
                        "sendEmail":{
                            "id":"message_id_here",
                            "threadId":"thread_id_here",
                            "labels":["label_name_1","label_name_2"]
                        }
                    }
                },
                "$$type":"scxml",
                "type":"external"
            },
            "_sessionid":"x:1",
            "event":{
                "type":"CONTINUE",
                "payload":{
                    "sendEmail":{
                        "id":"message_id_here",
                        "threadId":"thread_id_here",
                        "labels":["label_name_1","label_name_2"]
                    }
                }
            },
            "historyValue":{
                "current":"sendSlackMessage|aca1f9cd-0284-4d7c-9029-6b96170b0390",
                "states":{}
            },
            "history":{
                "actions":[{"type":"entry"}],
                "activities":{},
                "meta":{},
                "events":[],
                "value":"sendEmail|832f76c6-ee35-44d2-8e27-65310c62352e",
                "context":{
                    "status":0,
                    "requestId":"test",
                    "stack":["sendEmail","sendSlackMessage"]
                },
                "_event":{
                    "name":"xstate.init",
                    "data":{"type":"xstate.init"},
                    "$$type":"scxml",
                    "type":"external"
                },
                "_sessionid":"x:1",
                "event":{"type":"xstate.init"},
                "children":{},
                "done":false,
                "tags":[]
            },
            "children":{},
            "done":false,
            "changed":true,
            "tags":[]
        }`;

        // setup functions mocks
        (sendEmail as jest.Mock).mockResolvedValue(mockEmailResponse);
        
        // Set up the mock
        whenObjectSet(
            Objects.search()
                .machineExecutions()
                .filter((execution) => execution.id.exactMatch(machineId))
                .all()
        ).thenReturn([mockExecution]);

        whenObjectSet(
            Objects.search()
                .machineExecutions()
                .filter((execution) => execution.id.exactMatch(machineId2))
                .all()
        ).thenReturn([mockExecution2]);

        whenObjectSet(
            Objects.search().xReasonTrainingData()
            .filter(item => Filters.and(
            item.xReason.exactMatch(SupportedEngines.COMS),
            item.type.exactMatch(SupportTrainingDataTypes.PROGRAMMER),
            item.isGood.isTrue(),
            ))
            .all()
        ).thenReturn([]);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('it should rehydrate an existing execution, move forward, and save', async () => {
        const solution = {
            input: '', //not relevant for this
            id: machineId || '',
            plan: '', //not relevant for retrieving an execution
        };

        //we don't need to test interpolation in this test case, but leaving here to help facilitate testing that
        const valuesToInterpolateOntoContext = {};

        const result = await getState(solution, true, valuesToInterpolateOntoContext, SupportedEngines.COMS);
        const state = JSON.parse(result.jsonState);

        expect(state.value).toBe('success');
        expect(state.context.stack).toHaveLength(4);
        expect(state.context.stack[0]).toBe('sendEmail|2');
    });

    it('it should rehydrate an existing execution, move backward, and save', async () => {
        const solution = {
            input: '', //not relevant for this
            // note machineId2 starts on the second state: sendSlackMessage
            id: machineId2 || '',
            plan: '', //not relevant for retrieving an execution
        };

        //we don't need to test interpolation in this test case, but leaving here to help facilitate testing that
        const valuesToInterpolateOntoContext = {};

        const result = await getState(solution, false, valuesToInterpolateOntoContext, SupportedEngines.COMS);
        const state = JSON.parse(result.jsonState);

        expect(state.value).toBe('sendEmail');
        expect(state.context.stack).toHaveLength(1)
        expect(state.context.stack[0]).toBe('sendEmail')
    });

    it('it should create a new machine, move forward, and save', async () => {
        const solution = {
            input: '', //not relevant for this
            id: '',
            plan: `1. **Send Email** - **To**: Mike Johnson <mike.johnson@example.com> - **Subject**: Follow-up on Marketing Plan - **Body**: "Hi Mike, following up on the recent discussion about the marketing plan. Please review the points raised by Sarah Lee <sarah.lee@example.com> and David Brown <david.brown@example.com>. Let me know if you need any further input. Best, Cody the AI Assistant"`, //not relevant for retrieving an execution
        };

        // Set up the mock response
        const mockResponse = {
            completion: `[
    {
        "id": "sendEmail|13",
        "transitions": [
            {
                "on": "CONTINUE",
                "target": "success"
            },
            {
                "on": "ERROR",
                "target": "failure"
            }
        ]
    },
    {
        "id": "success",
        "type": "final"
    },
    {
        "id": "failure",
        "type": "final"
    }
]`,
};
        // Configure the mock to return the mockResponse
        (Gemini_2_0_Flash.createGenericChatCompletion as jest.Mock).mockResolvedValue(mockResponse);

        //we don't need to test interpolation in this test case, but leaving here to help facilitate testing that
        const valuesToInterpolateOntoContext = {};

        const result = await getState(solution, true, valuesToInterpolateOntoContext, SupportedEngines.COMS);
        const state = JSON.parse(result.jsonState);
        expect(state.value).toBe('success');
        expect(state.context.stack).toHaveLength(2)
        expect(state.context.stack[0]).toBe('sendEmail|13')
        expect(state.context.stack[1]).toBe('success')
    });
});