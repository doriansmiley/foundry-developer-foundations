import { container } from "@codestrap/developer-foundations-di";
import { Context, EditOp, MachineEvent, ThreadsDao, TYPES, UserIntent } from "@codestrap/developer-foundations-types";

const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "EditPlanV0",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "version": { "const": "v0" },
        "ops": {
            "type": "array",
            "items": {
                "oneOf": [
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "ensureImport" },
                            "file": { "type": "string" },
                            "from": { "type": "string" },
                            "names": { "type": "array", "items": { "type": "string" } },
                            "defaultName": { "type": "string" },
                            "isTypeOnly": { "type": "boolean" }
                        },
                        "required": ["kind", "file", "from"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "removeImportNames" },
                            "file": { "type": "string" },
                            "from": { "type": "string" },
                            "names": { "type": "array", "items": { "type": "string" } },
                            "defaultName": { "type": "boolean" }
                        },
                        "required": ["kind", "file", "from"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "ensureExport" },
                            "file": { "type": "string" },
                            "name": { "type": "string" }
                        },
                        "required": ["kind", "file", "name"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "replaceFunctionBody" },
                            "file": { "type": "string" },
                            "exportName": { "type": "string" },
                            "body": { "type": "string" }
                        },
                        "required": ["kind", "file", "exportName", "body"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "updateFunctionReturnType" },
                            "file": { "type": "string" },
                            "exportName": { "type": "string" },
                            "returnType": { "type": "string" }
                        },
                        "required": ["kind", "file", "exportName", "returnType"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "replaceMethodBody" },
                            "file": { "type": "string" },
                            "className": { "type": "string" },
                            "methodName": { "type": "string" },
                            "body": { "type": "string" }
                        },
                        "required": ["kind", "file", "className", "methodName", "body"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "addUnionMember" },
                            "file": { "type": "string" },
                            "typeName": { "type": "string" },
                            "member": { "type": "string" }
                        },
                        "required": ["kind", "file", "typeName", "member"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "updateTypeProperty" },
                            "file": { "type": "string" },
                            "typeName": { "type": "string" },
                            "property": { "type": "string" },
                            "newType": { "type": "string" }
                        },
                        "required": ["kind", "file", "typeName", "property", "newType"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "insertInterfaceProperty" },
                            "file": { "type": "string" },
                            "interfaceName": { "type": "string" },
                            "propertySig": { "type": "string" }
                        },
                        "required": ["kind", "file", "interfaceName", "propertySig"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "replaceTypeAlias" },
                            "file": { "type": "string" },
                            "typeName": { "type": "string" },
                            "typeText": { "type": "string" }
                        },
                        "required": ["kind", "file", "typeName", "typeText"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "replaceInterface" },
                            "file": { "type": "string" },
                            "interfaceName": { "type": "string" },
                            "interfaceText": { "type": "string" }
                        },
                        "required": ["kind", "file", "interfaceName", "interfaceText"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "insertEnumMember" },
                            "file": { "type": "string" },
                            "enumName": { "type": "string" },
                            "memberName": { "type": "string" },
                            "initializer": { "type": "string" }
                        },
                        "required": ["kind", "file", "enumName", "memberName"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "upsertObjectProperty" },
                            "file": { "type": "string" },
                            "exportName": { "type": "string" },
                            "key": { "type": "string" },
                            "valueExpr": { "type": "string" }
                        },
                        "required": ["kind", "file", "exportName", "key", "valueExpr"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "const": "renameSymbol" },
                            "file": { "type": "string" },
                            "oldName": { "type": "string" },
                            "newName": { "type": "string" },
                            "scope": { "type": "string", "enum": ["exported", "local"] }
                        },
                        "required": ["kind", "file", "oldName", "newName"]
                    }
                ]
            }
        },
        "non_applicable": {
            "type": "array",
            "items": { "type": "string" }
        }
    },
    "required": ["version", "ops"]
}


export async function generateEditMachine(context: Context, event?: MachineEvent, task?: string) {
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
    let messageThread: string | undefined;

    try {
        const { messages } = await threadsDao.read(context.executionId);
        messageThread = messages;
    } catch { /* empty */ }

    const system = `You are a senior TypeScript AST surgeon.
Your ONLY job is to read a design spec and a repo snapshot and produce a precise, minimal JSON edit plan (“ops”) that a TS-Morph executor will run.

Rules:
- Output MUST be valid JSON matching the provided JSON Schema (strict).
- Only use the allowed op kinds. No free-form code, no extra fields.
- Be surgical: smallest possible diff that satisfies the spec. If an edit is already present, omit it.
- Don't invent files or symbols. Only reference files/symbols visible in the repo snapshot.
- Respect semantics and API constraints from the spec (e.g., types, signatures, limits).
- If the spec requires work that v0 ops cannot express (e.g., creating a new file), list a short note under \`non_applicable\` (do NOT include such work in \`ops\`).

Output fields:
- \`version\`: "v0"
- \`ops\`: array of edit ops (see schema)
- \`non_applicable\`: optional string array of items that require a human or a future opcode.

Never include prose outside the JSON.
`;

    const user = `
## MESSAGE THREAD THAT INCLUDES THE DESIGN SPEC
${messageThread}

## TASK
Produce the v0 edit plan to implement the spec in this repo.
- Only reference paths that exist in the design specification contained in the message thread.
- Use the smallest set of operations.
- If something is already correct, omit that operation.
- If the spec asks for behavior outside v0 op coverage (e.g., create new file), write a brief note in \`non_applicable\`.

Return ONLY JSON.
`;
    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-5-mini',
            input: [
                { role: 'system', content: [{ type: 'input_text', text: system }] },
                { role: 'user', content: [{ type: 'input_text', text: user }] },
            ],
            reasoning: { effort: 'low' },
            text: { verbosity: 'low' },
            // Optional: keep or remove web_search; it isn't needed if you fully inline the spec + code
            tools: [{ type: 'web_search', user_location: { type: 'approximate', country: 'US' } }],
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'EditPlanV0',
                    schema: schema,
                    strict: true
                }
            },
            store: true
        })
    });

    const data = await response.json() as EditOp[];

    try {
        const { messages } = await threadsDao.read(context.machineExecutionId!);

        const parsedMessages = JSON.parse(messages!) as { user?: string, system: string }[];
        parsedMessages.push({
            system: JSON.stringify(data),
        });

        await threadsDao.upsert(JSON.stringify(parsedMessages), 'cli-tool', context.machineExecutionId!);

    } catch { /* empty */ }

    return data;

}
