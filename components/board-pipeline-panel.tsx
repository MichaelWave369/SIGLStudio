"use client";

import type { Board } from "@/lib/boardTypes";
import { createBoardPipelineManifest } from "@/lib/boardPipeline";
import { downloadTextFile } from "@/lib/utils";

export function BoardPipelinePanel({ board, selectedBlockIds }: { board: Board; selectedBlockIds: string[] }) {
  const outputTypes = ["artifact-set", "review-pack", "presentation", "handoff", "session"] as const;

  return (
    <div className="panel flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted">Pipelines ({selectedBlockIds.length} selected)</span>
      {outputTypes.map((output_type) => (
        <button
          key={output_type}
          className="rounded border border-line px-2 py-1"
          onClick={() => {
            const manifest = createBoardPipelineManifest({ board, selected_block_ids: selectedBlockIds, output_type, theme_id: "observatory" });
            downloadTextFile(`${board.title}.${output_type}.pipeline.json`, JSON.stringify(manifest, null, 2));
          }}
        >
          {`Create ${output_type}`}
        </button>
      ))}
    </div>
  );
}
