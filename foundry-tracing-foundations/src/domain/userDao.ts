import { Users } from "@osdk/foundry.admin";

import type { FoundryClient, UserDao } from "@tracing/types";

export function makeUserDao(client: FoundryClient): UserDao {
    return async () => {
        const user = await Users.getCurrent(client.client);
        console.log('OSDK makeUserDao returned:', user);

        return user;
    };
}