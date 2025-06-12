import { FoundryClient, TrainingData } from "@xreason/types";

export async function searchTrainingData(xReason: string, type: string, client: FoundryClient): Promise<TrainingData[]> {
    console.log(`searchTrainingData xReason: ${xReason} type: ${type}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/XReasonTrainingData/search`;

    const body = JSON.stringify({
        where: {
            type: "and",
            value: [
                {
                    type: "eq",
                    field: "xReason",
                    value: xReason,
                },
                {
                    type: "eq",
                    field: "type",
                    value: type,
                }
            ]
        }
    });

    const apiResult = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
    });

    const apiResponse = await apiResult.json() as any;

    if (apiResponse.errorCode) {
        console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
        throw new Error(`An error occurred while calling read Training Data errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
    }

    console.log(`the threads ontology returned: ${JSON.stringify(apiResponse)}`)

    return apiResponse as TrainingData[];
}