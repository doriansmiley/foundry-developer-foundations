export const machineId = 'mock-execution-id';
export const machineId2 = 'mock-execution-id2';

export const mockExecution = {
    id: machineId,
    state: `{
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
        }`,
    machine: `[
            {
                "id": "sendEmail|2",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendSlackMessage|3"
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
                "id": "sendSlackMessage|3",
                "transitions": [
                    {
                        "on": "CONTINUE",
                        "target": "sendEmail|4"
                    },
                    {
                        "on": "ERROR",
                        "target": "failure"
                    }
                ]
            },
            {
                "id": "sendEmail|4",
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
        ]`
};

// this is the second state in the machine
export const mockExecution2 = {
    id: machineId2,
    state: `{
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
        }`,
    machine: `
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
        `
};

export const mockModifyFetchResponse = {
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

export const mockModifyApiResponse = (): Response =>
({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: {},
    json: () => Promise.resolve(mockModifyFetchResponse)
} as Response);

export const text2ActionTestMachineExecution = {
    machine: `
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
        `,
    state: `{"actions":[{"type":"entry"}],"activities":{},"meta":{},"events":[],"value":"sendEmail|1","context":{"status":0,"requestId":"test","stack":["sendEmail|1"], "sendEmail|1": {"message": "test", "subject": "test subject", "recipients": ["test@example.com"],"modelDialog": "sample dialog", "ts": "1234567890"}},"_event":{"name":"xstate.init","data":{"type":"xstate.init"},"$$type":"scxml","type":"external"},"_sessionid":"x:1","event":{"type":"xstate.init"},"children":{},"done":false,"tags":[]}`,
};
