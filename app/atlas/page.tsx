"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtlasBrowser } from "@/components/AtlasBrowser";
import { AtlasRelationGraph } from "@/components/atlas-relation-graph";
import { RelationLegend } from "@/components/relation-legend";
import { setCurrentSource } from "@/lib/studioStorage";
import { PageIntro } from "@/components/page-intro";

export default function AtlasPage() {
  const router = useRouter();
  const [view, setView] = useState<"list" | "graph">("list");

  const load = (example: string, symbol?: string) => {
    setCurrentSource(example);
    if (symbol) void navigator.clipboard.writeText(symbol);
    router.push("/compose");
  };

  return (
    <main className="space-y-4">
      <div className="space-y-4">
        <PageIntro title="Core Glyph Atlas" description="Browse symbolic neighborhoods via list and relation graph modes." cta="Tip: load a glyph into Compose from list/graph and continue into Validate." />
      </div>
      <div className="panel flex items-center justify-end">
        <div className="flex gap-2 text-xs">
          <button className={`rounded border px-2 py-1 ${view === "list" ? "border-accent/40" : "border-line"}`} onClick={() => setView("list")}>List View</button>
          <button className={`rounded border px-2 py-1 ${view === "graph" ? "border-accent/40" : "border-line"}`} onClick={() => setView("graph")}>Relation Graph</button>
        </div>
      </div>
      {view === "list" ? <AtlasBrowser onLoad={load} /> : <div className="space-y-4"><AtlasRelationGraph /><RelationLegend /></div>}
    </main>
  );
}
