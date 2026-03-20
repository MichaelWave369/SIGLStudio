import type { ReviewPack } from "@/lib/reviewPack";

export function ReviewPackSectionEditor({ pack, onChange }: { pack: ReviewPack; onChange: (next: ReviewPack) => void }) {
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Sections</h3>
      {[...pack.sections].sort((a, b) => a.order - b.order).map((section) => (
        <div key={section.id} className="rounded border border-line bg-slate-950/50 p-2">
          <p className="font-medium">{section.title}</p>
          <textarea value={section.content} onChange={(e) => onChange({ ...pack, sections: pack.sections.map((s) => (s.id === section.id ? { ...s, content: e.target.value } : s)) })} className="mt-1 w-full rounded border border-line bg-transparent p-2 text-xs" />
        </div>
      ))}
    </div>
  );
}
