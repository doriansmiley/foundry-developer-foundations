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
      </div>
      <div className="width-full mb-1 mt-1">
          <input
            className="form-control input-sm width-full"
            placeholder="Search threads..."
            value={searchText.value}
            onInput={(e) => (searchText.value = (e.currentTarget as HTMLInputElement).value)}
          />
        </div>

      {isLoading ? (
        <div className="color-fg-muted">Loading threads…</div>
      ) : (
        <ThreadsList items={filtered} selectedId={selectedThreadId.value} onSelect={(id) => (selectedThreadId.value = id)} />
      )}

      {selectedThreadId.value ? (
        <div className="border-top pt-3 mt-2">
        <button className="btn btn-primary" disabled={!selected || setupPhase.value === 'setting_up'} onClick={openWorktreeExisting}>
          {setupPhase.value === 'setting_up' ? (
            <>Setting up <AnimatedEllipsis /></>
          ) : (
            'Open worktree'
          )}
        </button>
      </div>
      ): null}

      <div className="border-top pt-3 mt-2">
        <h4 className="h4">Or create a new thread</h4>
        <div className="width-full mb-2">
          <input
            className="form-control input-sm flex-1 width-full"
            placeholder="Thread label (required)"
            value={newLabel}
            onInput={(e) => setNewLabel((e.currentTarget as HTMLInputElement).value)}
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
