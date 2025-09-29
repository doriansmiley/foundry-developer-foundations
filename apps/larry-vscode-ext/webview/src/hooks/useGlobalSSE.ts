import { useEffect, useRef } from 'preact/hooks';
import { openSSE } from '../lib/sse';
import { queryClient } from '../lib/query';
import { sseBaseMain, sseBaseWorktree, isInWorktree } from '../signals/store';
import type {
  MachineUpdatedEvent,
  ThreadCreatedEvent,
  ThreadsListResponse,
} from '../lib/backend-types';

export function useGlobalSSE(params: {
  baseUrl: string;
  topics: string[];
  clientRequestId: string;
  onThreadCreated?: (evt: ThreadCreatedEvent) => void;
  onMachineUpdated?: (evt: MachineUpdatedEvent) => void;
}) {
  const {
    baseUrl,
    topics,
    clientRequestId,
    onThreadCreated,
    onMachineUpdated,
  } = params;
  const ctrlRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    // Prefer proxied SSE base if available
    const sseBase = isInWorktree.value
      ? sseBaseWorktree.value
      : sseBaseMain.value;
    const url =
      (sseBase ?? `${baseUrl}/events`) +
      `?topics=${encodeURIComponent(topics.join(','))}`;

    ctrlRef.current = openSSE(url, {
      'thread.created': (evt: ThreadCreatedEvent) => {
        // push into threads list cache if present
        queryClient.setQueryData(
          ['threads', { baseUrl }],
          (prev: ThreadsListResponse | undefined) => {
            if (!prev) return prev;
            return {
              ...prev,
              items: [
                {
                  id: evt.threadId,
                  label: evt.label,
                  worktreeName: evt.worktreeName,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
                ...prev.items,
              ],
            };
          }
        );
        onThreadCreated?.(evt);
      },
      'machine.updated': (evt: MachineUpdatedEvent) => {
        // update machine cache
        const m = evt.machine;
        queryClient.setQueryData(['machine', { baseUrl, machineId: m.id }], m);
        onMachineUpdated?.(evt);
      },
    });

    return () => ctrlRef.current?.close();
  }, [
    baseUrl,
    topics.join(','),
    clientRequestId,
    sseBaseMain.value,
    sseBaseWorktree.value,
    isInWorktree.value,
  ]);
}
