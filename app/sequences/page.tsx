import { TemporalSequenceEditor } from "@/components/TemporalSequenceEditor";

export default function SequencesPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Temporal Sequence Workspace</h2>
        <p className="mt-2 text-sm text-muted">Use Alt-based glyph shortcuts while editing sequence step sigils.</p>
      </div>
      <TemporalSequenceEditor />
    </main>
  );
}
