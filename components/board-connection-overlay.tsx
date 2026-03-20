"use client";

import type { Board } from "@/lib/boardTypes";

export function BoardConnectionOverlay({ board }: { board: Board }) {
  const byId = Object.fromEntries(board.blocks.map((b) => [b.id, b]));

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full">
      {board.connections.map((c) => {
        const from = byId[c.from_block_id];
        const to = byId[c.to_block_id];
        if (!from || !to) return null;
        return (
          <g key={c.id}>
            <line x1={from.x + from.w / 2} y1={from.y + from.h / 2} x2={to.x + to.w / 2} y2={to.y + to.h / 2} stroke="rgba(94,234,212,0.7)" strokeDasharray="4 4" />
            {c.label ? <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2} fill="rgba(226,232,240,0.9)" fontSize="11">{c.label}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}
