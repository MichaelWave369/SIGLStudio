import { BatchWorkspace } from "@/components/batch-workspace";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { SendToMenu } from "@/components/send-to-menu";
import { PageIntro } from "@/components/page-intro";

export default function BatchPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Batch Validate / Inspect" description="Run multiple sigils through validation and inspect workflows locally." cta="Next: export stable results as artifacts or publishing bundles." />
      <SendToMenu source="batch" />
      <BatchWorkspace />
      <AnalyticsSummaryPanel source="batch" />
    </main>
  );
}
