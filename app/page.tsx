import Link from "next/link";

const lanes = [
  ["/boards", "Composition Pipelines", "Preview and export deterministic manifests across board/review/artifact/presentation workflows."],
  ["/analytics", "Analytics Dashboard", "Filter and inspect local dashboard metrics using real available ingestion data."],
  ["/recipes", "Automation Recipes", "Create explicit, user-triggered local recipes for repeatable review/export runs."],
  ["/review-flows", "Extension Packs", "Import versioned extension packs with migration-aware validation."],
  ["/projects", "Route-aware Send To", "Move quickly between project/review/board/artifact contexts with send-to actions."],
  ["/artifacts", "Deterministic Outputs", "Export manifests, summaries, and artifacts with explicit metadata."]
] as const;

export default function HomePage() {
  return (
    <main className="space-y-4">
      <section className="panel">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGLStudio v0.8</p>
        <h2 className="mt-1 text-2xl font-semibold">Composition Pipelines and Workstation Polish</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">SIGLStudio remains local-first and product-layer focused; Vibe remains canonical for verification/proof truth and engine provenance.</p>
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
