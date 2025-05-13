import type { FoundryClient, UserDao } from "@hello/types";

export function makeUserDao(client: FoundryClient): UserDao {
    return async () => {
        const user = await client.getUser();
        console.log('OSDK makeUserDao returned:', user);

        return user;
    };
}