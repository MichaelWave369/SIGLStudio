import { BoardWorkspace } from "@/components/board-workspace";

export default function BoardsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Boards / Canvas</h2>
        <p className="mt-2 text-sm text-muted">Freeform symbolic workspace for arranging sigils, notes, provenance and review blocks.</p>
      </div>
      <BoardWorkspace />
    </main>
  );
}
