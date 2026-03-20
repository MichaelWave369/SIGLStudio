export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "good" | "warn" }) {
  const toneClass = tone === "good" ? "border-emerald-400/50 text-emerald-200" : tone === "warn" ? "border-amber-400/50 text-amber-200" : "border-line text-muted";
  return <span className={`rounded border px-2 py-0.5 text-[10px] uppercase ${toneClass}`}>{label}</span>;
}
