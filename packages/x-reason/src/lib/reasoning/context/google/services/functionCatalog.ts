import {
    Context,
    MachineEvent,
    Task,
    ActionType,
} from '@codestrap/developer-foundations-types';

import { confirmUserIntent, searchDocumentation, architectImplementation, generateEditMachine } from '../../../../functions';


function getPayload(context: Context, result: Record<string, any>) {
    const stateId = context.stack?.[context.stack?.length - 1]
    if (!stateId) {
        throw new Error('Unable to find associated state in the machine stack.')
    }
    const payload = {
        stateId,
        [stateId]: {
            // we destructure to preserve other keys like result which holds values from user interaction
            ...context[stateId],
            ...result
        }
    };

    return payload;
}
export function getFunctionCatalog(dispatch: (action: ActionType) => void) {
    return new Map<string, Task>([
        [
            "confirmUserIntent",
            {
                description:
                    "Use this tool to confirm with the user their intentions and requests for code changes including new code to be generated",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('confirmUserIntent implementation in function catalog called');
                    const result = await confirmUserIntent(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`confirmUserIntent returned: ${JSON.stringify(result)}`);
                    console.log('dispatching CONTINUE from confirmUserIntent');
                    // example of how to pause
                    dispatch({
                        type: 'pause',
                        payload,
                    });
                },
            },
        ],
        [
            "searchDocumentation",
            {
                description:
                    "Use this tool to search documentation once the design specification has been clarified with the developer.",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('searchDocumentation implementation in function catalog called');
                    const result = await searchDocumentation(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`searchDocumentation returned: ${JSON.stringify(result)}`);
                    console.log('dispatching CONTINUE from searchDocumentation');

                    dispatch({
                        type: 'CONTINUE',
                        payload,
                    });
                },
            },
        ],
        [
            "architectImplementation",
            {
                description:
                    "Use this tool to search documentation once the design specification has been clarified with the developer.",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('architectImplementation implementation in function catalog called');
                    const result = await architectImplementation(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`architectImplementation returned: ${JSON.stringify(result)}`);
                    console.log('dispatching CONTINUE from architectImplementation');

                    dispatch({
                        type: 'pause',
                        payload,
                    });
                },
            },
        ],
        [
            "generateEditMachine",
            {
                description:
                    "Use this tool to execute the approved architecture plan.",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('generateEditMachine implementation in function catalog called');
                    const result = await generateEditMachine(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`generateEditMachine returned: ${JSON.stringify(result)}`);
                    console.log('dispatching CONTINUE from generateEditMachine');

                    dispatch({
                        type: 'pause',
                        payload,
                    });
                },
            },
        ],
        [
            "UnsafeQuestion",
            {
                description:
                    "Default state to display for unsafe questions",
                implementation: (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('UnsafeQuestion implementation called');
                    dispatch({ type: 'success' });
                },
            },
        ],
        [
            "UnsupportedQuestion",
            {
                description:
                    "Default state to display for unsupported questions",
                implementation: (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('UnsupportedQuestion implementation called');
                    dispatch({ type: 'success' });
                },
            },
        ]
    ]);
}