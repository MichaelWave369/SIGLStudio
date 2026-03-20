export function VersionMismatchNotice({ warning }: { warning: string }) {
  return <p className="rounded border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">{warning}</p>;
}
