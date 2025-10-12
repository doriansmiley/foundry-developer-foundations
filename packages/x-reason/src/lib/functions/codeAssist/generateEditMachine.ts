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

# Rules:
- Output MUST be valid JSON matching the provided JSON Schema (strict).
- Only use the allowed op kinds. No free-form code, no extra fields.
- Be surgical: smallest possible diff that satisfies the spec. If an edit is already present, omit it.
- Do not insert comments into mutations that do not support them. For example propertySig can not contain comments!
- Never under any circumstances just replace the types file! There is no reason to do this.
- Don't invent files or symbols. Only reference files/symbols referenced in the provided design specification.
- Respect semantics and API constraints from the spec (e.g., types, signatures, limits).
- If the spec requires work that v0 ops cannot express, list a short note under \`non_applicable\` (do NOT include such work in \`ops\`).
- Obey the rules in the Minimal-Change Playbook below

---

# Output fields:
- \`version\`: "v0"
- \`ops\`: array of edit ops (see schema)
- \`non_applicable\`: optional string array of items that require a human or a future opcode.

---

## Minimal-Change Playbook (must apply in this order!)
*always* sequences dependent edits correctly. 
Think carefully about the required order!
Always emit ops in a topologically sorted order where every imported or referenced symbol is declared and exported before any file (new or existing) that imports/uses it.

Concretely:
Emit ops that introduce or change provider symbols (types/interfaces/enums) in their source file.
Immediately ensureExport for those providers (if needed).
Then emit ops that introduce consumers, including createOrReplaceFile text that imports those providers, and any ensureImport ops in existing files.
Then emit implementation edits (function/method bodies) that rely on those imports.

This lets the executor avoid diagnostics like “cannot find name/type” during the run.

For example, a notional spec that introduces a feature to search email might require the following ordered changes:
Add a new type SearchEmailsInput in packages/types/src/lib/types.ts.
Create a new file packages/services/email/src/lib/searchEmails.ts that imports SearchEmailsInput and exports searchEmails.
Update the app entry packages/app/src/index.ts to import searchEmails.
Resulting in the following edits json
{
  "version": "v0",
  "ops": [
    {
      "kind": "replaceTypeAlias",
      "file": "packages/types/src/lib/types.ts",
      "typeName": "SearchEmailsInput",
      "typeText": "{ userId: string; labels?: string[]; senders?: string[]; subject?: string; maxResults?: number; pageToken?: string; }"
    },
    {
      "kind": "ensureExport",
      "file": "packages/types/src/lib/types.ts",
      "name": "SearchEmailsInput"
    },

    {
      "kind": "createOrReplaceFile",
      "file": "packages/services/email/src/lib/searchEmails.ts",
      "text": "import { SearchEmailsInput } from "@types/lib/types";\n\nexport async function searchEmails(input: SearchEmailsInput) {\n  // minimal stub for now\n  return [] as const;\n}\n",
      "overwrite": false
    },

    {
      "kind": "ensureImport",
      "file": "packages/app/src/index.ts",
      "from": "@services/email/src/lib/searchEmails",
      "names": ["searchEmails"]
    }
  ]
}

---

### Final reminders (you must obey)

* **Always** order ops so that dependencies are considered
* Avoid broad replacements. **Granular edits first**; replace whole type/interface only when necessary.
* Omit no-ops (already in desired state).
* If required work exceeds v0 op capabilities, list it under \`non_applicable\`.
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
