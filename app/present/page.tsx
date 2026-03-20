import { PresentationWorkspace } from "@/components/presentation-workspace";

export default function PresentPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Presentation Mode</h2>
        <p className="mt-2 text-sm text-muted">Cinematic, step-based walkthrough mode with keyboard navigation and clean layout toggles.</p>
      </div>
      <PresentationWorkspace />
    </main>
  );
}
