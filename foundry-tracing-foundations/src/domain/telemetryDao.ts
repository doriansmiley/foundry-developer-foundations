import { TelemtryDao, FoundryClient } from "@tracing/types";

export function makeTelemetryDao(client: FoundryClient): TelemtryDao {
    return async (inputJSON) => {
        console.log(`telemetryDao telemetryDao: ${inputJSON}`);

        const token = await client.auth.signIn();
        const apiKey = token.access_token;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };

        const body = JSON.stringify({
            parameters: {
                inputJSON,
            },
            options: {
                returnEdits: "ALL"
            }
        });

        const apiResults = await fetch(`${client.url}/api/v2/ontologies/${client.ontologyRid}/actions/collect-telemetry/apply`, {
            method: 'POST',
            headers,
            body,
        });

        const apiResponse = await apiResults.json() as any;

        if (apiResponse.errorCode) {
            console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
            throw new Error(`An error occurred while writing telemetry data errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
        }

        return JSON.stringify(apiResponse);
    };
}