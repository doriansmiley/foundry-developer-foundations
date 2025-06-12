import type { FoundryClient, UserDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { User, Users } from "@osdk/foundry.admin";

export function makeUserDao(): UserDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);

    return async (userId?: string) => {
        if (userId) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const user = await Users.get(client, userId);

            return user;
        }
        const user = await client.getUser();
        console.log('OSDK makeUserDao returned:', user);

        return user;
    };
}