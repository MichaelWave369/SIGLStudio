export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="panel">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </div>
  );
}
