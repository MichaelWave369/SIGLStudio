import type { ProjectPack } from "@/lib/types";

export function ProjectIntegrityCard({ project }: { project: ProjectPack }) {
  return (
    <div className="panel space-y-2 text-sm">
      <h3 className="font-semibold">Integrity</h3>
      <p>Pack hash: {project.pack_hash}</p>
      <p>Item count: {project.items.length}</p>
      <p>Sequence count: {project.items.filter((i) => i.type === "sequence").length}</p>
      <p>Export version: {project.export_version}</p>
    </div>
  );
}
