export function SigilCanvas({ source }: { source: string }) {
  const tokens = source.split(/\s+/).filter(Boolean);
  return (
    <div className="panel">
      <h3 className="mb-3 text-lg font-semibold">Sigil Canvas</h3>
      <svg viewBox="0 0 720 180" className="h-48 w-full rounded-xl border border-line bg-slate-950/40">
        {tokens.map((token, i) => {
          const x = 40 + i * 80;
          const y = token === "⟡" ? 62 : token === "⟣" ? 110 : 88;
          return (
            <g key={`${token}-${i}`}>
              {i > 0 ? <line x1={x - 45} y1={88} x2={x - 12} y2={y} stroke="#3b465f" strokeWidth="1.5" /> : null}
              <circle cx={x} cy={y} r="17" fill="#111827" stroke="#2a3347" />
              <text x={x} y={y + 5} textAnchor="middle" fill="#dbeafe" fontSize="16">
                {token}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
