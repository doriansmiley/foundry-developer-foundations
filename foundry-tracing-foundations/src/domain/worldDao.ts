import type { FoundryClient, WorldDao } from "@tracing/types";
import { sayHello, World } from "@hello-world/sdk";
import { Osdk } from "@osdk/client";

export function makeWorldDao(client: FoundryClient): WorldDao {
    return async ({ message, userId }) => {
        console.log(`makeWorldDao userId: ${userId}`);
        const result = await client.client(sayHello).applyAction(
            {
                message,
            },
            {
                $returnEdits: true,
            }
        );
        console.log('makeWorldDao OSDK returned:', result);
        if (result.type !== "edits") {
            throw new Error('Failed to apply action')
        }

        const newlyCreatedObjectId = result.addedObjects[0].primaryKey as string;
        const responseNoErrorWrapper: Osdk.Instance<World> = await client.client(World).fetchOne(newlyCreatedObjectId);
        console.log(`makeWorldDao got back World: ${JSON.stringify(responseNoErrorWrapper, null, 2)}`);

        return { id: "singleton", greeting: responseNoErrorWrapper.message! };
    };
}