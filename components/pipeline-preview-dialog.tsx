"use client";

import { useMemo, useState } from "react";
import { createPipelinePreview } from "@/lib/compositionPipeline";
import { PipelineSummaryCard } from "@/components/pipeline-summary-card";
import { downloadTextFile } from "@/lib/utils";

export function PipelinePreviewDialog({ sourceType, sourceId, options }: { sourceType: "board" | "review-pack" | "review-flow" | "batch" | "diff" | "project"; sourceId: string; options: string[] }) {
  const [target, setTarget] = useState<"review-pack" | "artifact-set" | "presentation" | "handoff" | "session">("artifact-set");
  const [selected, setSelected] = useState<string[]>(options);
  const manifest = useMemo(() => createPipelinePreview({ source_type: sourceType, source_id: sourceId, target_type: target, selected_ids: selected, theme_id: "observatory" }), [sourceType, sourceId, target, selected]);

  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Pipeline Preview</h3>
      <div className="flex flex-wrap gap-2">
        <select value={target} onChange={(e) => setTarget(e.target.value as typeof target)} className="rounded border border-line bg-slate-950/50 p-2 text-xs">
          <option value="artifact-set">artifact-set</option>
          <option value="review-pack">review-pack</option>
          <option value="presentation">presentation</option>
          <option value="handoff">handoff</option>
          <option value="session">session</option>
        </select>
        {options.map((option) => (
          <label key={option} className="text-xs">
            <input type="checkbox" checked={selected.includes(option)} onChange={() => setSelected((prev) => prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option])} /> {option}
          </label>
        ))}
        <button className="rounded border border-line px-2 py-1 text-xs" onClick={() => downloadTextFile(`${sourceType}-${target}.pipeline.json`, JSON.stringify(manifest, null, 2))}>Export Manifest</button>
      </div>
      <PipelineSummaryCard manifest={manifest} />
    </div>
  );
}
