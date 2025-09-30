import { useEffect } from 'preact/hooks';
import { onMessage, postMessage } from '../lib/vscode';
import { isInWorktree, currentThreadId, setupPhase, worktreeName, isLoadingWorktreeInfo } from '../signals/store';
import { handleForwardedSSE } from '../lib/extension-sse-bridge';

export function BootChannel() {
  useEffect(() => {
    const handleMessage = (msg: any) => {
      if (!msg || typeof msg !== 'object') return;
      
      if (msg.type === 'worktree_detection') {
        isInWorktree.value = !!msg.isInWorktree;
        currentThreadId.value = msg.currentThreadId || undefined;
        // If extension can pass worktreeName, capture it
        if (msg.worktreeName) worktreeName.value = msg.worktreeName;
        // Update signals for other components
        isLoadingWorktreeInfo.value = false;
        
        // Update loading state for AppRoot
        if (typeof window !== 'undefined' && (window as any).setAppLoading) {
          (window as any).setAppLoading(false);
        }
      }
      
      if (msg.type === 'worktree_ready') {
        setupPhase.value = 'ready';
        if (msg.threadId) currentThreadId.value = msg.threadId;
        if (msg.worktreeName) worktreeName.value = msg.worktreeName;
      }
      
      if (msg.type === 'worktree_setup_error') {
        setupPhase.value = 'error';
      }

      console.log('📨 Webview received message:', msg);
      // NEW: forwarded SSE
      if (msg.type === 'sse_event' && msg.baseUrl && msg.event && typeof msg.data === 'string') {
        console.log('📨 Webview received SSE event:', msg);
        handleForwardedSSE({ baseUrl: msg.baseUrl, event: msg.event, data: msg.data });
      }

    };

    // Set up message listener
    const cleanupListener = onMessage(handleMessage);

    // Request initial worktree status from extension
    postMessage({ type: 'getCurrentWorktree' });

    // Cleanup function
    return () => {
      if (typeof cleanupListener === 'function') {
        cleanupListener();
      }
    };
  }, []);

  return null;
}
