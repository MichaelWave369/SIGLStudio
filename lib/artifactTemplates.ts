import type { ArtifactTemplateConfig, ArtifactType } from "@/lib/types";

export const artifactTypes: ArtifactType[] = ["poster", "symbol-card", "sequence-card", "diff-card", "project-overview"];

export function buildArtifactTemplate(config: ArtifactTemplateConfig) {
  const created_at = new Date().toISOString();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='500'><rect width='100%' height='100%' fill='#0b1020'/><text x='40' y='80' fill='#8ef5d0' font-size='42'>${config.title}</text><text x='40' y='120' fill='#94a3b8' font-size='20'>${config.subtitle}</text><text x='40' y='220' fill='#e2e8f0' font-size='28'>${config.source}</text></svg>`;
  return {
    export_version: "0.4",
    artifact_type: config.type,
    created_at,
    config,
    svg
  };
}
