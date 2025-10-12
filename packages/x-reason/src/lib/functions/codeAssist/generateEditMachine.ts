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
*always* sequences dependent edits correctly. I've split it into (A) global, (B) per-file, and (C) cross-file rules, with a few tiny examples that bias it toward smallest, dependency-safe changes.

### A) Global ordering (cross-file safe)

1. **Create files**

   * \`createOrReplaceFile\` only when the spec provides full contents.
   * Rationale: dependents may import from these files; they must exist first.

2. **Declare/replace types** (providers first)

   * \`replaceTypeAlias\`, \`replaceInterface\`.
   * Use these to **introduce new types** (or when shape changes can’t be expressed granularly).

3. **Edit type members**

   * \`insertInterfaceProperty\`, \`updateTypeProperty\`.

4. **Extend discriminants/sets**

   * \`addUnionMember\`, \`insertEnumMember\`.

5. **Ensure exports for newly added types**

   * \`ensureExport\` for any **new** types you just added/modified that must be public.

6. **Imports in dependents**

   * \`ensureImport\`, \`removeImportNames\`.
   * Rationale: only import after the providing symbol exists & is exported.

7. **Config & maps**

   * \`upsertObjectProperty\`.

8. **Implementations**

   * \`replaceFunctionBody\`, \`updateFunctionReturnType\`, \`replaceMethodBody\`.

9. **Exports for existing values**

   * \`ensureExport\` for existing local symbols (values/functions/consts) that must be exported.

10. **Renames (one-shot, last)**

* \`renameSymbol\`.
* Note: do **not** include this in a second/idempotent pass.

> **Never** replace whole files unless the spec explicitly requires a brand-new file (use \`createOrReplaceFile\`). Prefer granular ops everywhere else.

---

### B) Per-file ordering (when multiple ops hit the same file)

Apply ops to a given file in this order:

1. \`replaceTypeAlias\` / \`replaceInterface\`
2. \`insertInterfaceProperty\` / \`updateTypeProperty\`
3. \`addUnionMember\` / \`insertEnumMember\`
4. \`ensureExport\` (for newly added/changed types)
5. \`ensureImport\` / \`removeImportNames\`
6. \`upsertObjectProperty\`
7. \`replaceFunctionBody\` / \`updateFunctionReturnType\` / \`replaceMethodBody\`
8. \`ensureExport\` (for existing non-type symbols)
9. \`renameSymbol\`

This mirrors the global plan but ensures intra-file dependencies (e.g., import ordering vs. declarations) are safe.

---

### C) Cross-file dependency rules (what to emit in \`ops\` and how to order them)

* **Provider before consumer**:
  If \`B.ts\` imports \`Foo\` from \`A.ts\`, then:

  1. Declare/modify \`Foo\` in \`A.ts\` (+ \`ensureExport\`),
  2. Then \`ensureImport\` in \`B.ts\`.

* **Create before import**:
  If a new file \`A.ts\` is introduced and \`B.ts\` imports from it, emit:

  1. \`createOrReplaceFile\` for \`A.ts\`,
  2. Then any type/interface ops inside \`A.ts\`,
  3. \`ensureExport\` for required symbols,
  4. Finally \`ensureImport\` in \`B.ts\`.

* **Don't import what you didn't export**:
  Always emit \`ensureExport\` for new types before emitting any \`ensureImport\` in other files.

* **Rename last**:
  A rename can invalidate earlier lookups; place \`renameSymbol\` **after** all other ops that refer to the old name.

---

## Ordering examples (few-shot)

### Example 1 — New exported type used elsewhere

**Spec:** Add \`SearchEmailsInput\` in \`packages/types/src/lib/types.ts\` and import it in \`packages/services/email/src/lib/search.ts\`.

**Output (ordered):**

\`\`\`json
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
      "kind": "ensureImport",
      "file": "packages/services/email/src/lib/search.ts",
      "from": "@types/lib/types",
      "names": ["SearchEmailsInput"]
    }
  ]
}
\`\`\`

### Example 2 — Create new file that will be imported

**Spec:** Add \`src/lib/newFeature.ts\` (full contents provided) and import \`makeFeature\` in \`src/app.ts\`.

**Output (ordered):**

\`\`\`json
{
  "version": "v0",
  "ops": [
    {
      "kind": "createOrReplaceFile",
      "file": "src/lib/newFeature.ts",
      "text": "export type FeatureId = string;\nexport function makeFeature(id: FeatureId){ return { id }; }\n",
      "overwrite": false
    },
    {
      "kind": "ensureImport",
      "file": "src/app.ts",
      "from": "./lib/newFeature",
      "names": ["makeFeature"]
    }
  ]
}
\`\`\`

### Example 3 — Add union member and then use it in a function

**Spec:** Add \`'Deleted'\` to \`Status\` in \`src/types.ts\`; adjust \`serializeStatus\` in \`src/status.ts\` to handle it.

**Output (ordered):**

\`\`\`json
{
  "version": "v0",
  "ops": [
    {
      "kind": "addUnionMember",
      "file": "src/types.ts",
      "typeName": "Status",
      "member": "'Deleted'"
    },
    {
      "kind": "replaceFunctionBody",
      "file": "src/status.ts",
      "exportName": "serializeStatus",
      "body": "{ switch(status){ case 'Deleted': return 'X'; default: return String(status); } }"
    }
  ]
}
\`\`\`

---

### Final reminders (you must obey)

* **Always** order ops so that **providers (declarations/exports)** come **before consumers (imports/usages)** across files.
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
