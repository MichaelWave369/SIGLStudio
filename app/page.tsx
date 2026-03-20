import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="panel space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Visual SIGL Workbench</p>
        <h2 className="text-4xl font-semibold leading-tight">SIGLStudio is a visual symbolic studio for composing, exploring, validating, and exporting SIGL.</h2>
        <p className="max-w-3xl text-muted">
          SIGLStudio is the product/UI layer. Vibe remains the canonical engine for parsing, lowering, verification, and bridge-truth decisions.
          This app stays local-first and gracefully operates in Mock Engine Mode when Vibe CLI is unavailable.
        </p>
        <div className="flex gap-3">
          <Link href="/compose" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Open Composer</Link>
          <Link href="/atlas" className="rounded-xl border border-line px-4 py-2">Browse Atlas</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Compose", "Author sigils with glyph insertion and draft snapshots."],
          ["Validate", "Read obligations, bridge score, and pass/fail posture."],
          ["Export", "Download JSON, SVG, text, and .vibe snippet artifacts."]
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
