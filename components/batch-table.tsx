import type { BatchItemResult } from "@/lib/types";

export function BatchTable({ rows, onSelect }: { rows: BatchItemResult[]; onSelect: (id: string) => void }) {
  return (
    <div className="overflow-auto rounded-xl border border-line">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-900/60"><tr><th className="p-2">Title</th><th>Mode</th><th>Pass</th><th>Bridge</th><th>Issues</th><th>Obligations</th><th>Hash</th><th>Sequence</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item.id} className="cursor-pointer border-t border-line" onClick={() => onSelect(row.item.id)}>
              <td className="p-2">{row.item.title}</td>
              <td>{row.validation?.mode ?? "-"}</td>
              <td>{row.validation ? (row.validation.valid ? "pass" : "fail") : "-"}</td>
              <td>{row.validation ? Math.round(row.validation.bridgeScore * 100) : "-"}</td>
              <td>{row.validation?.issues.length ?? 0}</td>
              <td>{row.validation?.obligations.length ?? 0}</td>
              <td>{row.sourceHash}</td>
              <td>{row.item.sequence ? "yes" : "no"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
