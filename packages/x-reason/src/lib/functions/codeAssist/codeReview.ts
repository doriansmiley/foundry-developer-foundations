import {
    AbstractReviewState,
    CodeReviewState,
    Context,
    MachineEvent,
    UserIntent,
} from '@codestrap/developer-foundations-types';
import * as path from 'path';
import * as fs from 'fs';

export async function codeReview(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<CodeReviewState> {
    // has the user approved the spec? if so return with the spec file
    // get the proposed design specification and save it
    const codeReviewId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('generateEditMachine')) || '';
    const { approved, file, messages } = context[codeReviewId] as AbstractReviewState

    if (approved) {
        // reload the file to get the latest contents
        // return with the latest contents
        if (file) {
            const abs = file;
            if (!fs.existsSync(abs)) throw new Error(`File does not exist: ${abs}`);
            const contents = await fs.promises.readFile(abs, 'utf8');

            return {
                approved,
                messages,
                file: contents,
            }
        }
    }

    // else get the proposed spec file and save it to disk, then return 
    // we assume the last instance of confirmUserIntent will contain the generated spec file
    const generateEditMachineId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('generateEditMachine')) || '';

    const editMachineJSON = (context[generateEditMachineId] as UserIntent)
        ?.confirmationPrompt;

    if (!editMachineJSON) {
        throw new Error('no edit machine json found!');
    }

    const abs = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `editMachine-${context.machineExecutionId}.json`);
    await fs.promises.writeFile(abs, editMachineJSON, 'utf8');

    return {
        approved: false,
        file: abs,
        messages: [{ system: 'please review the proposed edits file' }],
    }
}
