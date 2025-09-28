import { useEffect, useRef } from 'preact/hooks';
import { openSSE } from '../lib/sse';
import { queryClient } from '../lib/query';
import type { MachineUpdatedEvent } from '../lib/backend-types';

export function useMachineSSE(baseUrl: string, machineId?: string) {
  const ctrlRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    if (!machineId) return;
    const url = `${baseUrl}/machines/${encodeURIComponent(machineId)}/events`;
    ctrlRef.current = openSSE(url, {
      'machine.updated': (evt: MachineUpdatedEvent) => {
        const m = evt.machine;
        queryClient.setQueryData(['machine', { baseUrl, machineId: m.id }], m);
      },
    });

    return () => ctrlRef.current?.close();
  }, [baseUrl, machineId]);
}
