import { ReviewFlowBuilder } from "@/components/review-flow-builder";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { ExtensionRegistryPanel } from "@/components/extension-registry-panel";
import { ExtensionPackImportDialog } from "@/components/extension-pack-import-dialog";
import { SendToMenu } from "@/components/send-to-menu";
import { PipelinePreviewDialog } from "@/components/pipeline-preview-dialog";
import { PageIntro } from "@/components/page-intro";

export default function ReviewFlowsPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Review Flows" description="Build ordered review workflows with status markers, decision notes, and next actions." cta="Tip: combine with extension packs for reusable flow policies." />
      <SendToMenu source="review-flow" />
      <PipelinePreviewDialog sourceType="review-flow" sourceId="current-review-flow" options={["overview", "decision", "next-actions"]} />
      <ReviewFlowBuilder />
      <AnalyticsSummaryPanel source="review-flows" />
      <ExtensionRegistryPanel />
      <ExtensionPackImportDialog />
    </main>
  );
}
