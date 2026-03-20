import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { SendToMenu } from "@/components/send-to-menu";

export default function AnalyticsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <p className="mt-2 text-sm text-muted">Local dashboard-style analytics summaries from available proof/report data.</p>
      </div>
      <SendToMenu source="analytics" />
      <AnalyticsDashboard />
    </main>
  );
}
