import type { MachineDao } from "@xreason/types";

export function makeMachineDao(): MachineDao {
    return async (machineExecutionId: string) => {
        // TODO retrieve machine execution using machine machineExecutionId
        console.log(machineExecutionId);

        return {
            currentState: undefined,
            id: 'undefined',
            logs: undefined,
            machine: undefined,
            state: undefined,
            delete: () => console.log('delete called'),
        };
    };
}