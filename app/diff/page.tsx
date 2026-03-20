import { DiffWorkspace } from "@/components/diff-workspace";
import { AnalyticsSummaryPanel } from "@/components/analytics-summary-panel";
import { SendToMenu } from "@/components/send-to-menu";
import { PageIntro } from "@/components/page-intro";

export default function DiffPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Diff Workspace" description="Compare two sigils side-by-side with semantic difference summaries." cta="Tip: send comparison outputs to Review Packs for decision logging." />
      <SendToMenu source="diff" />
      <DiffWorkspace />
      <AnalyticsSummaryPanel source="diff" />
    </main>
  );
}
