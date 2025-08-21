import {
  SupportedFoundryClients,
  type CommsDao,
} from '@codestrap/developer-foundations-types';
import { readCommunications } from './communications/read';
import { upsertCommunications } from './communications/upsert';
import { foundryClientFactory } from '../../factory/foundryClientFactory';

export function makeCommsDao(): CommsDao {
  const client = foundryClientFactory(process.env.FOUNDRY_CLIENT_TYPE || SupportedFoundryClients.PRIVATE, undefined);
  // TODO remove once Foundry client is used
  console.log(client.ontologyRid);

  return {
    // TODO code out all methods using OSDK API calls
    upsert: async (
      channel: string,
      formattedMessage: string,
      status: string,
      taskList: string,
      comType: string,
      owner: string,
      questionPrompt?: string,
      tokens?: number,
      id?: string
    ) => {
      const comms = await upsertCommunications(
        channel,
        formattedMessage,
        status,
        taskList,
        comType,
        owner,
        client,
        questionPrompt,
        tokens,
        id
      );

      return comms;
    },
    delete: async (id: string) =>
      console.log(
        `stub delete method called for: ${id}. We do not support deleting machines but include the method as it is part of the interface.`
      ),
    read: async (id: string) => {
      const comms = await readCommunications(id, client);

      return comms;
    },
  };
}
