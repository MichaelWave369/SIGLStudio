import type { ValidationObligation } from "@/lib/types";

export function ObligationTracePanel({ obligations }: { obligations: ValidationObligation[] }) {
  if (!obligations.length) return <p className="text-sm text-muted">No obligation trace available.</p>;
  return (
    <div className="space-y-2">
      {obligations.map((item) => (
        <div key={item.id} className="rounded-lg border border-line bg-slate-950/40 p-3">
          <div className="flex items-center justify-between text-sm">
            <span>{item.label}</span>
            <span className={item.status === "pass" ? "text-emerald-300" : item.status === "warn" ? "text-amber-300" : "text-rose-300"}>{item.status}</span>
          </div>
          <p className="mt-1 text-xs text-muted">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
