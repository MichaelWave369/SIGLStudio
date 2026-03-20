"use client";

import type { Board } from "@/lib/boardTypes";
import { BoardBlockCard } from "@/components/board-block";

export function BoardCanvas({ board, onSelectBlock }: { board: Board; onSelectBlock: (id: string) => void }) {
  return (
    <div className="relative h-[620px] overflow-auto rounded-xl border border-line bg-slate-950/40" style={{ backgroundSize: `${12 * board.zoom}px ${12 * board.zoom}px`, backgroundImage: "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)" }}>
      {board.blocks.map((block) => (
        <BoardBlockCard key={block.id} block={block} onSelect={() => onSelectBlock(block.id)} />
      ))}
    </div>
  );
}
