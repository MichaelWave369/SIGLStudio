import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="panel space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Visual SIGL Workbench</p>
        <h2 className="text-4xl font-semibold leading-tight">SIGLStudio is a visual symbolic studio for composing, inspecting, comparing, presenting, reviewing, and handing off SIGL work.</h2>
        <p className="max-w-3xl text-muted">
          v0.5 adds Boards/Canvas mode, richer themes, review packs, deeper provenance normalization, file-based handoff formats, and CI-safe lint tooling.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/boards" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Open Boards</Link>
          <Link href="/review-packs" className="rounded-xl border border-line px-4 py-2">Review Packs</Link>
          <Link href="/present" className="rounded-xl border border-line px-4 py-2">Present</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-5">
        {[
          ["Boards", "Spatial symbolic composition with block-level inspection."],
          ["Themes", "Observatory, Monolith, Lattice, Quiet Paper presets."],
          ["Review Packs", "Deterministic project review bundle generation."],
          ["Handoff", "File-based handoff bundles with integrity checks."],
          ["Provenance", "Local vs engine metadata normalization panels."]
        ].map(([title, body]) => (
          <article key={title} className="panel">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
