import type {
  RangrClient,
  VendorRequestsDao,
} from '@codestrap/developer-foundations-types';
import { TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';
import { submitRangrRfp } from './delegates/rangr/submit';

export function makeRangrRfpRequestsDao(): VendorRequestsDao {
  const client = container.get<RangrClient>(TYPES.RangrClient);

  return {
    // TODO code out all methods using OSDK API calls
    submit: async (rfp: string, machineExecutionId: string) => {
      const machine = await submitRangrRfp(rfp, machineExecutionId, client);

      return machine;
    },
  };
}
