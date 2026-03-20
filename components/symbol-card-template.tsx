import type { ArtifactTemplateConfig } from "@/lib/types";

export function SymbolCardTemplate({ config }: { config: ArtifactTemplateConfig }) {
  return <div className="rounded-xl border border-line bg-slate-950/60 p-5"><p className="text-sm text-muted">{config.subtitle}</p><p className="mt-2 text-4xl">{config.source}</p><p className="mt-3 text-lg">{config.title}</p></div>;
}
