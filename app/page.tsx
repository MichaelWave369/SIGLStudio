import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="panel space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Visual SIGL Workbench</p>
        <h2 className="text-4xl font-semibold leading-tight">SIGLStudio is a visual symbolic studio for composing, exploring, validating, inspecting, comparing, and exporting SIGL.</h2>
        <p className="max-w-3xl text-muted">
          v0.3 focuses on analysis and project workflows: semantic diff, batch runs, atlas relation graphing, and local project packs with integrity metadata.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/compose" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Open Composer</Link>
          <Link href="/projects" className="rounded-xl border border-line px-4 py-2">Open Projects</Link>
          <span className="rounded-xl border border-line px-4 py-2 text-sm text-muted">Tip: Press Ctrl/Cmd + K</span>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-5">
        {[
          ["Diff", "Compare two sigils with semantic summary cards."],
          ["Batch", "Run validate/inspect workflows over multiple rows."],
          ["Atlas Graph", "Explore symbol neighborhoods and relation labels."],
          ["Projects", "Create/import/export project packs with integrity hashes."],
          ["Export", "Deterministic report and bundle metadata outputs."]
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
