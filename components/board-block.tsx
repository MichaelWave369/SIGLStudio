"use client";

import type { BoardBlock } from "@/lib/boardTypes";

export function BoardBlockCard({ block, selected, onSelect }: { block: BoardBlock; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`absolute rounded-lg border bg-slate-950/70 p-2 text-left text-xs ${selected ? "border-accent" : "border-line"} ${block.locked ? "opacity-70" : ""}`}
      style={{ left: block.x, top: block.y, width: block.w, height: block.h }}
    >
      <div className="flex items-center justify-between gap-1">
        <p className="font-semibold">{block.title}</p>
        {block.locked ? <span>🔒</span> : null}
      </div>
      <p className="mt-1 line-clamp-4 text-muted">{block.content}</p>
    </button>
  );
}
