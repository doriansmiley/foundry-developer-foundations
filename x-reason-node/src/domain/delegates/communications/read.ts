import { FoundryClient, Communications } from "@xreason/types";

export async function readCommunications(id: string, client: FoundryClient): Promise<Communications> {
    console.log(`readMachineExecution id: ${id}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const url = `${client.url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/objects/Communications/${id}`;
    const fetchResults = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const communication = await fetchResults.json() as Communications;
    console.log(`the machine execution ontology returned: ${JSON.stringify(communication)}`)

    return communication;
}