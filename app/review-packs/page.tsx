import { HandoffImportDialog } from "@/components/handoff-import-dialog";
import { ReviewPackBuilder } from "@/components/review-pack-builder";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { ImportValidationDialog } from "@/components/import-validation-dialog";
import { SendToMenu } from "@/components/send-to-menu";
import { PipelinePreviewDialog } from "@/components/pipeline-preview-dialog";

export default function ReviewPacksPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Project Review Packs</h2>
        <p className="mt-2 text-sm text-muted">Create deterministic review bundles from projects, with sectioned summaries, flow handoff, and validated imports.</p>
      </div>
      <SendToMenu source="review-pack" />
      <PipelinePreviewDialog sourceType="review-pack" sourceId="current-review-pack" options={["overview", "validation", "provenance"]} />
      <HandoffImportDialog />
      <ImportValidationDialog />
      <ReviewPackBuilder />
      <AnalyticsSummaryPanel source="review-packs" />
    </main>
  );
}
