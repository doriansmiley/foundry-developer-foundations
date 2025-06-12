import { Context, MachineEvent } from "@xreason/reasoning/types";
import { RfpResponsesResult } from '@xreason/types';

export async function awaitRfpResponses(context: Context, event?: MachineEvent, task?: string): Promise<RfpResponsesResult> {
    /*
    find all request rfp nodes.
    If all are marked as received allResponsesReceived = true
    */
    const allResponses = Object.keys(context)
        .filter(key => key.indexOf('requestRfp') >= 0)
        .map(key => context[key]);

    const allResponsesReceived = allResponses.every(item => item.received);
    const vendors = allResponses.map(item => item.vendorId);

    return {
        allResponsesReceived,
        vendors,
    }
}