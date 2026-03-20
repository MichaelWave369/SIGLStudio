import { normalizeProvenance, type EngineProvenanceInput } from "@/lib/provenanceNormalize";
import type { ProvenanceMeta } from "@/lib/types";

export function ProvenanceDetailPanel({ local, engine }: { local: ProvenanceMeta; engine?: EngineProvenanceInput }) {
  const normalized = normalizeProvenance(local, engine);
  return (
    <div className="panel grid gap-3 md:grid-cols-2 text-xs">
      <div>
        <h4 className="mb-2 font-semibold">Local / Mock / Derived</h4>
        <pre className="overflow-auto rounded border border-line bg-slate-950/50 p-2">{JSON.stringify(normalized.local, null, 2)}</pre>
      </div>
      <div>
        <h4 className="mb-2 font-semibold">Engine-provided (optional)</h4>
        <pre className="overflow-auto rounded border border-line bg-slate-950/50 p-2">{JSON.stringify(normalized.engine, null, 2)}</pre>
      </div>
    </div>
  );
}
