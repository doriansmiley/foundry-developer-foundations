import * as path from 'path';
import * as fs from 'fs';

import {
    AbstractReviewState,
    Context,
    MachineEvent,
    SpecReviewState,
    ThreadsDao,
    TYPES,
    UserIntent,
} from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';

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
    const { approved, file, messages } = context[specReviewId] as AbstractReviewState || { approved: false }

    if (approved) {
        // reload the file to get the latest contents so we can capture user edits
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

    const abs = path.resolve(process.env.BASE_FILE_STORAGE || process.cwd(), `spec-${context.machineExecutionId}.md`);
    await fs.promises.writeFile(abs, designSpec, 'utf8');

    // get the most recent message as part of review
    const { user, system } = messages?.[messages?.length - 1] || {};
    // if the user has responded we want to push the system and user response onto the thread history
    // this lets us capture the user feedback as part of the broader message history
    if (user) {
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
        const messageThread = await threadsDao.read(context.machineExecutionId!);
        const parsedMessages = JSON.parse(messageThread?.messages || '[]') as {
            user?: string;
            system?: string;
        }[];

        parsedMessages?.push({ user, system });

        await threadsDao.upsert(
            JSON.stringify(parsedMessages),
            'cli-tool',
            context.machineExecutionId!
        );
    }

    messages?.push({ system: 'Please review the spec file.' })

    return {
        approved: false,
        file: abs,
        messages: messages || [{ system: 'Please review the spec file.' }],
    }
}
