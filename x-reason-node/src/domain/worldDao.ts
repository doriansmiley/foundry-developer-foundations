import type { FoundryClient, WorldDao } from "@xreason/types";

export function makeWorldDao(client: FoundryClient): WorldDao {
    return async ({ message, userId }) => {
        console.log(`makeWorldDao userId: ${userId}`);

        const token = await client.auth.signIn();
        const apiKey = token.access_token;

        const url = `${client.url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/actions/say-hello/apply`;

        const headers = {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        };

        const body = JSON.stringify({
            parameters: {
                message,
            },
            options: {
                returnEdits: "ALL"
            }
        });

        const apiResult = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        const result = await apiResult.json() as any;

        if (!result.edits || result.edits.edits.length === 0) {
            throw new Error('Failed to add hello message to the ontolgoy.');
        }

        console.log(`create world action returned: ${result?.edits?.edits?.[0]}`);

        const worldId = result.edits.edits[0].primaryKey as string;

        const getUrl = `${client.url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/objects/World/${worldId}`;
        const worldFetchResults = await fetch(getUrl, {
            method: "GET",
            headers: headers,
        });

        const world = await worldFetchResults.json() as any;
        console.log(`the world ontology returned: ${JSON.stringify(world)}`)

        return { id: "singleton", greeting: world.message };
    };
}