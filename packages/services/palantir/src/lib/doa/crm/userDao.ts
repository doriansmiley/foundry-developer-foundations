import {
  SupportedFoundryClients,
  type UserDao,
} from '@codestrap/developer-foundations-types';
import { Users } from '@osdk/foundry.admin';
import { foundryClientFactory } from '../../factory/foundryClientFactory';

export function makeUserDao(): UserDao {
  const client = foundryClientFactory(process.env.FOUNDRY_CLIENT_TYPE || SupportedFoundryClients.PRIVATE, undefined);

  return async (userId?: string) => {
    if (userId) {
      const user = await Users.get(client.client, userId);

      return user;
    }
    const user = await client.getUser();
    console.log('OSDK makeUserDao returned:', user);

    return user;
  };
}
