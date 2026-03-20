import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

const lanes = [
  ["/compose", "Compose + Validate", "Draft and verify symbolic content with mock-first or optional Vibe-backed flows."],
  ["/boards", "Boards + Pipelines", "Organize symbolic material and instantiate pipeline blueprints."],
  ["/review-flows", "Review Systems", "Use review packs/flows for structured decision-making."],
  ["/artifacts", "Artifacts", "Generate deterministic artifact outputs and manifests."],
  ["/publishing", "Publishing Bundles", "Package polished local handoff/review bundles."],
  ["/recipes", "Automation Packs", "Run explicit, guardrailed automation recipes with dry-run reports."]
] as const;

export default function HomePage() {
  return (
    <main className="space-y-4">
      <PageIntro title="SIGLStudio v1.0" description="Local-first symbolic workstation focused on deterministic review, publishing, and handoff workflows." />
      <section className="grid gap-3 md:grid-cols-2">
        {lanes.map(([href, title, copy]) => (
          <Link key={href} href={href} className="panel transition hover:border-accent/50">
            <p className="text-lg font-semibold">{title}</p>
            <p className="mt-1 text-sm text-muted">{copy}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
