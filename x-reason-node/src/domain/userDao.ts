import type { FoundryClient, UserDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";

export function makeUserDao(): UserDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);

    return async () => {
        const user = await client.getUser();
        console.log('OSDK makeUserDao returned:', user);

        return user;
    };
}