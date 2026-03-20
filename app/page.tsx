import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <section className="panel space-y-4 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">Visual SIGL Workbench</p>
        <h2 className="text-4xl font-semibold leading-tight">SIGLStudio is a visual symbolic studio for composing, exploring, validating, inspecting, comparing, presenting, and exporting SIGL.</h2>
        <p className="max-w-3xl text-muted">
          v0.4 introduces presentation mode, guided sessions, artifact templates, and stronger provenance visibility across analysis surfaces.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/present" className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Start Presentation</Link>
          <Link href="/sessions" className="rounded-xl border border-line px-4 py-2">Open Sessions</Link>
          <Link href="/artifacts" className="rounded-xl border border-line px-4 py-2">Build Artifacts</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-5">
        {[
          ["Present", "Distraction-reduced walkthrough with keyboard controls."],
          ["Sessions", "Guided step orchestration with checkpoints and notes."],
          ["Artifacts", "Poster/card SVG templates plus config JSON exports."],
          ["Provenance", "Unified provenance/trace cards across analysis views."],
          ["Projects", "Local project organization and integrity metadata."]
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
