import type {
  MemoryRecallDao,
} from '@codestrap/developer-foundations-types';
import { getFoundryClient } from '../../foundryClient';
import { searchMemoryRecall } from './delegates/memoryRecall/search';
import { readMemoryRecall } from './delegates/memoryRecall/read';

export function makeMemoryRecallDao(): MemoryRecallDao {
  const client = getFoundryClient();

  return {
    // TODO code out all methods using OSDK API calls
    upsert: async (input: string) => {
      console.log(
        `stub upsert method for ${input}. We do not support upsert for this object type.`
      );
      return {
        createdOn: Date.now(),
        id: 'stubId',
        originalText: 'stub text',
        source: 'stubSource',
        userId: 'stubUserId',
      };
    },
    delete: async (id: string) =>
      console.log(
        `stub delete method called for: ${id}. We do not support deleting RfpRequests but include the method as it is part of the interface.`
      ),
    read: async (id: string) => {
      const memoryRecall = await readMemoryRecall(id, client);

      return memoryRecall;
    },
    search: async (task: string, kValue: number = 1) => {
      const results = await searchMemoryRecall(task, kValue, client);
      // there should be only one results based on the params
      return results;
    },
  };
}
