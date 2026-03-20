import { detectRuntimeMode } from "@/lib/runtimeMode";

export function RuntimeBadge() {
  const runtime = detectRuntimeMode();
  return <span className="rounded border border-line px-2 py-0.5 text-[10px] uppercase text-muted">{runtime}</span>;
}
