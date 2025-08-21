import {
  SupportedFoundryClients,
  type ThreadsDao,
} from '@codestrap/developer-foundations-types';
import { upsertThread } from './threads/upsert';
import { readThread } from './threads/read';
import { foundryClientFactory } from '../../factory/foundryClientFactory';

export function makeThreadsDao(): ThreadsDao {
  const client = foundryClientFactory(process.env.FOUNDRY_CLIENT_TYPE || SupportedFoundryClients.PRIVATE, undefined);
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
