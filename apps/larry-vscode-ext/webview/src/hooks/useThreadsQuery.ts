import { useQuery } from '@tanstack/react-query';
import { fetchThreads } from '../lib/http';
import { queryClient } from '../lib/query';

export function useThreadsQuery(baseUrl: string) {
  return {
    data: {
      items: [
        {
          id: '55eb66cb-00b3-4016-99ea-afaaedc8f791',
          label: 'Create sending email func...',
          worktreeName: 'test-001',
          createdAt: '2025-09-29T10:00:00.000Z',
          updatedAt: '2025-09-29T10:00:00.000Z',
        },
      ],
      nextCursor: null,
      requestId: '123',
    },
  };
  return useQuery(
    {
      queryKey: ['threads', { baseUrl }],
      queryFn: () => fetchThreads(baseUrl),
      refetchInterval: 5000,
      staleTime: 4000,
    },
    queryClient
  );
}
