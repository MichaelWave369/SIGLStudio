"use client";

export function BoardToolbar({ onAdd, onZoom, onExport }: { onAdd: () => void; onZoom: (delta: number) => void; onExport: () => void }) {
  return (
    <div className="panel flex flex-wrap gap-2 text-sm">
      <button className="rounded border border-line px-3 py-1" onClick={onAdd}>Add Block</button>
      <button className="rounded border border-line px-3 py-1" onClick={() => onZoom(0.1)}>Zoom +</button>
      <button className="rounded border border-line px-3 py-1" onClick={() => onZoom(-0.1)}>Zoom -</button>
      <button className="rounded border border-line px-3 py-1" onClick={() => onZoom(0)}>Reset Zoom</button>
      <button className="rounded border border-line px-3 py-1" onClick={onExport}>Export Board JSON</button>
    </div>
  );
}
