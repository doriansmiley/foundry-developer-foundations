import { useEffect, useRef } from 'preact/hooks';
import { openSSE } from '../lib/sse';
import { queryClient } from '../lib/query';
import { sseBaseWorktree } from '../signals/store';
import type { MachineUpdatedEvent } from '../lib/backend-types';

export function useMachineSSE(baseUrl: string, machineId?: string) {
  const ctrlRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    if (!machineId) return;

    // If proxied /events base is set, strip the trailing /events and build the machine URL on it
    const proxiedBase = sseBaseWorktree.value?.replace(/\/events$/, '');
    const baseForEvents = proxiedBase ?? baseUrl; // fallback to localhost
    const url = `${baseForEvents}/machines/${encodeURIComponent(
      machineId
    )}/events`;

    ctrlRef.current = openSSE(url, {
      'machine.updated': (evt: MachineUpdatedEvent) => {
        const m = evt.machine;
        queryClient.setQueryData(['machine', { baseUrl, machineId: m.id }], m);
      },
    });

    return () => ctrlRef.current?.close();
  }, [baseUrl, machineId, sseBaseWorktree.value]);
}
