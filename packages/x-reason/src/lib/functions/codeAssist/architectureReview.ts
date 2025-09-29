import {
    AbstractReviewState,
    ArchitectureReviewState,
    Context,
    MachineEvent,
    UserIntent,
} from '@codestrap/developer-foundations-types';
import * as path from 'path';
import * as fs from 'fs';

export async function architectureReview(
    context: Context,
    event?: MachineEvent,
    task?: string
): Promise<ArchitectureReviewState> {
    // has the user approved the spec? if so return with the spec file
    // get the proposed design specification and save it
    const architectureReviewId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('architectureReview')) || '';
    const { approved, file, messages } = context[architectureReviewId] as AbstractReviewState

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
    const architectImplementationId =
        context.stack
            ?.slice()
            .reverse()
            .find((item) => item.includes('architectImplementation')) || '';

    const architecture = (context[architectImplementationId] as UserIntent)
        ?.confirmationPrompt;

    if (!architecture) {
        throw new Error('no design specification found!');
    }

    const abs = path.resolve(process.env.BASE_FILE_STORAGE, `designDoc-${context.machineExecutionId}.md`);
    await fs.promises.writeFile(abs, architecture, 'utf8');

    return {
        approved: false,
        file: abs,
        messages: [{ system: 'please review the architecture file' }],
    }
}
