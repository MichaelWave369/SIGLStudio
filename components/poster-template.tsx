import type { ArtifactTemplateConfig } from "@/lib/types";

export function PosterTemplate({ config }: { config: ArtifactTemplateConfig }) {
  return <div className="rounded-xl border border-line bg-slate-950/60 p-6"><h3 className="text-3xl font-semibold">{config.title}</h3><p className="text-muted">{config.subtitle}</p><p className="mt-6 font-mono text-xl">{config.source}</p></div>;
}
