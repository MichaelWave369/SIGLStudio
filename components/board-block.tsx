"use client";

import type { BoardBlock } from "@/lib/boardTypes";

export function BoardBlockCard({ block, onSelect }: { block: BoardBlock; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="absolute rounded-lg border border-line bg-slate-950/70 p-2 text-left text-xs"
      style={{ left: block.x, top: block.y, width: block.w, height: block.h }}
    >
      <p className="font-semibold">{block.title}</p>
      <p className="mt-1 line-clamp-4 text-muted">{block.content}</p>
    </button>
  );
}
