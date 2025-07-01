import { State } from 'xstate';

jest.mock('@xreason/domain/machineDao', () => ({
    makeMachineDao: jest.fn(() => ({
        upsert: jest.fn(),
        delete: jest.fn(),
        read: jest.fn((machineExecutionId: string) => {
            if (machineExecutionId === 'mock-execution-id') {
                return Promise.resolve(mockExecution);
            } else if (machineExecutionId === 'mock-execution-id2') {
                return Promise.resolve(mockExecution2);
            } else {
                return Promise.resolve(null); // or throw if you want stricter tests
            }
        }),
    })),
}));

let counter = 0;

jest.mock('@xreason/utils', () => ({
    ...jest.requireActual('@xreason/utils'),
    uuidv4: jest.fn(() => (++counter).toString()),
}));

import { mockEmailResponse } from '@xreason/__fixtures__/Email';

jest.mock('@xreason/functions', () => ({
    ...jest.requireActual('@xreason/functions'),
    sendEmail: jest.fn().mockResolvedValue(mockEmailResponse),
}));

import { mockProgrammerResponse1 } from '@xreason/__fixtures__/Gemini';

jest.mock("@xreason/services/geminiService", () => (
    {
        geminiService: jest.fn(() => {
            return mockProgrammerResponse1;
        }),
    }
));

jest.mock('@xreason/domain/trainingDataDao', () => ({
    makeTrainingDataDao: jest.fn(() => ({
        upsert: jest.fn(),
        delete: jest.fn(),
        read: jest.fn((id: string) => {
            return {
                humanReview: 'this anser is good',
                isGood: true,
                machine: mockProgrammerResponse1,
                primaryKey_: '1234',
                solution: 'The task list',
                type: SupportTrainingDataTypes.PROGRAMMER,
                xReason: SupportedEngines.COMS
            }
        }),
        search: jest.fn((xReason: string, type: string) => {
            return [
                {
                    humanReview: 'this anser is good',
                    isGood: true,
                    machine: mockProgrammerResponse1,
                    primaryKey_: '1234',
                    solution: 'The task list',
                    type: SupportTrainingDataTypes.PROGRAMMER,
                    xReason: SupportedEngines.COMS
                }
            ];
        }),
    })),
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

import { headlessInterpreter, MachineEvent, Context, StateConfig, Task, getState } from '@xreason/reasoning';
import { SupportedEngines, SupportTrainingDataTypes } from '@xreason/reasoning/factory';
import { sendEmail } from '@xreason/functions';
import { machineId, machineId2, mockExecution, mockExecution2 } from '@xreason/__fixtures__/MachineExecutions';

describe('testing orchestrator', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
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