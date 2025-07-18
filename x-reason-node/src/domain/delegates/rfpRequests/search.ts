import { FoundryClient, RfpRequests } from "@xreason/types";

export async function searchRfpRequest(machineExecutionId: string, vendorId: string, client: FoundryClient): Promise<RfpRequests[]> {
    console.log(`searchRfpRequest machineExecutionId: ${machineExecutionId} vendorId: ${vendorId}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/RfpRequests/search`;

    const body = JSON.stringify({
        where: {
            type: "and",
            value: [
                {
                    type: "eq",
                    field: "machineExecutionId",
                    value: machineExecutionId,
                },
                {
                    type: "eq",
                    field: "vendorId",
                    value: vendorId,
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
        throw new Error(`An error occurred while calling read RfpRequest errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
    }

    console.log(`the threads ontology returned: ${JSON.stringify(apiResponse)}`)

    return apiResponse.data as RfpRequests[];
}