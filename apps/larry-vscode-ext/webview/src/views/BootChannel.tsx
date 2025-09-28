import { useEffect } from 'preact/hooks';
import { onMessage } from '../lib/vscode';
import { isInWorktree, currentThreadId, setupPhase, worktreeName } from '../signals/store';

export function BootChannel() {
  useEffect(() => {
    onMessage((msg) => {
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'worktree_detection') {
        isInWorktree.value = !!msg.isInWorktree;
        currentThreadId.value = msg.currentThreadId || undefined;
        // If extension can pass worktreeName, capture it
        if (msg.worktreeName) worktreeName.value = msg.worktreeName;
      }
      if (msg.type === 'worktree_ready') {
        setupPhase.value = 'ready';
        if (msg.threadId) currentThreadId.value = msg.threadId;
        if (msg.worktreeName) worktreeName.value = msg.worktreeName;
      }
      if (msg.type === 'worktree_setup_error') {
        setupPhase.value = 'error';
      }
    });
  }, []);

  return null;
}
