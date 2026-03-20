import { PresentationWorkspace } from "@/components/presentation-workspace";
import { PageIntro } from "@/components/page-intro";

export default function PresentPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Presentation Mode" description="Cinematic, step-based walkthrough mode with keyboard navigation and clean layout toggles." cta="Tip: import a session export to bootstrap a live demo quickly." />
      <PresentationWorkspace />
    </main>
  );
}
