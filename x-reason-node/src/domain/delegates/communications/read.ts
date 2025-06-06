import { FoundryClient, Communications } from "@xreason/types";

export async function readCommunications(id: string, client: FoundryClient): Promise<Communications> {
    console.log(`readMachineExecution id: ${id}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const url = `${client.url}/api/v2/ontologies/${process.env.ONTOLOGY_ID}/objects/Communications/${id}`;
    const fetchResults = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const apiResponse = await fetchResults.json() as any;

    if (apiResponse.errorCode) {
        console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
        throw new Error(`An error occurred while calling read communication errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
    }

    console.log(`the machine execution ontology returned: ${JSON.stringify(apiResponse)}`)

    return apiResponse as Communications;
}