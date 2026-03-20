"use client";

import { useRouter } from "next/navigation";
import { AtlasBrowser } from "@/components/AtlasBrowser";
import { setCurrentSource } from "@/lib/studioStorage";

export default function AtlasPage() {
  const router = useRouter();

  const load = (example: string, symbol?: string) => {
    setCurrentSource(example);
    if (symbol) void navigator.clipboard.writeText(symbol);
    router.push("/compose");
  };

  return (
    <main className="space-y-4">
      <div className="panel">
        <h2 className="text-xl font-semibold">Core Glyph Atlas</h2>
        <p className="mt-2 text-sm text-muted">Filter by generators/operators/states, inspect semantic groups, and load examples directly into Compose.</p>
      </div>
      <AtlasBrowser onLoad={load} />
    </main>
  );
}
