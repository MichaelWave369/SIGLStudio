import Link from "next/link";

const lanes = [
  ["/compose", "Compose + Validate", "Draft SIGL quickly, inspect/validate with mock-first and optional Vibe."],
  ["/boards", "Advanced Boards", "Layered symbolic boards with grouping, connections, and review-focused transforms."],
  ["/review-flows", "Review Flows", "Move from draft to in-review to decision with deterministic section ordering."],
  ["/artifacts", "Artifact Sets", "Generate themed artifact bundles with deterministic manifests."],
  ["/review-packs", "Review Packs", "Package project reviews and handoff payloads with import validation."],
  ["/validate", "Engine Ingestion", "Normalize richer proof/report payloads while preserving architecture boundaries."]
] as const;

export default function HomePage() {
  return (
    <main className="space-y-4">
      <section className="panel">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGLStudio v0.6</p>
        <h2 className="mt-1 text-2xl font-semibold">Desktop-ready Review Workstation</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">Local-first symbolic editing, organization, review, presentation, and handoff UX for SIGL. Vibe remains canonical for verification/proof truth and engine provenance.</p>
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
