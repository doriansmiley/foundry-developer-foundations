import type { FoundryClient, TrainingDataDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { searchMemoryRecall } from "./delegates/memoryRecall/search";
import { readMemoryRecall } from "./delegates/memoryRecall/read";
import { readTrainingData } from "./delegates/trainingData/read";
import { searchTrainingData } from "./delegates/trainingData/search";

export function makeTrainingDataDao(): TrainingDataDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (
            id: string,
            isGood: boolean,
            type: string,
            xReason: string,
            machine?: string,
            solution?: string,
            humanReview?: string,
        ) => {
            console.log(`stub upsert method for makeTrainingDataDao. We do not support upsert for this object type.`)
            return {
                isGood,
                type,
                xReason,
                machine,
                solution,
                humanReview,
                primaryKey_: id,
            }
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting RfpRequests but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const memoryRecall = await readTrainingData(id, client);

            return memoryRecall;
        },
        search: async (xReason: string, type: string) => {
            const results = await searchTrainingData(xReason, type, client);
            // there should be only one results based on the params
            return results;
        }
    }
};