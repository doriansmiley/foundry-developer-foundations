import { State } from 'xstate';
import { whenObjectSet } from '@foundry/functions-testing-lib';
import { Objects, MachineExecutions } from '@foundry/ontology-api';
import { Filters } from "@foundry/functions-api";

import { headlessInterpreter, MachineEvent, Context, StateConfig, Task, getState } from '../reasoning';
import { Text2Action } from '../';
import { SupportedEngines } from '../reasoning/factory';
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

// Mock the module
jest.mock("@foundry/external-systems/sources", () => ({
  FoundryApis: {
    getSecret: jest.fn(() => "test"),
    getHttpsConnection: jest.fn(() => ({ url: "test" }))
  }
}));

const mockFetchResponse = {
  validation: {
    result: "VALID",
    submissionCriteria: [],
    parameters: {}
  },
  edits: {
    type: "edits",
    edits: [
      {
        type: "modifyObject",
        primaryKey: "310e5c75-9ccf-4b01-8d0b-f4bf9bf6667e",
        objectType: "MachineExecutions"
      }
    ],
    addedObjectCount: 0,
    modifiedObjectsCount: 1,
    deletedObjectsCount: 0,
    addedLinksCount: 0,
    deletedLinksCount: 0
  }
};

const mockResponse = (): Response =>
  ({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: {},
    json: () => Promise.resolve(mockFetchResponse)
  } as Response);

//@ts-ignore
global.fetch = jest.fn(() => Promise.resolve(mockResponse()));

import { uuidv4 } from '../utils';
import { GPT_4o } from "@foundry/models-api/language-models";
import { FoundryApis } from "@foundry/external-systems/sources";


describe('testing Text2Action', () => {
    const machineId = 'mock-execution-id';
    const machineId2 = 'mock-execution-id2';

    beforeAll(() => {
        // Create a mock MachineExecution object
        const mockExecution = Objects.create().machineExecutions(machineId);
        mockExecution.machine = `
        [
            {
                "id": "sendEmail|1",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendEmail|5"
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
                "id": "sendEmail|5",
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
        mockExecution.state = `{"actions":[{"type":"entry"}],"activities":{},"meta":{},"events":[],"value":"sendEmail|1","context":{"status":0,"requestId":"test","stack":["sendEmail|1"]},"_event":{"name":"xstate.init","data":{"type":"xstate.init"},"$$type":"scxml","type":"external"},"_sessionid":"x:1","event":{"type":"xstate.init"},"children":{},"done":false,"tags":[]}`;

        // setup functions mocks
        (sendEmail as jest.Mock).mockResolvedValue(mockEmailResponse);
        // TODO add more e2e mocks as we setup live integrations for ts fn()'s

        // Set up the mock
        whenObjectSet(
            Objects.search()
                .machineExecutions()
                .filter((execution) => execution.id.exactMatch(machineId))
                .all()
        ).thenReturn([mockExecution]);

        whenObjectSet(
            Objects.search().xReasonTrainingData()
            .filter(item => Filters.and(
            item.xReason.exactMatch(SupportedEngines.COMS),
            item.isGood.isTrue(),
            ))
            .all()
        ).thenReturn([]);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('it should rehydrate an existing execution and return pause', async () => {
        const solution = {
            input: '', //not relevant for this
            id: machineId || '',
            plan: '', //not relevant for retrieving an execution
        };

        //we don't need to test interpolation in this test case, but leaving here to help facilitate testing that
        const valuesToInterpolateOntoContext = {};

        // Set up the mock response
        const mockResponse = {
            choices: [
                {
                    message: {
                        content: "sendEmail|5",
                    },
                },
            ],
        };
        // Configure the mock to return the mockResponse
        (GPT_4o.createChatCompletion as jest.Mock).mockResolvedValue(mockResponse);
        const t2a = new Text2Action();
        const result = await t2a.upsertState(undefined, true, machineId);
        const state = JSON.parse(result.state!);
        // TODO make this test better. Currently we are returning the mock value which
        // does not reflect the updates which should return the success state
        expect(state.value).toBe('sendEmail|1');
        expect(state.context.stack).toHaveLength(1)
        expect(state.context.stack[0]).toBe('sendEmail|1')
    });

});