import { container } from "@codestrap/developer-foundations-di";
import { Context, EditOp, MachineEvent, ThreadsDao, TYPES, UserIntent } from "@codestrap/developer-foundations-types";

export const schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "EditPlanV0",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "version": { "type": "string", "enum": ["v0"] },
        "ops": {
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "type": "string", "enum": ["ensureImport"] },
                            "file": { "type": "string" },
                            "from": { "type": "string" },
                            "names": { "type": ["array", "null"], "items": { "type": "string" } },
                            "defaultName": { "type": ["string", "null"] },
                            "isTypeOnly": { "type": ["boolean", "null"] }
                        },
                        "required": ["kind", "file", "from", "names", "defaultName", "isTypeOnly"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "type": "string", "enum": ["removeImportNames"] },
                            "file": { "type": "string" },
                            "from": { "type": "string" },
                            "names": { "type": ["array", "null"], "items": { "type": "string" } },
                            "defaultName": { "type": ["boolean", "null"] }
                        },
                        "required": ["kind", "file", "from", "names", "defaultName"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "type": "string", "enum": ["ensureExport"] },
                            "file": { "type": "string" },
                            "name": { "type": "string" }
                        },
                        "required": ["kind", "file", "name"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "type": "string", "enum": ["replaceFunctionBody"] },
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
                            "kind": { "type": "string", "enum": ["updateFunctionReturnType"] },
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
                            "kind": { "type": "string", "enum": ["replaceMethodBody"] },
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
                            "kind": { "type": "string", "enum": ["addUnionMember"] },
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
                            "kind": { "type": "string", "enum": ["updateTypeProperty"] },
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
                            "kind": { "type": "string", "enum": ["insertInterfaceProperty"] },
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
                            "kind": { "type": "string", "enum": ["replaceTypeAlias"] },
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
                            "kind": { "type": "string", "enum": ["replaceInterface"] },
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
                            "kind": { "type": "string", "enum": ["insertEnumMember"] },
                            "file": { "type": "string" },
                            "enumName": { "type": "string" },
                            "memberName": { "type": "string" },
                            "initializer": { "type": ["string", "null"] }
                        },
                        "required": ["kind", "file", "enumName", "memberName", "initializer"]
                    },
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                            "kind": { "type": "string", "enum": ["upsertObjectProperty"] },
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
                            "kind": { "type": "string", "enum": ["renameSymbol"] },
                            "file": { "type": "string" },
                            "oldName": { "type": "string" },
                            "newName": { "type": "string" },
                            "scope": { "type": ["string", "null"], "enum": ["exported", "local", null] }
                        },
                        "required": ["kind", "file", "oldName", "newName", "scope"]
                    }
                ]
            }
        },
    },
    "required": ["version", "ops"]
}

export async function generateEditMachine(context: Context, event?: MachineEvent, task?: string) {
    const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
    let messageThread: string | undefined;

    try {
        const { messages } = await threadsDao.read(context.machineExecutionId!);
        messageThread = messages;
    } catch { /* empty */ }

    const system = `You are a senior TypeScript AST surgeon.
Your ONLY job is to read a design spec and a repo snapshot and produce a precise, JSON edit plan (“ops”) that a TS-Morph executor will run.

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

Below is an example of valid output:
[
  {
    "kind": "ensureImport",
    "file": "src/mod.ts",
    "from": "zod",
    "names": [
      "z"
    ]
  },
  {
    "kind": "removeImportNames",
    "file": "src/mod.ts",
    "from": "x",
    "names": [
      "something"
    ]
  },
  {
    "kind": "insertInterfaceProperty",
    "file": "src/mod.ts",
    "interfaceName": "User",
    "propertySig": "email?: string"
  },
  {
    "kind": "updateTypeProperty",
    "file": "src/mod.ts",
    "typeName": "UserRec",
    "property": "role",
    "newType": "\\"Admin\\" | \\"User\\""
  },
  {
    "kind": "addUnionMember",
    "file": "src/mod.ts",
    "typeName": "Status",
    "member": "\'Deleted\'"
  },
  {
    "kind": "insertEnumMember",
    "file": "src/mod.ts",
    "enumName": "Color",
    "memberName": "Green",
    "initializer": "\\"GREEN\\""
  },
  {
    "kind": "replaceTypeAlias",
    "file": "src/mod.ts",
    "typeName": "ID",
    "typeText": "string & { readonly brand: \\"ID\\" }"
  },
  {
    "kind": "replaceInterface",
    "file": "src/mod.ts",
    "interfaceName": "Settings",
    "interfaceText": "export interface Settings { b: string }"
  },
  {
    "kind": "upsertObjectProperty",
    "file": "src/mod.ts",
    "exportName": "cfg",
    "key": "enabled",
    "valueExpr": "true"
  },
  {
    "kind": "replaceFunctionBody",
    "file": "src/mod.ts",
    "exportName": "add",
    "body": "{ return a - (-b); }"
  },
  {
    "kind": "updateFunctionReturnType",
    "file": "src/mod.ts",
    "exportName": "toStr",
    "returnType": "string"
  },
  {
    "kind": "replaceMethodBody",
    "file": "src/mod.ts",
    "className": "Greeter",
    "methodName": "greet",
    "body": "{ return \`hello, \${name}\`; }"
  },
  {
    "kind": "ensureExport",
    "file": "src/mod.ts",
    "name": "hidden"
  },
  {
    "kind": "renameSymbol",
    "file": "src/mod.ts",
    "oldName": "Greeter",
    "newName": "Speaker"
  }
]
`;
    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-5',
            input: [
                { role: 'system', content: [{ type: 'input_text', text: system }] },
                { role: 'user', content: [{ type: 'input_text', text: user }] },
            ],
            reasoning: { effort: 'low' },
            // Optional: keep or remove web_search; it isn't needed if you fully inline the spec + code
            tools: [{ type: 'web_search', user_location: { type: 'approximate', country: 'US' } }],
            text: {
                format: {
                    type: 'json_schema',
                    name: 'EditPlanV0',
                    schema,
                    strict: true
                },
                verbosity: 'low'
            },
            store: true
        })
    });

    const resp = await response.json();

    // Find the message block inside the output
    const msg = (resp.output ?? []).find((o: any) => o.type === 'message' && o.status === 'completed').content[0].text;
    if (!msg) {
        throw new Error('No message block found in output');
    }
    const parsed = JSON.parse(msg) as EditOp[];
    let parsedMessages: any = [];

    try {
        // if we can parse the message array push new
        parsedMessages = JSON.parse(messageThread!) as { user?: string, system: string }[];
        parsedMessages.push({
            system: JSON.stringify(msg),
        });
    } catch {
        // otherwise just push
        parsedMessages.push({
            system: JSON.stringify(msg),
        });
    }

    await threadsDao.upsert(JSON.stringify(parsedMessages), 'cli-tool', context.machineExecutionId!);


    return parsed;

}
