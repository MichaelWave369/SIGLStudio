import type { ReviewPack } from "@/lib/reviewPack";

export function ReviewPackSummary({ pack }: { pack: ReviewPack }) {
  return (
    <div className="panel text-sm">
      <h3 className="font-semibold">Review Pack Summary</h3>
      <p>Included items: {pack.included_items.length}</p>
      <p>Sections: {pack.sections.length}</p>
      <p>Theme: {pack.theme_id}</p>
      <p>Hash: {pack.pack_hash}</p>
    </div>
  );
}
