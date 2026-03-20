import Link from "next/link";

const lanes = [
  ["/publishing", "Publishing Bundles", "Package polished local review/handoff/presentation bundles with deterministic manifests."],
  ["/boards", "Pipeline Blueprints", "Instantiate reusable pipeline blueprints into concrete manifests."],
  ["/recipes", "Automation Packs", "Run guarded automation packs with dry-run and explicit summaries."],
  ["/analytics", "Analytics Dashboard", "Use local dashboard metrics and route-aware follow-up actions."],
  ["/review-flows", "Review Readiness", "Build coherent review flows and publishing-linked narratives."],
  ["/projects", "1.0 Workflow Cohesion", "Move across project/review/artifact/publishing contexts with fewer rough edges."]
] as const;

export default function HomePage() {
  return (
    <main className="space-y-4">
      <section className="panel">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGLStudio v0.9</p>
        <h2 className="mt-1 text-2xl font-semibold">1.0 Readiness and Publishing Bundles</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">Local-first workstation polish phase focused on publishing bundles, reusable pipeline blueprints, guarded automation packs, and final UX readiness.</p>
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
