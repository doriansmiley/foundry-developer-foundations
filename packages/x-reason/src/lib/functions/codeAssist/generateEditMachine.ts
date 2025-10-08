import * as path from 'path';
import * as fs from 'fs';

import { container } from '@codestrap/developer-foundations-di';
import {
  Context,
  MachineEvent,
  ThreadsDao,
  TYPES,
  UserIntent,
} from '@codestrap/developer-foundations-types';
import { openAiEditOpsGenerator } from './delegates';

export async function generateEditMachine(
  context: Context,
  event?: MachineEvent,
  task?: string
) {
  const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

  const { messages } = await threadsDao.read(context.machineExecutionId!);

  const parsedMessages = JSON.parse(messages || '[]') as {
    user?: string;
    system: string;
  }[];

  const architectImplementationId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('architectImplementation')) || '';

  const { file } = (context[architectImplementationId] as UserIntent);
  // there must be a spec file generated in the previous architectureReview state
  if (!file || !fs.existsSync(file)) throw new Error(`File does not exist: ${file}`);
  // reload the file to get the latest contents so we can capture user edits
  const plan = await fs.promises.readFile(file, 'utf8');

  const generateEditMachineId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('generateEditMachine')) || '';

  const { userResponse, file: editsFile } = (context[generateEditMachineId] as UserIntent) || {};

  let updatedContents;
  if (editsFile) {
    // read the file that may contain updates from the user
    updatedContents = await fs.promises.readFile(editsFile, 'utf8');
  }

  const system = `You are a senior TypeScript AST surgeon.
Your ONLY job is to read a design spec and a repo snapshot and produce a precise, minimal JSON edit plan (“ops”) that a TS-Morph executor will run.

Rules:
- Output MUST be valid JSON matching the provided JSON Schema (strict).
- Only use the allowed op kinds. No free-form code, no extra fields.
- Be surgical: smallest possible diff that satisfies the spec. If an edit is already present, omit it.
- Do not insert comments into mutations that do not support them. For example propertySig can not contain comments!
For example given these modification in the input spec:
--- Modified file ---
Path: packages/types/src/lib/types.ts
\`\`\`typescript
    // Modified excerpt: updated SendEmail schema, EmailContext and OfficeService types
    // (rest of file unchanged)

    export const Schemas = {
        SendEmail: {
            input: Type.Object({
                recipients: Type.Array(Type.String()),
                subject: Type.String(),
                message: Type.String(),
                attachments: Type.Optional(Type.Array(Type.String())), // new
            }),
            output: Type.Object({
                id: Type.String(),
                threadId: Type.String(),
                labelIds: Type.Array(Type.String()),
                warnings: Type.Optional(Type.Array(Type.Object({
                    fileId: Type.String(),
                    reason: Type.String(),
                }))), // new
            }),
        },
        // ... other schemas unchanged
    };

    // Types from Schemas
    export type SendEmailOutput = Static<typeof Schemas.SendEmail.output>;
    export type SendEmailInput = Static<typeof Schemas.SendEmail.input>;

    // ...

    export interface EmailContext {
        from: string;
        recipients: string[];
        subject: string;
        message: string;
        attachments?: string[]; // new: array of Drive file IDs
    }

    // ...

    export type OfficeService = {
        getAvailableMeetingTimes: (
            meetingRequest: MeetingRequest
        ) => Promise<FindOptimalMeetingTimeOutput>;
        scheduleMeeting: (meeting: CalendarContext) => Promise<ScheduleMeetingOutput>;
        sendEmail: (email: EmailContext) => Promise<SendEmailOutput>;
        sendEmailWithAttachments?: (email: EmailContext) => Promise<SendEmailOutput>; // new (optional)
        readEmailHistory: (
            context: ReadEmailHistoryContext
        ) => Promise<ReadEmailOutput>;
        watchEmails: (context: WatchEmailsInput) => Promise<WatchEmailsOutput>;
    };
    \`\`\`
The output would be
[
  {
    "kind": "upsertObjectProperty",
    "file": "packages/types/src/lib/types.ts",
    "exportName": "Schemas",
    "key": "SendEmail",
    "valueExpr": "{\n  input: Type.Object({\n    recipients: Type.Array(Type.String()),\n    subject: Type.String(),\n    message: Type.String(),\n    attachments: Type.Optional(Type.Array(Type.String())),\n  }),\n  output: Type.Object({\n    id: Type.String(),\n    threadId: Type.String(),\n    labelIds: Type.Array(Type.String()),\n    warnings: Type.Optional(\n      Type.Array(\n        Type.Object({\n          fileId: Type.String(),\n          reason: Type.String(),\n        })\n      )\n    ),\n  }),\n}"
  },
  {
    "kind": "insertInterfaceProperty",
    "file": "packages/types/src/lib/types.ts",
    "interfaceName": "EmailContext",
    "propertySig": "attachments?: string[]"
  },
  {
    "kind": "replaceTypeAlias",
    "file": "packages/types/src/lib/types.ts",
    "typeName": "OfficeService",
    "typeText": "{\n  getAvailableMeetingTimes: (\n    meetingRequest: MeetingRequest\n  ) => Promise<FindOptimalMeetingTimeOutput>;\n  scheduleMeeting: (meeting: CalendarContext) => Promise<ScheduleMeetingOutput>;\n  sendEmail: (email: EmailContext) => Promise<SendEmailOutput>;\n  sendEmailWithAttachments?: (email: EmailContext) => Promise<SendEmailOutput>;\n  readEmailHistory: (\n    context: ReadEmailHistoryContext\n  ) => Promise<ReadEmailOutput>;\n  watchEmails: (context: WatchEmailsInput) => Promise<WatchEmailsOutput>;\n}"
  }
]
- Never under any circumstances just replace the types file! There is no reason to do this.
- Don't invent files or symbols. Only reference files/symbols referenced in the provided design specification.
- Respect semantics and API constraints from the spec (e.g., types, signatures, limits).
- If the spec requires work that v0 ops cannot express, list a short note under \`non_applicable\` (do NOT include such work in \`ops\`).

Output fields:
- \`version\`: "v0"
- \`ops\`: array of edit ops (see schema)
- \`non_applicable\`: optional string array of items that require a human or a future opcode.

Never include prose outside the JSON.
`;

  // if there is a spec on file be sure to use that instead of the plan as it can be edited by the user
  const user = userResponse ?
    `
# THE DESIGN SPEC
${plan}

# Your previous response
\`\`\`json
${updatedContents}
\`\`\`

# Feedback from the user
${userResponse}

# TASK
Produce the v0 edit plan to implement the spec in this repo.

Return ONLY JSON.
`
    :
    `
# THE DESIGN SPEC
${plan}

# TASK
Produce the v0 edit plan to implement the spec in this repo.

Return ONLY JSON.
`;

  const { ops, tokenomics } = await openAiEditOpsGenerator(user, system);

  parsedMessages.push({
    system: JSON.stringify(ops),
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  const abs = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `codeEdits-${context.machineExecutionId}.json`);
  await fs.promises.writeFile(abs, JSON.stringify(ops, null, 2), 'utf8');

  return {
    file: abs,
    tokenomics,
  };
}
