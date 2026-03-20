export function PageIntro({
  title,
  description,
  cta
}: {
  title: string;
  description: string;
  cta?: string;
}) {
  return (
    <div className="panel">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {cta ? <p className="mt-3 text-xs text-muted">{cta}</p> : null}
    </div>
  );
}
