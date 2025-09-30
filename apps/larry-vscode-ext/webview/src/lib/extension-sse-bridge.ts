import { queryClient } from './query';
import type {
  MachineUpdatedEvent,
  ThreadCreatedEvent,
  ThreadsListResponse,
} from './backend-types';
import { currentThreadId, clientRequestId } from '../signals/store';

// Handle a single forwarded SSE event from the extension
export function handleForwardedSSE(msg: {
  baseUrl: string;
  event: string;
  data: string;
}) {
  const { baseUrl, event, data } = msg;

  try {
    if (event === 'thread.created') {
      const evt: ThreadCreatedEvent = JSON.parse(data);
      // Update threads list cache for THIS baseUrl
      queryClient.setQueryData(
        ['threads', { baseUrl }],
        (prev: ThreadsListResponse | undefined) => {
          console.log('📝 Updating threads cache. Previous:', prev);
          if (!prev) return prev;
          const updated = {
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
          console.log('Updated threads cache:', updated);
          return updated;
        }
      );

      // If this event belongs to our submission, adopt the new machine/thread id
      if (
        evt.clientRequestId &&
        evt.clientRequestId === clientRequestId.value
      ) {
        console.log('Setting currentThreadId to:', evt.machineId);
        currentThreadId.value = evt.machineId; // machineId == threadId for now
      }
      return;
    }

    if (event === 'machine.updated') {
      const evt: MachineUpdatedEvent = JSON.parse(data);
      const m = evt.machine;
      console.log('🤖 Processing machine.updated:', m);
      queryClient.setQueryData(['machine', { baseUrl, machineId: m.id }], m);
      console.log('📝 Updated machine cache for:', m.id);
      return;
    }
  } catch (error) {
    console.error('❌ SSE Bridge error processing event:', error);
  }
}
