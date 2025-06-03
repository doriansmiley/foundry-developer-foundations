import { State } from 'xstate';

import { headlessInterpreter, MachineEvent, Context, StateConfig, Task } from '../reasoning';
let counter = 0;

jest.mock("../utils", () => ({
  ...jest.requireActual("../utils"), 
  uuidv4: jest.fn(() => (++counter).toString()),
}));

import { uuidv4 } from "../utils";

describe('headlessInterpreter', () => {
    const mockDispatch = jest.fn();

    const mockStates: StateConfig[] = [
        {
            id: 'mockTask',
            transitions: [{ on: 'CONTINUE', target: 'nextState' }],
        },
        {
            id: 'nextState',
            transitions: [{ on: 'CONTINUE', target: 'success' }],
        },
        {
            id: 'success',
            type: 'final'
        },
        {
            id: 'failure',
            type: 'final'
        }
    ];

    const mockFunctions = new Map<string, Task>([
        [
            'mockTask',
            {
                description:
                    'mockTask',
                // this is an example of a visual state that requires user interaction
                implementation: (context: Context, event?: MachineEvent) => {
                    console.log('mockTask implementation called');
                },
            },
        ],
        [
            'nextState',
            {
                description:
                    'nextState',
                // this is an example of a visual state that requires user interaction
                implementation: (context: Context, event?: MachineEvent) => {
                    console.log('nextState implementation called');
                },
            },
        ],
    ]);

    beforeEach(() => {
        mockDispatch.mockClear();
        counter = 0;
    });

    it('should initialize and transition states correctly', () => {
        const { done, start, send } = headlessInterpreter(mockStates, mockFunctions, mockDispatch);

        start();

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_STATE',
            value: expect.objectContaining({
                currentState: expect.objectContaining({
                    value: 'mockTask|1',
                    context: {
                        requestId: 'test',
                        status: 0,
                        stack: ['mockTask|1'],
                    },
                }),
            }),
        });

        expect(done()).toBe(false);
        // Simulate the transition
        send({ type: 'CONTINUE' });

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_STATE',
            value: expect.objectContaining({
                currentState: expect.objectContaining({
                    'value': 'nextState|2',
                }),
                context: expect.objectContaining({
                    requestId: 'test',
                    status: 0,
                    stack: ['mockTask|1', 'nextState|2'],
                }),
            }),
        });

        send({ type: 'CONTINUE' });

        expect(done()).toBe(true);

    });

    it('should hydrate from the serialized state', () => {
        const { serialize, stop, start } = headlessInterpreter(mockStates, mockFunctions, mockDispatch);

        start();

        const currentState = mockDispatch.mock.calls[0][0].value.currentState;
        const serializedState = serialize(currentState);
        
        stop();

        mockDispatch.mockClear();

        const { done, serialize: serializeNew, stop: stopNew, send, start: startNew } = headlessInterpreter(
            mockStates,
            mockFunctions,
            mockDispatch,
            undefined,
            State.create(JSON.parse(serializedState))
        );

        startNew();
        send({type: 'CONTINUE'});

        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_STATE',
            value: expect.objectContaining({
                currentState: expect.objectContaining({
                    'value': 'mockTask|1',
                }),
                context: expect.objectContaining({
                    requestId: 'test',
                    status: 0,
                    stack: ['mockTask|1', 'nextState|2'],
                }),
            }),
        });

        // Simulate the transition
        send({ type: 'CONTINUE' });

        expect(mockDispatch).toHaveBeenCalledTimes(3);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_STATE',
            value: expect.objectContaining({
                currentState: expect.objectContaining({
                    value: 'nextState|2',
                    context: {
                        requestId: 'test',
                        status: 0,
                        stack: ['mockTask|1', 'nextState|2', 'success'],
                    },
                }),
            }),
        });

        send({ type: 'CONTINUE' });

        expect(done()).toBe(true);

        stopNew();
    });
});
