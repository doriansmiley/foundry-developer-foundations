import { useQuery } from '@tanstack/react-query';
import { fetchThreads } from '../lib/http';
import { queryClient } from '../lib/query';

export function useThreadsQuery(baseUrl: string) {
  return {
    isLoading: false,
    data: {
      items: [
        {
          id: '8f783346-9350-4f3d-b60c-ce7863f6c7a2',
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
