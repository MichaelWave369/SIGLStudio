import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (next: string) => void;
  onValidate: () => void;
  onInspect: () => void;
  onExport: () => void;
}

export function SigilInput({ value, onChange, onValidate, onInspect, onExport }: Props) {
  return (
    <div className="panel space-y-3">
      <h3 className="text-lg font-semibold">Sigil Source</h3>
      <textarea
        className="min-h-40 w-full rounded-xl border border-line bg-slate-950/60 p-3 text-sm outline-none focus:border-accent/40"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={onValidate}>Validate</Button>
        <Button onClick={onInspect}>Inspect</Button>
        <Button onClick={onExport}>Export</Button>
      </div>
    </div>
  );
}
