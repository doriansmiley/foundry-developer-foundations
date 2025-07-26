import type { MachineDao, FoundryClient } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { upsertMachineExecution } from "@xreason/domain/delegates/machine/upsert";
import { readMachineExecution } from "@xreason/domain/delegates/machine/read";

export function makeMachineDao(): MachineDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);
    // TODO remove once Foundry client is used
    console.log(client.ontologyRid);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (
            id: string,
            stateMachine: string,
            state: string,
            logs: string,
            lockOwner?: string,
            lockUntil?: number,
        ) => {
            const machine = await upsertMachineExecution(id, stateMachine, state, logs, client, lockOwner, lockUntil);

            return machine;
        },
        delete: async (machineExecutionId: string) => console.log(`stub delete method called for: ${machineExecutionId}. We do not support deleting machines but include the method as it is part of the interface.`),
        read: async (machineExecutionId: string) => {
            const machine = await readMachineExecution(machineExecutionId, client);

            return machine;
        },
    }
};