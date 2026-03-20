export function PresentationControls({
  index,
  total,
  onPrev,
  onNext,
  onExit
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-slate-950/50 p-3 text-sm">
      <button onClick={onPrev}>← Prev</button>
      <span>{index + 1} / {total}</span>
      <div className="flex gap-3">
        <button onClick={onNext}>Next →</button>
        <button onClick={onExit}>Esc Exit</button>
      </div>
    </div>
  );
}
