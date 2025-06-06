import type { ThreadsDao, FoundryClient } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { upsertThread } from "@xreason/domain/delegates/threads/upsert";
import { readThread } from "@xreason/domain/delegates/threads/read";

export function makeThreadsDao(): ThreadsDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);
    // TODO remove once Foundry client is used
    console.log(client.ontologyRid);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (messages: string, appId: string, id?: string) => {
            const machine = await upsertThread(messages, appId, client, id);

            return machine;
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting threads but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const machine = await readThread(id, client);

            return machine;
        },
    }
};