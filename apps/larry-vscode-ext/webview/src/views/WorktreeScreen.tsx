
import { useState } from 'preact/hooks';
import { baseUrl, clientRequestId, currentThreadId, worktreeName } from '../signals/store';
import { useMachineQuery } from '../hooks/useMachineQuery';
import { useGlobalSSE } from '../hooks/useGlobalSSE';
import { useMachineSSE } from '../hooks/useMachineSSE';
import { createThread } from '../lib/http';
import { AnimatedEllipsis } from './components/AnimatedEllipsis';

export function WorktreeScreen() {
  const [firstMessage, setFirstMessage] = useState('');
  const [provisioning, setProvisioning] = useState(false);
  const machineId = currentThreadId.value; // for us, threadId === machineId in your model

  // When we already have a thread, load latest snapshot + keep live via SSE
  const { data, isLoading } = useMachineQuery(baseUrl.value, machineId);
  useMachineSSE(baseUrl.value, machineId);

  // During new session provisioning, we want global SSE to capture thread.created
  useGlobalSSE({
    baseUrl: baseUrl.value,
    topics: ['thread.created', 'machine.updated'],
    clientRequestId: clientRequestId.value,
    onThreadCreated: (evt) => {
      // Scope by clientRequestId when provided
      if (evt.clientRequestId && evt.clientRequestId !== clientRequestId.value) return;
      // Adopt created machine
      currentThreadId.value = evt.machineId;
      setProvisioning(false);
    },
  });

  async function startNewThread() {
    if (!firstMessage.trim()) return;
    if (!worktreeName.value) {
      // NOTE: Ideally extension should pass worktreeName in worktree_detection; otherwise we can prompt the user
      // For now we block and ask the user to reopen via main screen if undefined
      alert('Worktree name is unknown. Please open from main screen or update the extension to pass worktreeName.');
      return;
    }
    setProvisioning(true);
    await createThread({
      baseUrl: baseUrl.value,
      worktreeName: worktreeName.value,
      userTask: firstMessage.trim(),
      label: firstMessage.trim(),
      clientRequestId: clientRequestId.value,
    });
    // Now we wait for thread.created via SSE -> handled in onThreadCreated
  }

  if (machineId) {
    return (
      <div className="Box p-3">
        <div className="d-flex flex-justify-between flex-items-center mb-2">
          <h2 className="h3 m-0">Session</h2>
          <span className="Label Label--primary">{data?.status || 'running'}</span>
        </div>
        {isLoading ? (
          <div className="color-fg-muted">Loading history…</div>
        ) : (
          <pre className="p-2 overflow-auto" style={{ maxHeight: '60vh' }}>
            {JSON.stringify(data?.context ?? data?.currentStateContext ?? {}, null, 2)}
          </pre>
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
        <button className="btn btn-primary" disabled={!firstMessage.trim() || provisioning} onClick={startNewThread}>
          {provisioning ? (
            <>Provisioning <AnimatedEllipsis /></>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
}
