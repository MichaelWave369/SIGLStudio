"use client";

import type { BoardLayer } from "@/lib/types";

export function BoardLayerPanel({ layers, onChange }: { layers: BoardLayer[]; onChange: (layers: BoardLayer[]) => void }) {
  return (
    <div className="panel space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Layers</h3>
        <button
          className="rounded border border-line px-2 py-1 text-xs"
          onClick={() => onChange([...layers, { id: crypto.randomUUID(), title: `Layer ${layers.length + 1}`, visible: true, locked: false }])}
        >
          Add Layer
        </button>
      </div>
      {layers.map((layer) => (
        <div key={layer.id} className="rounded border border-line p-2">
          <input value={layer.title} onChange={(e) => onChange(layers.map((l) => (l.id === layer.id ? { ...l, title: e.target.value } : l)))} className="w-full rounded border border-line bg-slate-950/50 p-1" />
          <div className="mt-2 flex gap-2 text-xs">
            <button className="rounded border border-line px-2 py-0.5" onClick={() => onChange(layers.map((l) => (l.id === layer.id ? { ...l, visible: !l.visible } : l)))}>{layer.visible ? "Hide" : "Show"}</button>
            <button className="rounded border border-line px-2 py-0.5" onClick={() => onChange(layers.map((l) => (l.id === layer.id ? { ...l, locked: !l.locked } : l)))}>{layer.locked ? "Unlock" : "Lock"}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
