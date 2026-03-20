export function EngineReasonBadge({ reason }: { reason: string }) {
  return <span className="rounded-full border border-amber-400/30 px-2 py-0.5 text-xs text-amber-200">{reason}</span>;
}
