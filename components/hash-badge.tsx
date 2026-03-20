export function HashBadge({ value }: { value?: string }) {
  return <span className="rounded-full border border-line px-2 py-0.5 text-xs font-mono">{value ?? "—"}</span>;
}
