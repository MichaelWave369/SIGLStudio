import { BoardWorkspace } from "@/components/board-workspace";

export default function BoardsPage() {
  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Boards / Canvas</h2>
        <p className="mt-2 text-sm text-muted">Layered symbolic review surface with locking, grouping, alignment/distribution, and optional relation lines.</p>
      </div>
      <BoardWorkspace />
    </main>
  );
}
