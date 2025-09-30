import React from 'react';
import { useState, useEffect } from 'preact/hooks';
import { baseUrl, clientRequestId, currentThreadId, worktreeName, } from '../signals/store';
import { createThread } from '../lib/http';
import { AnimatedEllipsis } from './components/AnimatedEllipsis';
import { useThreadsQuery } from '../hooks/useThreadsQuery';
import { useMachineQuery } from '../hooks/useMachineQuery';
import { StateVisualization } from './components/StateVisualization';
import { queryClient } from '../lib/query';
import { MachineResponse } from '../lib/backend-types';

export function WorktreeScreen() {
  const [firstMessage, setFirstMessage] = useState('');
  const [provisioning, setProvisioning] = useState(false);
  const [machineId, setMachineId] = useState<string | undefined>(undefined);

  // Subscribe to currentThreadId signal changes
  useEffect(() => {
    const unsubscribe = currentThreadId.subscribe((newValue) => {
      console.log('🔄 currentThreadId changed to:', newValue);
      setMachineId(newValue);
      setProvisioning(false); // Stop provisioning when thread is created
    });
    return unsubscribe;
  }, []);
  
  console.log('MACHINE ID::')
  console.log(machineId)
  // Read machine data from React Query cache (set by SSE bridge)
  const { data: machineData, isLoading } = useMachineQuery(baseUrl.value, machineId);

  // Read threads data to get the session label
  const { data: threadsData } = useThreadsQuery(baseUrl.value);
  console.log('MACHINE DATA::')
  console.log(machineData)
  console.log('THREADS DATA::')
  console.log(threadsData)
  // Find current thread label from threads list
  const currentThread = threadsData?.items?.find(t => t.id === machineId);
  const sessionLabel = currentThread?.label || 'Session';

  async function startNewThread() {
    if (!firstMessage.trim()) return;
    if (!worktreeName.value) {
      // NOTE: Ideally extension should pass worktreeName in worktree_detection; otherwise we can prompt the user
      // For now we block and ask the user to reopen via main screen if undefined
      console.error('Worktree name is unknown. Please open from main screen or update the extension to pass worktreeName.');
      return;
    }
    setProvisioning(true);
    await createThread({
      baseUrl: baseUrl.value,
      worktreeName: worktreeName.value || 'test-001',
      userTask: firstMessage.trim(),
      label: firstMessage.trim(),
      clientRequestId: clientRequestId.value,
    });
    // Now we wait for thread.created via SSE -> handled in onThreadCreated
  }

  const handleSubmit = async (input: string) => {
    // update optimistacly machine status to running
    queryClient.setQueryData(['machine', { baseUrl: baseUrl.value, machineId }], (prev) => {
      return {
        ...prev as MachineResponse,
        status: 'running',
      }
    });

    if (!machineData?.currentState) {
      console.error('Machine data is missing current state');
      return;
    }

    fetch(`${baseUrl.value}/machines/${machineId}/next`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': Math.random().toString(36).substring(2, 15),
      },
      // fix this
      body: JSON.stringify({ contextUpdate: { [machineData.currentState]: { userResponse: input } } }),
    });
    
  }

  if (machineId && machineData) {
    return (
      <div className="min-h-screen">
        <div className="d-flex flex-justify-between flex-items-center mb-2">
          <h4 className="h3 m-0">{sessionLabel}</h4>
        </div>
        {isLoading ? (
          <div className="color-fg-muted">Loading history…</div>
        ) : (
          <StateVisualization data={machineData} onSubmit={handleSubmit} />
        )}
      </div>
    );
  }

  // No session yet - show first message composer
  return (
    <div className="Box p-3 d-flex flex-column gap-2">
      <h2 className="h3 m-0">New Session</h2>
      <textarea
        className="form-control"
        rows={6}
        placeholder="Hello, how can I help you today?"
        value={firstMessage}
        onInput={(e) => setFirstMessage((e.currentTarget as HTMLTextAreaElement).value)}
      />
      <div>
        {provisioning && (
          <div className="mt-1">
            <span className="shimmer-loading">Working on it</span><AnimatedEllipsis />
          </div>
        )}
        {!provisioning && (
          <button className="btn btn-primary" disabled={!firstMessage.trim()} onClick={startNewThread}>
            Send
          </button>
        )}
      </div>
    </div>
  );
}
