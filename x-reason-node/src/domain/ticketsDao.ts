import type { MachineDao, FoundryClient, TicketsDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { upsertTicket } from "./delegates/tasks/upsert";
import { readTicket } from "./delegates/tasks/read";

export function makeTicketsDao(): TicketsDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);
    // TODO remove once Foundry client is used
    console.log(client.ontologyRid);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (
            id: string,
            alertTitle: string,
            alertType: string,
            description: string,
            severity: string = 'Low',
            status: string = 'Open',
            points?: number,
            assignees?: string,
        ) => {
            const ticket = await upsertTicket(
                client,
                id,
                alertTitle,
                alertType,
                description,
                severity,
                status,
                points,
                assignees,
            );

            return ticket;
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting tickets but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const ticket = await readTicket(id, client);

            return ticket;
        },
    }
};