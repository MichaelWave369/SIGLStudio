import { HandoffImportDialog } from "@/components/handoff-import-dialog";
import { ReviewPackBuilder } from "@/components/review-pack-builder";

export default function ReviewPacksPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Project Review Packs</h2>
        <p className="mt-2 text-sm text-muted">Create deterministic review bundles from projects, with sectioned summaries and handoff exports.</p>
      </div>
      <HandoffImportDialog />
      <ReviewPackBuilder />
    </main>
  );
}
