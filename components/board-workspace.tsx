"use client";

import { useState } from "react";
import type { Board, BoardBlock } from "@/lib/boardTypes";
import { addBlock, boardHash, createBoard, getBoards, saveBoards } from "@/lib/boardStorage";
import { BoardCanvas } from "@/components/board-canvas";
import { BoardToolbar } from "@/components/board-toolbar";
import { BoardInspector } from "@/components/board-inspector";
import { downloadTextFile } from "@/lib/utils";

export function BoardWorkspace() {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [, setRefresh] = useState(0);
  const boards = getBoards();
  const board = boards.find((b) => b.id === selectedBoardId) ?? boards[0] ?? null;
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  if (!board) {
    return (
      <div className="panel">
        <p className="text-sm text-muted">No boards yet.</p>
        <button className="mt-2 rounded border border-line px-3 py-1 text-sm" onClick={() => { const b = createBoard("Starter Board", "Freeform symbolic board"); setSelectedBoardId(b.id); setRefresh((v) => v + 1); }}>Create Starter Board</button>
      </div>
    );
  }

  const persist = (next: Board) => {
    saveBoards(boards.map((b) => (b.id === next.id ? next : b)));
    setRefresh((v) => v + 1);
  };

  const selectedBlock = board.blocks.find((b) => b.id === selectedBlockId) ?? null;

  return (
    <div className="space-y-4">
      <div className="panel flex flex-wrap items-center gap-2 text-sm">
        <select value={board.id} onChange={(e) => setSelectedBoardId(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2">
          {boards.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
        <button className="rounded border border-line px-3 py-1" onClick={() => { const b = createBoard(`Board ${boards.length + 1}`, "New board"); setSelectedBoardId(b.id); setRefresh((v) => v + 1); }}>New Board</button>
        <button className="rounded border border-rose-400/40 px-3 py-1 text-rose-300" onClick={() => { saveBoards(boards.filter((b) => b.id !== board.id)); setSelectedBoardId(null); setRefresh((v) => v + 1); }}>Delete Board</button>
        <span className="text-xs text-muted">Hash: {boardHash(board)}</span>
      </div>
      <BoardToolbar
        onAdd={() => {
          persist(addBlock(board, { type: "note", title: "Note", content: "Board block", x: 24, y: 24, w: 220, h: 140 }));
        }}
        onZoom={(delta) => {
          const zoom = delta === 0 ? 1 : Math.max(0.5, Math.min(2, board.zoom + delta));
          persist({ ...board, zoom });
        }}
        onExport={() => downloadTextFile(`${board.title}.siglboard.json`, JSON.stringify(board, null, 2))}
      />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <BoardCanvas board={board} onSelectBlock={setSelectedBlockId} />
        <BoardInspector
          block={selectedBlock}
          onUpdate={(next) => persist({ ...board, blocks: board.blocks.map((b) => (b.id === next.id ? next : b)) })}
          onDelete={() => selectedBlock && persist({ ...board, blocks: board.blocks.filter((b) => b.id !== selectedBlock.id) })}
          onDuplicate={() => selectedBlock && persist({ ...board, blocks: [...board.blocks, { ...selectedBlock, id: crypto.randomUUID(), x: selectedBlock.x + 24, y: selectedBlock.y + 24 }] as BoardBlock[] })}
        />
      </div>
    </div>
  );
}
