"use client";

import { useMemo, useState } from "react";
import { DiffInspectionPane } from "@/components/diff-inspection-pane";
import { DiffSourcePane } from "@/components/diff-source-pane";
import { DiffSummaryCard } from "@/components/diff-summary-card";
import { inspectSigil, validateSigil } from "@/lib/vibeAdapter";
import { stableHash } from "@/lib/hash";
import { summarizeDiff } from "@/lib/diffInspect";
import type { DiffInspectionSnapshot } from "@/lib/types";
import { downloadTextFile } from "@/lib/utils";
import { buildDiffReport } from "@/lib/reportExport";
import { ProvenanceCard } from "@/components/provenance-card";
import { buildProvenance } from "@/lib/provenance";

export function DiffWorkspace() {
  const [leftSource, setLeftSource] = useState("⟨ Φ ∴ ☉ ⟩");
  const [rightSource, setRightSource] = useState("⟨ Φ ⟡ Ω ⟩");
  const [left, setLeft] = useState<DiffInspectionSnapshot | null>(null);
  const [right, setRight] = useState<DiffInspectionSnapshot | null>(null);

  const runSide = async (side: "left" | "right") => {
    const source = side === "left" ? leftSource : rightSource;
    const [inspect, validation] = await Promise.all([inspectSigil(source), validateSigil(source)]);
    const snapshot: DiffInspectionSnapshot = {
      source,
      inspect,
      validation,
      sourceHash: stableHash(source),
      sequencePresent: source.includes("⟢")
    };
    if (side === "left") setLeft(snapshot);
    else setRight(snapshot);
  };

  const summary = useMemo(() => summarizeDiff(left, right), [left, right]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <DiffSourcePane label="Left Source" source={leftSource} onChange={setLeftSource} />
        <DiffSourcePane label="Right Source" source={rightSource} onChange={setRightSource} />
      </div>
      <div className="flex gap-2">
        <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={() => void runSide("left")}>Inspect Left</button>
        <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={() => void runSide("right")}>Inspect Right</button>
        <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={() => {
          const report = buildDiffReport({
            leftHash: left?.sourceHash ?? "",
            rightHash: right?.sourceHash ?? "",
            engineMode: left?.validation?.mode ?? right?.validation?.mode ?? "mock",
            summary
          });
          downloadTextFile("diff-report.json", JSON.stringify(report, null, 2));
        }}>Export Diff Report</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <DiffInspectionPane snapshot={left} />
        <DiffInspectionPane snapshot={right} />
      </div>
      <DiffSummaryCard summary={summary} />
      <div className="grid gap-4 md:grid-cols-2">
        <ProvenanceCard meta={buildProvenance({ engine_mode: left?.validation?.mode ?? "mock", mode_reason: left?.validation?.modeReason ?? "left unavailable", source_hash: left?.sourceHash, obligation_count: left?.validation?.obligations.length, issue_count: left?.validation?.issues.length })} />
        <ProvenanceCard meta={buildProvenance({ engine_mode: right?.validation?.mode ?? "mock", mode_reason: right?.validation?.modeReason ?? "right unavailable", source_hash: right?.sourceHash, obligation_count: right?.validation?.obligations.length, issue_count: right?.validation?.issues.length })} />
      </div>
    </div>
  );
}
