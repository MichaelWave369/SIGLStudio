import { ReviewFlowBuilder } from "@/components/review-flow-builder";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { ExtensionRegistryPanel } from "@/components/extension-registry-panel";

export default function ReviewFlowsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Review Flows</h2>
        <p className="mt-2 text-sm text-muted">Build ordered review workflows with status markers, decision notes, and next actions.</p>
      </div>
      <ReviewFlowBuilder />
      <AnalyticsSummaryPanel source="review-flows" />
      <ExtensionRegistryPanel />
    </main>
  );
}
