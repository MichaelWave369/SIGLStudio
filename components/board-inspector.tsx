"use client";

import type { BoardBlock } from "@/lib/boardTypes";

export function BoardInspector({ block, onUpdate, onDelete, onDuplicate }: { block: BoardBlock | null; onUpdate: (next: BoardBlock) => void; onDelete: () => void; onDuplicate: () => void }) {
  if (!block) return <div className="panel text-sm text-muted">Select a block to inspect.</div>;
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Block Inspector</h3>
      <input value={block.title} onChange={(e) => onUpdate({ ...block, title: e.target.value })} className="w-full rounded border border-line bg-slate-950/50 p-2" />
      <textarea value={block.content} onChange={(e) => onUpdate({ ...block, content: e.target.value })} className="w-full rounded border border-line bg-slate-950/50 p-2" />
      <div className="grid grid-cols-2 gap-2">
        <input type="number" value={block.x} onChange={(e) => onUpdate({ ...block, x: Number(e.target.value) })} className="rounded border border-line bg-slate-950/50 p-2" />
        <input type="number" value={block.y} onChange={(e) => onUpdate({ ...block, y: Number(e.target.value) })} className="rounded border border-line bg-slate-950/50 p-2" />
      </div>
      <div className="flex gap-2">
        <button className="rounded border border-line px-3 py-1" onClick={onDuplicate}>Duplicate</button>
        <button className="rounded border border-rose-400/40 px-3 py-1 text-rose-300" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
