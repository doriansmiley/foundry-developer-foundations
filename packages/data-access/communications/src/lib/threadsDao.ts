import type {
  ThreadsDao,
  FoundryClient,
} from '@codestrap/developer-foundations-types';
import { TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { upsertThread } from './threads/upsert';
import { readThread } from './threads/read';

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
    delete: async (id: string) =>
      console.log(
        `stub delete method called for: ${id}. We do not support deleting threads but include the method as it is part of the interface.`
      ),
    read: async (id: string) => {
      const machine = await readThread(id, client);

      return machine;
    },
  };
}
