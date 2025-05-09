import { Context, MachineEvent } from "../../reasoning/types";

// TODO finish this type
export type ProjectStatusReport = {
    id: string,
    estimatedCompletionDate: Date,
    sprintsRemaining: number,
}

// This function will eventually work with our Foundry Native project managment system
// For now it can work with the Ticketing Ontology object to produce a status report and burn down estimate
export async function getProjectStatusReport(context: Context, event?: MachineEvent, task?: string): Promise<ProjectStatusReport> {
    return new Promise((resolve) => {
        // TODO use LLM to extract the input parameters from the context.solution parameter
        // IE "construct the query parameter for getProjectStatus report function using ${context.solution}"
        //@ts-ignore
        setTimeout(() => {
            resolve({
                id: '1234sdf',
                estimatedCompletionDate: new Date(),
                sprintsRemaining: 5,
            });
        }, 500);
    })
}