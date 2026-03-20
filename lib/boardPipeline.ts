import type { Board } from "@/lib/boardTypes";
import type { BoardPipelineManifest } from "@/lib/types";
import { boardHash } from "@/lib/boardStorage";

export function createBoardPipelineManifest(input: {
  board: Board;
  selected_block_ids: string[];
  output_type: BoardPipelineManifest["output_type"];
  theme_id: string;
}): BoardPipelineManifest {
  return {
    id: crypto.randomUUID(),
    board_id: input.board.id,
    board_hash: boardHash(input.board),
    output_type: input.output_type,
    selected_block_ids: [...input.selected_block_ids].sort(),
    theme_id: input.theme_id,
    created_at: new Date().toISOString(),
    export_version: "0.7",
    source_context: `board:${input.board.id}`
  };
}
