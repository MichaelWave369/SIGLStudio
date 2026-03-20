"use client";

import { useMemo, useState } from "react";
import { BatchDetailDrawer } from "@/components/batch-detail-drawer";
import { BatchRunToolbar } from "@/components/batch-run-toolbar";
import { BatchTable } from "@/components/batch-table";
import { ProvenanceCard } from "@/components/provenance-card";
import { TraceSummaryPanel } from "@/components/trace-summary-panel";
import { stableHash } from "@/lib/hash";
import { inspectSigil, validateSigil } from "@/lib/vibeAdapter";
import type { BatchItem, BatchItemResult } from "@/lib/types";
import { createProjectPack, validateProjectPackPayload } from "@/lib/projectPack";
import { downloadTextFile } from "@/lib/utils";
import { getDrafts } from "@/lib/studioStorage";
import { buildProvenance } from "@/lib/provenance";

const seedItems: BatchItem[] = [
  { id: "b1", title: "Basic", source: "⟨ Φ ∴ ☉ ⟩", sequence: false },
  { id: "b2", title: "Coupled", source: "⟨ Φ ⟡ Ω ⟩", sequence: false },
  { id: "b3", title: "Timeline", source: "Φ ⟢ ☉ ⟢ Ω", sequence: true }
];

export function BatchWorkspace() {
  const [items, setItems] = useState<BatchItem[]>(seedItems);
  const [results, setResults] = useState<BatchItemResult[]>(seedItems.map((item) => ({ item, validation: null, inspect: null, sourceHash: stableHash(item.source) })));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const syncItems = (next: BatchItem[]) => {
    setItems(next);
    setResults(next.map((item) => results.find((r) => r.item.id === item.id) ?? { item, validation: null, inspect: null, sourceHash: stableHash(item.source) }));
  };

  const validateAll = async () => {
    const next: BatchItemResult[] = [];
    for (const item of items) {
      const validation = await validateSigil(item.source);
      const current = results.find((r) => r.item.id === item.id);
      next.push({ item, validation, inspect: current?.inspect ?? null, sourceHash: stableHash(item.source) });
    }
    setResults(next);
  };

  const inspectAll = async () => {
    const next: BatchItemResult[] = [];
    for (const item of items) {
      const inspect = await inspectSigil(item.source);
      const current = results.find((r) => r.item.id === item.id);
      next.push({ item, validation: current?.validation ?? null, inspect, sourceHash: stableHash(item.source) });
    }
    setResults(next);
  };

  const addRow = () => {
    const id = crypto.randomUUID();
    syncItems([...items, { id, title: `Item ${items.length + 1}`, source: "", sequence: false }]);
  };

  const selected = useMemo(() => results.find((r) => r.item.id === selectedId) ?? null, [results, selectedId]);
  const mode = results.find((r) => r.validation)?.validation?.mode ?? "mock";

  return (
    <div className="space-y-4">
      <BatchRunToolbar onValidateAll={() => void validateAll()} onInspectAll={() => void inspectAll()} results={results} mode={mode} />
      <div className="panel flex gap-2">
        <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={addRow}>Add Row</button>
        <button
          className="rounded-lg border border-line px-3 py-1 text-sm"
          onClick={() => {
            const drafts = getDrafts();
            const imported = drafts.map((d, i) => ({ id: `d-${i}`, title: d.name, source: d.source, sequence: d.source.includes("⟢") }));
            if (imported.length > 0) syncItems(imported);
          }}
        >
          Import Drafts
        </button>
        <label className="rounded-lg border border-line px-3 py-1 text-sm">
          Import Project Pack
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const parsed = JSON.parse(await file.text()) as unknown;
              const validated = validateProjectPackPayload(parsed);
              if (!validated.valid || !validated.pack) {
                alert(`Import failed: ${validated.reason}`);
                return;
              }
              const imported = validated.pack.items.map((item) => ({ id: item.id, title: item.title, source: item.source, sequence: item.type === "sequence" }));
              syncItems(imported);
            }}
          />
        </label>
        <button
          className="rounded-lg border border-line px-3 py-1 text-sm"
          onClick={() => {
            const pack = createProjectPack({
              name: "Batch Pack",
              description: "Generated from batch workspace",
              engineMode: mode,
              items: items.map((item) => ({ id: item.id, type: item.sequence ? "sequence" : "sigil", title: item.title, source: item.source, labels: ["batch"] }))
            });
            downloadTextFile("batch-project-pack.json", JSON.stringify(pack, null, 2));
          }}
        >
          Create Project Pack
        </button>
      </div>
      <BatchTable rows={results} onSelect={setSelectedId} />
      <BatchDetailDrawer selected={selected} />
      <div className="grid gap-4 md:grid-cols-2">
        <TraceSummaryPanel validation={selected?.validation ?? null} />
        <ProvenanceCard
          meta={buildProvenance({
            engine_mode: selected?.validation?.mode ?? "mock",
            mode_reason: selected?.validation?.modeReason ?? "No selection",
            source_hash: selected?.sourceHash,
            obligation_count: selected?.validation?.obligations.length,
            issue_count: selected?.validation?.issues.length
          })}
        />
      </div>
    </div>
  );
}
