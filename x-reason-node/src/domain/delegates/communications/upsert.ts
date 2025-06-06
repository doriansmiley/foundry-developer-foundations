import { Communications, FoundryClient } from "@xreason/types";
import { uuidv4 } from "@xreason/utils";

export async function upsertCommunications(
    channel: string,
    formattedMessage: string,
    status: string,
    taskList: string,
    comType: string,
    owner: string,
    client: FoundryClient,
    questionPrompt?: string,
    tokens?: number,
    id: string = uuidv4(),
): Promise<Communications> {
    console.log(`upsertCommunications id: ${id}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const url = `${client.url}/api/v2/ontologies/${process.env.ONTOLOGY_ID}/actions/upsert-communication/apply`;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        parameters: {
            channel,
            formattedMessage,
            status,
            taskList,
            comType,
            owner,
            questionPrompt,
            tokens,
            id,
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
        throw new Error('Failed to upsert communications to the ontolgoy.');
    }

    console.log(`upsert communications action returned: ${result?.edits?.edits?.[0]}`);

    const commsId = result.edits.edits[0].primaryKey as string;

    const getUrl = `${client.url}/api/v2/ontologies/${process.env.ONTOLOGY_ID}/objects/Communications/${commsId}`;
    const fetchResults = await fetch(getUrl, {
        method: "GET",
        headers: headers,
    });

    const comms = await fetchResults.json() as Communications;
    console.log(`the machine execution ontology returned: ${JSON.stringify(comms)}`)

    return comms;
}