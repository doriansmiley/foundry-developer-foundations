#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import { Larry } from '@codestrap/developer-foundations-agents-vickie-bennie';
import { container } from '@codestrap/developer-foundations-di';
import { Context, MachineDao, TYPES } from '@codestrap/developer-foundations-types';
import { SupportedEngines } from '@codestrap/developer-foundations-x-reason';

async function main() {
    const larry = new Larry();

    const answer = await input({ message: 'What would you like to do today:' });
    const result = await larry.askLarry(answer, process.env.FOUNDRY_TEST_USER);

    if (result.status === 200) {
        if (result.state === 'confirmUserIntent') {
            const userResponse = await input({
                message: `Please clarify what you want to do by answering questions below:
                ${result.message}`
            });
            console.log(answer);
            const machineDao = container.get<MachineDao>(TYPES.MachineDao);
            const { state, lockOwner, lockUntil, logs, machine } =
                await machineDao.read(result.executionId);

            // get the target stateId to apply the contextual update to, in this case where we left off
            const { context } = JSON.parse(state!) as { context: Context };
            // find the last instance of a resolveUnavailableAttendees state in the stack
            const currentStateId = context.stack
                ?.slice()
                .reverse()
                .find((item) => item.includes('confirmUserIntent'));

            const contextUpdate = {
                [currentStateId]: { userResponse: userResponse }, // I chose to name the key userResponse, but you can choose any key you like, but it needs to make sense to the LLM
            };

            const nextState = await larry.getNextState(
                undefined,
                true,
                result.executionId,
                JSON.stringify(contextUpdate),
                SupportedEngines.GOOGLE_SERVICES_CODE_ASSIST // IMPORTANT: The X-Reason factory needs to be updated to support whatever key you define for this x-Reason
            );

            console.log(nextState.value);
        }
    }
}

main();
