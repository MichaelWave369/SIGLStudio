"use client";

import { useState } from "react";
import type { Board, BoardBlock } from "@/lib/boardTypes";
import { addBlock, boardHash, createBoard, getBoards, saveBoards } from "@/lib/boardStorage";
import { BoardCanvas } from "@/components/board-canvas";
import { BoardToolbar } from "@/components/board-toolbar";
import { BoardInspector } from "@/components/board-inspector";
import { downloadTextFile } from "@/lib/utils";
import { BoardSelectionToolbar } from "@/components/board-selection-toolbar";
import { BoardLayerPanel } from "@/components/board-layer-panel";
import { alignBlocksLeft, distributeBlocksHorizontally } from "@/lib/boardTransforms";
import { BoardPipelinePanel } from "@/components/board-pipeline-panel";
import { PipelinePreviewDialog } from "@/components/pipeline-preview-dialog";

export function BoardWorkspace() {
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [, setRefresh] = useState(0);
  const boards = getBoards();
  const board = boards.find((b) => b.id === selectedBoardId) ?? boards[0] ?? null;
  const [selectedBlockIds, setSelectedBlockIds] = useState<string[]>([]);

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

  const selectedBlocks = board.blocks.filter((b) => selectedBlockIds.includes(b.id));
  const selectedBlock = selectedBlocks[0] ?? null;

  const sourceSeedOptions = ["project", "review-pack", "session", "batch", "diff"] as const;

  return (
    <div className="space-y-4">
      <div className="panel flex flex-wrap items-center gap-2 text-sm">
        <select value={board.id} onChange={(e) => setSelectedBoardId(e.target.value)} className="rounded border border-line bg-slate-950/50 p-2">
          {boards.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
        <button className="rounded border border-line px-3 py-1" onClick={() => { const b = createBoard(`Board ${boards.length + 1}`, "New board"); setSelectedBoardId(b.id); setRefresh((v) => v + 1); }}>New Board</button>
        <button className="rounded border border-line px-3 py-1" onClick={() => {
          const source = sourceSeedOptions[(boards.length - 1) % sourceSeedOptions.length];
          persist(addBlock(board, { type: "review-notes", title: `Seeded from ${source}`, content: `Created from ${source} context`, x: 24, y: 24, w: 220, h: 140 }));
        }}>Seed from Context</button>
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
      <BoardSelectionToolbar
        selectedCount={selectedBlocks.length}
        onAlignLeft={() => persist({ ...board, blocks: board.blocks.map((b) => selectedBlockIds.includes(b.id) ? alignBlocksLeft(selectedBlocks).find((s) => s.id === b.id) ?? b : b) })}
        onDistribute={() => persist({ ...board, blocks: board.blocks.map((b) => selectedBlockIds.includes(b.id) ? distributeBlocksHorizontally(selectedBlocks).find((s) => s.id === b.id) ?? b : b) })}
        onDuplicate={() => persist({ ...board, blocks: [...board.blocks, ...selectedBlocks.map((b) => ({ ...b, id: crypto.randomUUID(), x: b.x + 20, y: b.y + 20 }))] })}
        onGroup={() => {
          const group_id = crypto.randomUUID();
          persist({ ...board, blocks: board.blocks.map((b) => selectedBlockIds.includes(b.id) ? { ...b, group_id } : b) });
        }}
        onUngroup={() => persist({ ...board, blocks: board.blocks.map((b) => selectedBlockIds.includes(b.id) ? { ...b, group_id: undefined } : b) })}
      />
      <BoardPipelinePanel board={board} selectedBlockIds={selectedBlockIds} />
      <PipelinePreviewDialog sourceType="board" sourceId={board.id} options={board.blocks.map((b) => b.id)} />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <BoardCanvas board={board} selectedIds={selectedBlockIds} onSelectBlock={(id, multi) => setSelectedBlockIds((prev) => (multi ? (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]) : [id]))} />
        <div className="space-y-4">
          <BoardInspector
            block={selectedBlock}
            onUpdate={(next) => persist({ ...board, blocks: board.blocks.map((b) => (b.id === next.id ? next : b)) })}
            onDelete={() => selectedBlock && persist({ ...board, blocks: board.blocks.filter((b) => b.id !== selectedBlock.id) })}
            onDuplicate={() => selectedBlock && persist({ ...board, blocks: [...board.blocks, { ...selectedBlock, id: crypto.randomUUID(), x: selectedBlock.x + 24, y: selectedBlock.y + 24 }] as BoardBlock[] })}
          />
          <BoardLayerPanel layers={board.layers} onChange={(layers) => persist({ ...board, layers })} />
        </div>
      </div>
    </div>
  );
}
