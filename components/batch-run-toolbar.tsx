import { downloadTextFile } from "@/lib/utils";
import type { BatchItemResult, EngineMode } from "@/lib/types";
import { buildBatchReport } from "@/lib/reportExport";

export function BatchRunToolbar({
  onValidateAll,
  onInspectAll,
  results,
  mode
}: {
  onValidateAll: () => void;
  onInspectAll: () => void;
  results: BatchItemResult[];
  mode: EngineMode;
}) {
  return (
    <div className="panel flex flex-wrap gap-2">
      <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={onValidateAll}>Validate All</button>
      <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={onInspectAll}>Inspect All</button>
      <button className="rounded-lg border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile("batch-report.json", JSON.stringify(buildBatchReport({ results, engineMode: mode }), null, 2))}>Export Report JSON</button>
    </div>
  );
}
