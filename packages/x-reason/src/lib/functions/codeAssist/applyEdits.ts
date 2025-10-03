import * as fs from 'fs';

import { container } from '@codestrap/developer-foundations-di';
import {
  Context,
  EditOp,
  MachineEvent,
  ThreadsDao,
  TYPES,
} from '@codestrap/developer-foundations-types';
import { executeEditMachine } from './executeEditMachine';

export async function applyEdits(
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

  const generateEditMachineId =
    context.stack
      ?.slice()
      .reverse()
      .find((item) => item.includes('generateEditMachine')) || '';

  const { file } = context[generateEditMachineId] as { file: string };

  let updatedContents;
  if (file && !fs.existsSync(file)) throw new Error(`File does not exist: ${file}`);
  if (file) {
    // read the file that may contain updates from the user
    updatedContents = await fs.promises.readFile(file, 'utf8');
  }

  if (!updatedContents) throw new Error(`updatedContents is empty!`);
  // TODO wrap in try catch
  const edits = JSON.parse(updatedContents) as { ops: EditOp[] };

  const root = process.cwd();
  const baseDir = root.split('foundry-developer-foundations')[0];
  const options = {
    baseDir: `${baseDir}foundry-developer-foundations`,
    tsconfigPath: `${baseDir}foundry-developer-foundations/tsconfig.base.json`,
    dryRun: false,
    write: true,
    format: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onLog: () => { },
  };

  const results = await executeEditMachine(edits.ops, options);

  parsedMessages.push({
    system: `applied edits to the following files: ${results.changedFiles.join(
      ','
    )}`,
  });

  await threadsDao.upsert(
    JSON.stringify(parsedMessages),
    'cli-tool',
    context.machineExecutionId!
  );

  return results;
}
