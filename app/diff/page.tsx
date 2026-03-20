import { DiffWorkspace } from "@/components/diff-workspace";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { SendToMenu } from "@/components/send-to-menu";

export default function DiffPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Inspect Diff Mode</h2>
        <p className="mt-2 text-sm text-muted">Compare two sigils side-by-side with semantic difference summaries.</p>
      </div>
      <SendToMenu source="diff" />
      <DiffWorkspace />
      <AnalyticsSummaryPanel source="diff" />
    </main>
  );
}
