/**
 * sample usage
 // IMPORTANT: there are no strong read after write gaurentees in Foundry!
        // this means have to wait a bit for edits to be applied
        // read this for more details: https://www.palantir.com/docs/foundry/functions/edits-overview#caveat-edits-and-object-search
        // I'm told that if you search by id then you will get results immediatly, but leaving the loop here just for testing.
        const machine = await new Promise<MachineExecutions>(async (resolve, reject) => {
            let machine = getMachineExecution(solution);
            if (machine) {
                console.log(`machine with ID ${machine.id} found immediatly after write`);
                return resolve(machine);
            }

            const interval = 1000; // 1 second interval
            const iterations = 5; // Run 5 times
            const timer = customTimer(interval, iterations);
            // I have no idea why but I can't import timing functions from node so I wrote my own
            for await (const tick of timer) {
                console.log(`Tick ${tick + 1}`);
                console.log(new Date().getSeconds());
                machine = getMachineExecution(solution);
                if (machine) {
                    return resolve(machine);
                }
            }

            return reject(new Error('Machine execution could not be retrieved after 10 seconds'));
        })
 */

export function delay(ms: number) {
    return new Promise<void>((resolve) => {
        const start = Date.now();
        const check = () => {
            if (Date.now() - start >= ms) {
                resolve();
            } else {
                Promise.resolve().then(check); // Schedule the next tick
            }
        };
        check();
    });
}

export async function* customTimer(interval: number, iterations: number) {
    let count = 0;

    while (count < iterations) {
        yield count;
        count++;
        await delay(interval); // Custom delay instead of setTimeout
    }
}