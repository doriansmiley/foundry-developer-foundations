import React from 'react';
import { useMemo, useState } from 'preact/hooks';
import { useThreadsQuery } from '../hooks/useThreadsQuery';
import { baseUrl, searchText, selectedThreadId, setupPhase } from '../signals/store';
import { postMessage } from '../lib/vscode';
import type { ThreadListItem } from '../lib/backend-types';
import { ThreadsList } from './components/ThreadsList';
import { AnimatedEllipsis } from './components/AnimatedEllipsis';

export function MainRepoScreen() {
  const { data, isLoading } = useThreadsQuery(baseUrl.value);
  const [newLabel, setNewLabel] = useState('');
  const [newWorktree, setNewWorktree] = useState('');

  const items = data?.items ?? [];
  const filtered = useMemo(() => {
    const q = searchText.value.toLowerCase();
    if (!q) return items;
    return items.filter((t) => (t.label + ' ' + t.worktreeName).toLowerCase().includes(q));
  }, [items, searchText.value]);

  const selected: ThreadListItem | undefined = useMemo(() => {
    if (!selectedThreadId.value) return undefined;
    return items.find((t) => t.id === selectedThreadId.value);
  }, [items, selectedThreadId.value]);

  function openWorktreeExisting() {
    if (!selected) return;
    postMessage({
      type: 'open_worktree',
      worktreeName: selected.worktreeName,
      threadId: selected.id,
      label: selected.label,
    });
    setupPhase.value = 'setting_up';
  }

  function openWorktreeNew() {
    if (!newLabel.trim()) return;
    postMessage({ type: 'open_worktree', worktreeName: newWorktree || '', threadId: '', label: newLabel.trim() });
    setupPhase.value = 'setting_up';
  }

  return (
    <div className="Box d-flex flex-column gap-3 p-3">
      <div className="d-flex flex-justify-between flex-items-center">
        <h2 className="h3 m-0">Threads</h2>
        <div className="d-flex gap-2">
          <input
            className="form-control input-sm"
            placeholder="Filter threads…"
            value={searchText.value}
            onInput={(e) => (searchText.value = (e.currentTarget as HTMLInputElement).value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="color-fg-muted">Loading threads…</div>
      ) : (
        <ThreadsList items={filtered} selectedId={selectedThreadId.value} onSelect={(id) => (selectedThreadId.value = id)} />
      )}

      <div className="border-top pt-3 mt-2">
        <h3 className="h4">Open selected thread</h3>
        <button className="btn btn-primary" disabled={!selected || setupPhase.value === 'setting_up'} onClick={openWorktreeExisting}>
          {setupPhase.value === 'setting_up' ? (
            <>Setting up <AnimatedEllipsis /></>
          ) : (
            'Open worktree'
          )}
        </button>
      </div>

      <div className="border-top pt-3 mt-2">
        <h3 className="h4">Create new thread</h3>
        <div>
          <input
            className="form-control input-sm flex-1"
            placeholder="Thread label (required)"
            value={newLabel}
            onInput={(e) => setNewLabel((e.currentTarget as HTMLInputElement).value)}
          />
          </div>
          <div>
          <input
            className="form-control input-sm"
            placeholder="Worktree name (optional)"
            value={newWorktree}
            onInput={(e) => setNewWorktree((e.currentTarget as HTMLInputElement).value)}
          />
          </div>
          <div>
          <button className={`btn ${newLabel.trim() ? 'btn-primary' : ''}`} disabled={!newLabel.trim() || setupPhase.value === 'setting_up'} onClick={openWorktreeNew}>
            {setupPhase.value === 'setting_up' ? (
              <>Setting up <AnimatedEllipsis /></>
            ) : (
              'Open worktree'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
