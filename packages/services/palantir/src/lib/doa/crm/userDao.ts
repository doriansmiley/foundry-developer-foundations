import type {
  UserDao,
} from '@codestrap/developer-foundations-types';
import { getFoundryClient } from '../../foundryClient';
import { Users } from '@osdk/foundry.admin';

export function makeUserDao(): UserDao {
  const client = getFoundryClient();

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
