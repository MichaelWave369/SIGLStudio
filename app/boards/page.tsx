import { BoardWorkspace } from "@/components/board-workspace";
import { PageIntro } from "@/components/page-intro";

export default function BoardsPage() {
  return (
    <main className="space-y-4">
      <PageIntro title="Boards / Canvas" description="Layered symbolic review surface with locking/grouping plus selection-aware pipeline exports into artifacts/review/presentation/handoff/session manifests." cta="Next: use pipeline preview to instantiate a board-first review flow." />
      <BoardWorkspace />
    </main>
  );
}
