import Link from "next/link";

const lanes = [
  ["/review-flows", "Curated Review Templates", "Start from repeatable review systems and save custom local templates."],
  ["/boards", "Board Pipelines", "Generate artifact/review/presentation/handoff/session outputs from board selections."],
  ["/validate", "Analytics Overlays", "Use proof/report analytics summaries with deterministic breakdown charts."],
  ["/review-flows", "Local Extensions", "Load bounded local extension registries for template/preset hooks."],
  ["/artifacts", "Artifact Workflows", "Build deterministic artifact sets for downstream reviews and handoff."],
  ["/review-packs", "Review Packs", "Bridge packs, templates, imports, and analytics in local-first workflows."]
] as const;

export default function HomePage() {
  return (
    <main className="space-y-4">
      <section className="panel">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGLStudio v0.7</p>
        <h2 className="mt-1 text-2xl font-semibold">Repeatable Review Systems & Analytics</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">SIGLStudio remains the product/visual workstation while Vibe remains canonical for proof truth, parsing, lowering, and verification.</p>
      </section>
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
