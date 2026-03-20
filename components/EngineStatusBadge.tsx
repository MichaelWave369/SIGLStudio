import type { EngineMode } from "@/lib/types";

export function EngineStatusBadge({ mode }: { mode: EngineMode }) {
  const isMock = mode === "mock";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${isMock ? "border-amber-400/40 text-amber-300" : "border-emerald-400/40 text-emerald-300"}`}>
      {isMock ? "Mock Engine Mode" : "Vibe Engine Mode"}
    </span>
  );
}
