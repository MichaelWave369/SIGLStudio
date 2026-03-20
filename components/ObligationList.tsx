import type { ValidationObligation } from "@/lib/types";

export function ObligationList({ obligations }: { obligations: ValidationObligation[] }) {
  return (
    <ul className="space-y-2">
      {obligations.map((o) => (
        <li key={o.id} className="rounded-xl border border-line bg-slate-950/40 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">{o.label}</span>
            <span className={`text-xs ${o.status === "pass" ? "text-emerald-300" : o.status === "warn" ? "text-amber-300" : "text-rose-300"}`}>{o.status}</span>
          </div>
          <p className="mt-1 text-muted">{o.detail}</p>
        </li>
      ))}
    </ul>
  );
}
