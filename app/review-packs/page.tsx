import { HandoffImportDialog } from "@/components/handoff-import-dialog";
import { ReviewPackBuilder } from "@/components/review-pack-builder";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { ImportValidationDialog } from "@/components/import-validation-dialog";
import { SendToMenu } from "@/components/send-to-menu";
import { PipelinePreviewDialog } from "@/components/pipeline-preview-dialog";
import { PageIntro } from "@/components/page-intro";

export default function ReviewPacksPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Project Review Packs" description="Create deterministic review bundles from projects, with sectioned summaries, flow handoff, and validated imports." cta="Tip: validate imports first, then run pipeline preview before export." />
      <SendToMenu source="review-pack" />
      <PipelinePreviewDialog sourceType="review-pack" sourceId="current-review-pack" options={["overview", "validation", "provenance"]} />
      <HandoffImportDialog />
      <ImportValidationDialog />
      <ReviewPackBuilder />
      <AnalyticsSummaryPanel source="review-packs" />
    </main>
  );
}
