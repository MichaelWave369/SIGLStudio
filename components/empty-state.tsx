export function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="panel text-sm">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-muted">{description}</p>
      {actionLabel && onAction ? <button className="mt-2 rounded border border-line px-3 py-1 text-xs" onClick={onAction}>{actionLabel}</button> : null}
    </div>
  );
}
