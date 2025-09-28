
import type { ThreadListItem } from '../../lib/backend-types';

export function ThreadsList(props: {
  items: ThreadListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const { items, selectedId, onSelect } = props;
  if (!items.length) {
    return <div className="color-fg-muted">No threads yet.</div>;
  }
  return (
    <div className="Box overflow-auto" style={{ maxHeight: '50vh' }}>
      <ul className="list-style-none">
        {items.map((t) => (
          <li key={t.id} className={`d-flex flex-justify-between px-2 py-2 ${selectedId === t.id ? 'color-bg-subtle' : ''}`}>
            <button className="btn-invisible text-left" onClick={() => onSelect(t.id)}>
              <div className="text-bold">{t.label}</div>
              <div className="color-fg-muted text-small">{t.worktreeName}</div>
            </button>
            <span className="Label Label--secondary">{new Date(t.updatedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
