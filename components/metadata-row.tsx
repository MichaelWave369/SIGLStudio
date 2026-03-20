export function MetadataRow({ label, value }: { label: string; value: string | number }) {
  return <p className="text-xs text-muted"><span className="text-slate-300">{label}:</span> {value}</p>;
}
