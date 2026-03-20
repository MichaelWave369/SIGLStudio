export function PublishingBundleSectionList({ items }: { items: string[] }) {
  return (
    <div className="rounded border border-line p-2 text-xs">
      <p className="font-semibold">Included Items</p>
      {items.map((item) => <p key={item} className="text-muted">• {item}</p>)}
    </div>
  );
}
