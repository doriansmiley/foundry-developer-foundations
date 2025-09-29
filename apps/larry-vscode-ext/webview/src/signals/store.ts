import { signal, computed } from '@preact/signals';

// Loading state - starts as true until we get initial worktree detection
export const isLoadingWorktreeInfo = signal(true);
export const isInWorktree = signal(false);
export const currentThreadId = signal<string | undefined>(undefined);
export const worktreeName = signal<string | undefined>(undefined);
export const setupPhase = signal<'idle' | 'setting_up' | 'ready' | 'error'>(
  'idle'
);
export const selectedThreadId = signal<string | undefined>(undefined);
export const searchText = signal('');
export const clientRequestId = signal<string>(
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : 'client-' + Math.random().toString(16).slice(2)
);
export const sseBaseMain = signal<string | undefined>(undefined);
export const sseBaseWorktree = signal<string | undefined>(undefined);

export const baseUrl = computed(() =>
  isInWorktree.value
    ? 'http://localhost:3000/larry/agents/google/v1'
    : 'http://localhost:4210/larry/agents/google/v1'
);
