import { ReviewFlowBuilder } from "@/components/review-flow-builder";

export default function ReviewFlowsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Review Flows</h2>
        <p className="mt-2 text-sm text-muted">Build ordered review workflows with status markers, decision notes, and next actions.</p>
      </div>
      <ReviewFlowBuilder />
    </main>
  );
}
