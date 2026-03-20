export function PresentationModeToggle({ cleanMode, onToggle }: { cleanMode: boolean; onToggle: () => void }) {
  return (
    <button className="rounded border border-line px-3 py-1 text-sm" onClick={onToggle}>
      {cleanMode ? "Exit Clean Mode" : "Enter Clean Mode"}
    </button>
  );
}
