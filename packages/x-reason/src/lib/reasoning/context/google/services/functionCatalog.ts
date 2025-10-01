import {
    Context,
    MachineEvent,
    Task,
    ActionType,
    UserIntent,
} from '@codestrap/developer-foundations-types';

import {
    applyEdits,
    confirmUserIntent,
    searchDocumentation,
    architectImplementation,
    generateEditMachine,
    specReview,
    architectureReview,
    codeReview
} from '../../../../functions';


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
                    console.log('dispatching pause from confirmUserIntent');
                    // example of how to pause
                    dispatch({
                        type: 'CONTINUE',
                        payload,
                    });
                },
            },
        ],
        [
            "specReview",
            {
                description:
                    "Use this tool to confirm with the user their intentions and requests for code changes including new code to be generated",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('specReview implementation in function catalog called');
                    const result = await specReview(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`specReview returned: ${JSON.stringify(result)}`);

                    if (result.approved) {
                        console.log('dispatching CONTINUE from specReview');
                        dispatch({
                            type: 'CONTINUE',
                            payload,
                        });
                    } else if (result.reviewRequired) {
                        console.log('dispatching pause from specReview');
                        // pause so the user can review the state machine
                        dispatch({
                            type: 'pause',
                            payload,
                        });
                    } else {
                        // the user has provided feedback we need to capture and rerun the confirm user intent state
                        // target the most recent confirmUserIntentId passing the latest feedback from the end user
                        const confirmUserIntentId =
                            context.stack
                                ?.slice()
                                .reverse()
                                .find((item) => item.includes('confirmUserIntent')) || '';

                        // extract the user response if any. It will be the last message where user is defined
                        const lastMessage =
                            result.messages
                                ?.slice()
                                .reverse()
                                .find((item) => item.user !== undefined);

                        const payload = {
                            confirmUserIntentId,
                            [confirmUserIntentId]: {
                                // we destructure to preserve other keys like result which holds values from user interaction
                                ...context[confirmUserIntentId],
                                userResponse: lastMessage?.user,
                                file: result.file,
                            }
                        };

                        console.log(`dispatching ${confirmUserIntentId} from specReview`);

                        dispatch({
                            type: confirmUserIntentId,
                            payload,
                        });
                    }
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
                    console.log('dispatching pause from architectImplementation');

                    dispatch({
                        type: 'pause',
                        payload,
                    });
                },
            },
        ],
        [
            "architectureReview",
            {
                description:
                    "Use this tool to confirm with the user their intentions and requests for code changes including new code to be generated",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('architectureReview implementation in function catalog called');
                    const result = await architectureReview(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`architectureReview returned: ${JSON.stringify(result)}`);
                    console.log('dispatching pause from architectureReview');

                    if (result.approved) {
                        dispatch({
                            type: 'CONTINUE',
                            payload,
                        });
                    } else {
                        // refactor to target the most recent architectImplementation passing the latest feedback from the end user
                        dispatch({
                            type: 'pause',
                            payload,
                        });
                    }
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
                    console.log('dispatching pause from generateEditMachine');

                    dispatch({
                        type: 'pause',
                        payload,
                    });
                },
            },
        ],
        [
            "codeReview",
            {
                description:
                    "Use this tool to confirm with the user their intentions and requests for code changes including new code to be generated",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('codeReview implementation in function catalog called');
                    const result = await codeReview(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`codeReview returned: ${JSON.stringify(result)}`);
                    console.log('dispatching pause from codeReview');

                    if (result.approved) {
                        dispatch({
                            type: 'CONTINUE',
                            payload,
                        });
                    } else {
                        // refactor to target the most recent generateEditMachine passing the latest feedback from the end user
                        dispatch({
                            type: 'pause',
                            payload,
                        });
                    }
                },
            },
        ],
        [
            "applyEdits",
            {
                description:
                    "Use this tool to execute the approved architecture plan.",
                implementation: async (context: Context, event?: MachineEvent, task?: string) => {
                    console.log('applyEdits implementation in function catalog called');
                    const result = await applyEdits(context, event, task);
                    const payload = getPayload(context, result);
                    console.log(`applyEdits returned: ${JSON.stringify(result)}`);
                    console.log('dispatching CONTINUE from applyEdits');

                    dispatch({
                        type: 'CONTINUE',
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