import { themes } from "@/lib/themes";

export function ThemePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className="rounded border border-line bg-slate-950/50 p-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
      {themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
    </select>
  );
}
