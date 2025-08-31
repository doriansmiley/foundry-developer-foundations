#!/usr/bin/env node

import { input } from '@inquirer/prompts';
import { Larry } from '@codestrap/developer-foundations-agents-vickie-bennie';

async function main() {
    const larry = new Larry();

    const answer = await input({ message: 'What would you like to do today:' });
    const result = await larry.askLarry(answer, process.env.FOUNDRY_TEST_USER);

    if (result.status === 200) {
        if (result.state === 'confirmUserIntent') {
            const answer = await input({
                message: `Please clarify what you want to do by answering questions below:
                ${result.message}`
            });
            console.log(answer);
        }
    }
}

main();
