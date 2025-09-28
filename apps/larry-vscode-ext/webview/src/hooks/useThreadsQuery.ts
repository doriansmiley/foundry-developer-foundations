import { useQuery } from '@tanstack/react-query';
import { fetchThreads } from '../lib/http';

export function useThreadsQuery(baseUrl: string) {
  return useQuery({
    queryKey: ['threads', { baseUrl }],
    queryFn: () => fetchThreads(baseUrl),
    refetchInterval: 5000,
    staleTime: 4000,
  });
}
