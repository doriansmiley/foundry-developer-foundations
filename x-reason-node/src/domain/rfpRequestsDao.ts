import type { FoundryClient, RfpRequestsDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { upsertRfpRequest } from "@xreason/domain/delegates/rfpRequests/upsert";
import { readRfpRequest } from "@xreason/domain/delegates/rfpRequests/read";
import { searchRfpRequest } from "./delegates/rfpRequests/search";

export function makeRfpRequestsDao(): RfpRequestsDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (
            rfp: string,
            rfpVendorResponse: string,
            vendorId: string,
            machineExecutionId: string,
            id?: string,
            rfpResponseStatus?: number,
        ) => {
            const machine = await upsertRfpRequest(rfp, rfpVendorResponse, vendorId, machineExecutionId, client, id, rfpResponseStatus);

            return machine;
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting RfpRequests but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const machine = await readRfpRequest(id, client);

            return machine;
        },
        search: async (machineExecutionId: string, vendorId: string) => {
            const results = await searchRfpRequest(machineExecutionId, vendorId, client);
            // there should be only one results based on the params
            return results[0];
        }
    }
};