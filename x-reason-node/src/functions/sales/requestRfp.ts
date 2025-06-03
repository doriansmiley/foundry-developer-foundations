import { RangrApis } from "@foundry/external-systems/sources";
import { createConfidentialOauthClient } from "@osdk/oauth";

import { Context, MachineEvent } from "../../reasoning/types";
import { uuidv4 } from "../../utils";

export type RfpRequestResponse = {
    status: number;
    message: string;
    machineExecutionId: string;
    vendorName: string;
    vendorId: string;
    error?: string;
    reciept?: {
        id: string,
        timestamp: Date,
    };
}

export type RfpInput = {
    objectives: string,
    deliverables: string,
    timeline: { label: string, date: Date }[],
}

function extractDomain(input: string) {
    const match = input.match(/<([^>]+)>/);
    return match ? match[1] : null;
}

function extractVendorName(input: string) {
    const match = input.match(/:\s*([\w\s]+)\s*</);
    return match ? match[1].trim() : null;
}


export async function requestRfp(context: Context, event?: MachineEvent, task?: string): Promise<RfpRequestResponse> {
    const vendorName = extractVendorName(task!);
    const vendorId = extractDomain(task!);
    let message = 'TODO add the actual response message';

    if (!vendorName || !vendorId) {
        throw (new Error('Vendor name or id not found!'))
    }

    // TODO hadnle all verdors. The only thing that should change in the code below is the four parms for url, serts, etc
    // maybe just create a factory to get the clientId, clientSecret, ontologyRid, and url
    if (vendorId === 'axisdata.com') {
        // TODO: specify secret name additionalSecretOsdkOntologyRid
        const clientId = RangrApis.getSecret('additionalSecretOsdkClientId');
        const clientSecret = RangrApis.getSecret('additionalSecretOsdkSecret');
        const ontologyRid = RangrApis.getSecret('additionalSecretOsdkOntologyRid');
        const url = RangrApis.getHttpsConnection().url;

        const scopes: string[] = [
            "api:ontologies-read",
            "api:ontologies-write",
            "api:admin-read",
            "api:connectivity-read",
            "api:connectivity-write",
            "api:connectivity-execute",
            "api:mediasets-read",
            "api:mediasets-write"
        ]

        try {
            const auth = createConfidentialOauthClient(clientId, clientSecret, url, scopes);
            const token = await auth.signIn();
            const apiKey = token.access_token;

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            };
            // TODO refact or to add the type parameter: COMS or SALES 
            // once it's been added to the the action params int he ontolgoy
            const body = JSON.stringify({
                parameters: {
                    message: task,
                    machineExecutionId: context.machineExcecutionId,
                }
            });

            const apiResults = await fetch(`${url}/api/v2/ontologies/${ontologyRid}/actions/submit-rfp-request/apply`, {
                method: 'POST',
                headers,
                body,
            });

            const apiResponse = await apiResults.json();

            console.log(JSON.stringify(apiResponse));

            message = JSON.stringify(apiResponse);

        } catch (e) {
            console.log(e);
        }

    }

    return {
        // TODO replace with status and message from service
        status: 200,
        message,
        // Note: vendor name and ID are extract via the LLM above
        vendorName,
        vendorId,
        // TODO add executionId to context
        machineExecutionId: context.executionId,
        // TODO replace with reciept from service
        reciept: {
            id: uuidv4(),
            timestamp: new Date(),
        }
    }
}