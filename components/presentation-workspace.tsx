"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PresentationControls } from "@/components/presentation-controls";
import { PresentationModeToggle } from "@/components/presentation-mode-toggle";
import { PresentationSlide } from "@/components/presentation-slide";
import { PresentationSourcePicker } from "@/components/presentation-source-picker";
import { getCurrentSource } from "@/lib/studioStorage";
import { createPresentationConfig } from "@/lib/presentationConfig";
import { downloadTextFile } from "@/lib/utils";
import { ThemePicker } from "@/components/theme-picker";

export function PresentationWorkspace() {
  const router = useRouter();
  const [sourceType, setSourceType] = useState<"compose" | "sequence" | "diff" | "batch" | "project" | "session">("compose");
  const [index, setIndex] = useState(0);
  const [cleanMode, setCleanMode] = useState(false);
  const [focusMode, setFocusMode] = useState<"symbol-first" | "analysis-first" | "balanced">("balanced");
  const [themeId, setThemeId] = useState("observatory");

  const config = useMemo(
    () =>
      createPresentationConfig({
        title: "SIGL Presentation",
        sourceType,
        focusMode,
        cleanMode,
        slides: [
          { id: "s1", title: "Source", source: getCurrentSource() || "Φ" },
          { id: "s2", title: "Analysis", source: "Parsed summary + obligations" },
          { id: "s3", title: "Review", source: "Trace + notes" }
        ]
      }),
    [sourceType, focusMode, cleanMode]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((v) => Math.min(v + 1, config.slides.length - 1));
      if (event.key === "ArrowLeft") setIndex((v) => Math.max(v - 1, 0));
      if (event.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [config.slides.length, router]);

  const slide = config.slides[index];

  return (
    <div className={`space-y-4 ${cleanMode ? "px-16 py-10" : ""}`}>
      {!cleanMode ? (
        <div className="panel flex flex-wrap items-center gap-2">
          <PresentationSourcePicker value={sourceType} onChange={setSourceType} />
          <select className="rounded border border-line bg-slate-950/50 p-2 text-sm" value={focusMode} onChange={(e) => setFocusMode(e.target.value as typeof focusMode)}>
            <option value="symbol-first">symbol-first</option>
            <option value="analysis-first">analysis-first</option>
            <option value="balanced">balanced</option>
          </select>
          <ThemePicker value={themeId} onChange={setThemeId} />
          <PresentationModeToggle cleanMode={cleanMode} onToggle={() => setCleanMode((v) => !v)} />
          <button className="rounded border border-line px-3 py-1 text-sm" onClick={() => downloadTextFile("presentation-config.json", JSON.stringify({ ...config, theme_id: themeId }, null, 2))}>Export Config</button>
        </div>
      ) : null}
      <PresentationSlide slide={slide} focusMode={focusMode} showPanels={!cleanMode} />
      <PresentationControls index={index} total={config.slides.length} onPrev={() => setIndex((v) => Math.max(v - 1, 0))} onNext={() => setIndex((v) => Math.min(v + 1, config.slides.length - 1))} onExit={() => router.push("/")} />
    </div>
  );
}
