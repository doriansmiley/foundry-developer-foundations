import { Context, MachineEvent } from "@xreason/reasoning/types";
import { uuidv4 } from "@xreason//utils";
import { RangrRequestsDao, RfpRequestsDao, TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";

export type RfpRequestResponse = {
    status: number;
    message: string;
    machineExecutionId: string;
    vendorName: string;
    vendorId: string;
    received: boolean;
    response?: string;
    error?: string;
    receipt?: {
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
    const message = 'We have received your RFP and will respond shortly';

    if (!vendorName || !vendorId) {
        throw (new Error('Vendor name or id not found!'))
    }

    // TODO handle all vendors. The only thing that should change in the code below is the four params for url, certs, etc
    // maybe just create a factory to get the clientId, clientSecret, ontologyRid, and url
    if (vendorId === 'axisdata.com' || vendorId === 'rangrdata.com' || vendorId === 'rangr.com' || vendorId.indexOf('rangr.com') >= 0) {
        // TODO inject ranger dao and execute
        const rangrRfpDao = container.get<RangrRequestsDao>(TYPES.RangrRfpRequestsDao);
        // submit to RANGR
        const rangrRfpResult = rangrRfpDao.submit(task!, context.machineExecutionId!);

        console.log(`RANGR returned the following response: ${rangrRfpResult}`);

    }

    // record the request in our system, this is useful for demos and for our records
    const rfpDao = container.get<RfpRequestsDao>(TYPES.RfpRequestsDao);
    await rfpDao.upsert(task!, message, vendorId, context.machineExecutionId!);

    return {
        // TODO replace with status and message from service
        status: 200,
        message,
        // Note: vendor name and ID are extract via the LLM above
        vendorName,
        vendorId,
        received: false,
        // TODO add executionId to context
        machineExecutionId: context.executionId,
        // TODO replace with reciept from service
        receipt: {
            id: uuidv4(),
            timestamp: new Date(),
        }
    }
}