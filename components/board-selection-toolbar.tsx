"use client";

export function BoardSelectionToolbar({
  selectedCount,
  onAlignLeft,
  onDistribute,
  onDuplicate,
  onGroup,
  onUngroup
}: {
  selectedCount: number;
  onAlignLeft: () => void;
  onDistribute: () => void;
  onDuplicate: () => void;
  onGroup: () => void;
  onUngroup: () => void;
}) {
  return (
    <div className="panel flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted">Selection: {selectedCount}</span>
      <button className="rounded border border-line px-2 py-1" onClick={onAlignLeft} disabled={selectedCount < 2}>Align Left</button>
      <button className="rounded border border-line px-2 py-1" onClick={onDistribute} disabled={selectedCount < 3}>Distribute H</button>
      <button className="rounded border border-line px-2 py-1" onClick={onDuplicate} disabled={selectedCount < 1}>Duplicate</button>
      <button className="rounded border border-line px-2 py-1" onClick={onGroup} disabled={selectedCount < 2}>Group</button>
      <button className="rounded border border-line px-2 py-1" onClick={onUngroup} disabled={selectedCount < 1}>Ungroup</button>
    </div>
  );
}
