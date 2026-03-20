import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="panel space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Visual SIGL Workbench</p>
        <h2 className="text-4xl font-semibold leading-tight">SIGLStudio is a visual symbolic studio for composing, exploring, validating, and exporting SIGL.</h2>
        <p className="max-w-3xl text-muted">
          SIGLStudio remains local-first and UI-focused. Vibe remains canonical for parsing/lowering/verification truth.
          v0.2 adds command palette, keyboard glyph shortcuts, richer inspect panes, upgraded atlas filtering, and deterministic export bundles.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/compose" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Open Composer</Link>
          <Link href="/atlas" className="rounded-xl border border-line px-4 py-2">Browse Atlas</Link>
          <span className="rounded-xl border border-line px-4 py-2 text-sm text-muted">Tip: Press Ctrl/Cmd + K</span>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Compose", "Author sigils with cursor-aware glyph insertion and draft workflows."],
          ["Inspect", "Navigate canonical/summary/tree/graph/trace panes."],
          ["Atlas", "Filter by category and semantic groups with glyph details."],
          ["Export", "Bundle deterministic metadata with JSON/SVG/source/.vibe files."]
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
