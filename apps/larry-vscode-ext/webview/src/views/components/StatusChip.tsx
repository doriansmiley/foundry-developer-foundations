

export function StatusChip({ status }: { status?: string }) {
  const cls = status === 'awaiting_human' ? 'Label--attention' : status === 'success' ? 'Label--success' : status === 'error' ? 'Label--danger' : 'Label--secondary';
  return <span className={`Label ${cls}`}>{status || 'unknown'}</span>;
}
