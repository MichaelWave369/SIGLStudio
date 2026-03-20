"use client";

import { useState } from "react";
import { GlyphPicker } from "@/components/GlyphPicker";
import { LocalDraftsPanel } from "@/components/LocalDraftsPanel";
import { SigilCanvas } from "@/components/SigilCanvas";
import { SigilInput } from "@/components/SigilInput";
import { useStudioSource } from "@/components/StudioState";
import { sigilExamples } from "@/lib/data/atlas";
import { inspectSigil } from "@/lib/vibeAdapter";
import type { InspectResult } from "@/lib/types";
import { useRouter } from "next/navigation";
import { InspectPaneTabs } from "@/components/inspect-pane-tabs";

export default function ComposePage() {
  const [source, setSource] = useStudioSource(sigilExamples.basic);
  const [inspect, setInspect] = useState<InspectResult | null>(null);
  const router = useRouter();

  const insertGlyph = (glyph: string) => setSource((prev) => `${prev} ${glyph}`.trim());

  return (
    <main className="grid gap-4 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-7">
        <SigilInput
          value={source}
          onChange={setSource}
          onValidate={() => router.push("/validate")}
          onInspect={async () => setInspect(await inspectSigil(source))}
          onExport={() => router.push("/export")}
        />
        <SigilCanvas source={source} />
        <InspectPaneTabs inspect={inspect} />
      </div>
      <div className="space-y-4 lg:col-span-5">
        <GlyphPicker onInsert={insertGlyph} />
        <LocalDraftsPanel current={source} onLoad={setSource} route="/compose" />
      </div>
    </main>
  );
}
