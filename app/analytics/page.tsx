import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { SendToMenu } from "@/components/send-to-menu";
import { PageIntro } from "@/components/page-intro";

export default function AnalyticsPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Analytics Dashboard" description="Use local, deterministic analytics summaries to inspect obligations, issues, and review-health signals." />
      <SendToMenu source="analytics" />
      <AnalyticsDashboard />
    </main>
  );
}
