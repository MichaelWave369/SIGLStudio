"use client";

import type { Board } from "@/lib/boardTypes";
import { BoardBlockCard } from "@/components/board-block";
import { BoardConnectionOverlay } from "@/components/board-connection-overlay";

export function BoardCanvas({ board, selectedIds, onSelectBlock }: { board: Board; selectedIds: string[]; onSelectBlock: (id: string, multi: boolean) => void }) {
  return (
    <div className="relative h-[620px] overflow-auto rounded-xl border border-line bg-slate-950/40" style={{ backgroundSize: `${12 * board.zoom}px ${12 * board.zoom}px`, backgroundImage: "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)" }}>
      <BoardConnectionOverlay board={board} />
      {board.blocks.map((block) => (
        <BoardBlockCard key={block.id} block={block} selected={selectedIds.includes(block.id)} onSelect={() => onSelectBlock(block.id, true)} />
      ))}
      <div className="absolute bottom-2 right-2 rounded border border-line bg-panel px-2 py-1 text-[10px] text-muted">Mini-map: {board.blocks.length} blocks</div>
    </div>
  );
}
