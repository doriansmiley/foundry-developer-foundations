import { useQuery } from '@tanstack/react-query';
import { fetchThreads } from '../lib/http';
import { queryClient } from '../lib/query';

export function useThreadsQuery(baseUrl: string) {
  return {
    isLoading: false,
    data: {
      items: [
        {
          id: '4c84718c-d1d0-4149-840f-0bdc56112062',
          label: 'Create sending email func...',
          worktreeName: 'example-001-4ce',
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
