import { useQuery } from '@tanstack/react-query';
import { fetchMachine } from '../lib/http';

export function useMachineQuery(baseUrl: string, machineId?: string) {
  return useQuery({
    enabled: !!machineId,
    queryKey: ['machine', { baseUrl, machineId }],
    queryFn: () => fetchMachine(baseUrl, machineId!),
  });
}
