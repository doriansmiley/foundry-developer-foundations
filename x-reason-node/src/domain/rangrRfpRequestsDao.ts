import type { RangrClient, RangrRequestsDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { submitRangrRfp } from "@xreason/domain/delegates/rangr/submit";

export function makeRangrRfpRequestsDao(): RangrRequestsDao {
    const client = container.get<RangrClient>(TYPES.RangrClient);

    return {
        // TODO code out all methods using OSDK API calls
        submit: async (
            rfp: string,
            machineExecutionId: string,
        ) => {
            const machine = await submitRangrRfp(rfp, machineExecutionId, client);

            return machine;
        },
    }
};