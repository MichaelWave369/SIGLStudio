import { BatchWorkspace } from "@/components/batch-workspace";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { SendToMenu } from "@/components/send-to-menu";

export default function BatchPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Batch Validate / Inspect</h2>
        <p className="mt-2 text-sm text-muted">Run multiple sigils through validation and inspect workflows locally.</p>
      </div>
      <SendToMenu source="batch" />
      <BatchWorkspace />
      <AnalyticsSummaryPanel source="batch" />
    </main>
  );
}
