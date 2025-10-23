/* JSX */
/* @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';
import { useExtensionDispatch, useExtensionStore } from '../store/store';
import { createThread } from '../lib/http';
import { AnimatedEllipsis } from './components/AnimatedEllipsis';
import { useThreadsQuery } from '../hooks/useThreadsQuery';
import { useMachineQuery } from '../hooks/useMachineQuery';
import { StateVisualization } from './components/StateVisualization';
import { useWorktreeThreads } from '../hooks/useWorktreeThreads';
import { PlusIcon } from 'lucide-preact';

export function WorktreeScreen() {
  const [firstMessage, setFirstMessage] = useState('');
  const [provisioning, setProvisioning] = useState(false);
  const [previousThreadId, setPreviousThreadId] = useState<string | undefined>(undefined);
  const dispatch = useExtensionDispatch();
  const { apiUrl, clientRequestId, currentThreadId, currentWorktreeName } = useExtensionStore();
  console.log('CURRENT THREAD ID::', currentThreadId);
  
  // Stop provisioning when thread is created
  useEffect(() => {
    if (currentThreadId) {
      setProvisioning(false);
    }
  }, [currentThreadId]);
  
  // Read machine data from React Query cache (set by SSE bridge)
  const { data: machineData, isLoading } = useMachineQuery(apiUrl, currentThreadId);

  // Read threads data to get the session label
  const { data: threadsData } = useThreadsQuery(apiUrl);

  const { threads: localThreads } = useWorktreeThreads(currentWorktreeName);
  
  useEffect(() => {
    // This effect is only for debug purposes, not doing anything more
    console.log('MACHINE DATA::')
    console.log(machineData)
  }, [machineData, threadsData]);
  
  // Find current thread label from threads list
  const currentThread = threadsData?.items?.find(t => t.id === currentThreadId);
  const sessionLabel = currentThread?.label || 'Session';

  async function startNewThread() {
    if (!firstMessage.trim()) return;
    if (!currentWorktreeName) {
      // NOTE: Ideally extension should pass worktreeName in worktree_detection; otherwise we can prompt the user
      // For now we block and ask the user to reopen via main screen if undefined
      console.error('Worktree name is unknown. Please open from main screen or update the extension to pass worktreeName.');
      return;
    }
    setProvisioning(true);
    await createThread({
      baseUrl: apiUrl,
      worktreeName: currentWorktreeName || 'test-001',
      userTask: firstMessage.trim(),
      label: firstMessage.trim(),
      clientRequestId: clientRequestId,
    });
    // Now we wait for thread.created via SSE -> handled in onThreadCreated
  }

  const handleSubmit = async (input: string) => {
    
  }

  const handleAddThread = () => {
    setPreviousThreadId(currentThreadId);
    dispatch({
      type: 'SET_CURRENT_THREAD_ID',
      payload: undefined,
    });
  }

  const handleBackToPreviousThread = () => {
    dispatch({
      type: 'SET_CURRENT_THREAD_ID',
      payload: previousThreadId,
    });
    setPreviousThreadId(undefined);
  }

  if (currentThreadId && !machineData) {
    return <div>Loading thread...</div>
  }

  if (currentThreadId && machineData) {
    return (
      <div className="min-h-screen">
        <div className="threadsTabsList">
          <div className="threadsTabsList__items">
            {localThreads?.map((threadId, index) => (
              <div className={`threadsTabsList__item ${threadId === currentThreadId ? 'active' : ''}`}>Thread {index + 1}</div>
            ))}
          </div>
          <div className="threadsTabsList__add" onClick={handleAddThread}>
            <PlusIcon className="threadsTabsList__addIcon" />
          </div>
        </div>
        <div className="mb-2">
          <h4 className="h4 m-0">{sessionLabel}</h4>
          <small>{currentThreadId}</small>
        </div>
        {isLoading ? (
          <div className="color-fg-muted">Loading thread...</div>
        ) : (
          <StateVisualization data={machineData} onSubmit={handleSubmit} />
        )}
      </div>
    );
  }


  return (
    <div className="Box p-3 d-flex flex-column gap-2">
      <div className="d-flex flex-justify-between flex-items-center">
        <h2 className="h4 m-0">New thread</h2>
        {!provisioning && previousThreadId && (
          <button className="btn btn-primary" onClick={handleBackToPreviousThread}>
            Back
          </button>
        )}
      </div>
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
