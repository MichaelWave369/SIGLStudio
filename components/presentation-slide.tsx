import type { PresentationConfig } from "@/lib/types";

export function PresentationSlide({
  slide,
  focusMode,
  showPanels
}: {
  slide: PresentationConfig["slides"][number];
  focusMode: PresentationConfig["focusMode"];
  showPanels: boolean;
}) {
  return (
    <div className="panel min-h-[420px] space-y-4">
      <h2 className="text-3xl font-semibold">{slide.title}</h2>
      <p className="font-mono text-xl">{slide.source}</p>
      {showPanels ? (
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div className="rounded border border-line bg-slate-950/50 p-3">Focus mode: {focusMode}</div>
          <div className="rounded border border-line bg-slate-950/50 p-3">Notes: {slide.notes ?? "None"}</div>
        </div>
      ) : null}
    </div>
  );
}
