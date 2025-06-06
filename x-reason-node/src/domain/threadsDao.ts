import type { ThreadsDao, FoundryClient } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { upsertMachineExecution } from "@xreason/domain/delegates/machine/upsert";
import { readMachineExecution } from "@xreason/domain/delegates/machine/read";

export function makeThreadsDao(): ThreadsDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);
    // TODO remove once Foundry client is used
    console.log(client.ontologyRid);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (id: string, messages: string, appId: string) => {
            const machine = await upsertMachineExecution(id, stateMachine, state, logs, client);

            return machine;
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting machines but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const machine = await readMachineExecution(machineExecutionId, client);

            return machine;
        },
    }
};