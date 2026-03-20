import { ReviewFlowBuilder } from "@/components/review-flow-builder";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { ExtensionRegistryPanel } from "@/components/extension-registry-panel";
import { ExtensionPackImportDialog } from "@/components/extension-pack-import-dialog";
import { SendToMenu } from "@/components/send-to-menu";
import { PipelinePreviewDialog } from "@/components/pipeline-preview-dialog";

export default function ReviewFlowsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Review Flows</h2>
        <p className="mt-2 text-sm text-muted">Build ordered review workflows with status markers, decision notes, and next actions.</p>
      </div>
      <SendToMenu source="review-flow" />
      <PipelinePreviewDialog sourceType="review-flow" sourceId="current-review-flow" options={["overview", "decision", "next-actions"]} />
      <ReviewFlowBuilder />
      <AnalyticsSummaryPanel source="review-flows" />
      <ExtensionRegistryPanel />
      <ExtensionPackImportDialog />
    </main>
  );
}
