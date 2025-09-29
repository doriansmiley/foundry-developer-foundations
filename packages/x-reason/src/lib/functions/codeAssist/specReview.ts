import {
    AbstractReviewState,
    Context,
    MachineEvent,
    SpecReviewState,
    UserIntent,
} from '@codestrap/developer-foundations-types';
import * as path from 'path';
import * as fs from 'fs';

export async function specReview(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<SpecReviewState> {
    // has the user approved the spec? if so return with the spec file
    // get the proposed design specification and save it
    const specReviewId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('specReview')) || '';
    const { approved, file, messages } = context[specReviewId] as AbstractReviewState

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
    const confirmUserIntentId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('confirmUserIntent')) || '';

    const designSpec = (context[confirmUserIntentId] as UserIntent)
        ?.confirmationPrompt;

    if (!designSpec) {
        throw new Error('no design specification found!');
    }

    const abs = path.resolve(process.env.BASE_FILE_STORAGE, `spec-${context.machineExecutionId}.md`);
    await fs.promises.writeFile(abs, designSpec, 'utf8');

    return {
        approved: false,
        file: abs,
        messages: [{ system: 'please review the spec file' }],
    }
}
