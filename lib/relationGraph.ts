import type { GlyphDefinition, RelationEdge } from "@/lib/types";

export function shapeRelationGraph(glyphs: GlyphDefinition[], edges: RelationEdge[]) {
  const nodes = glyphs.map((glyph, i) => ({ id: glyph.symbol, group: glyph.semanticGroup, index: i }));
  const validEdges = edges.filter((edge) => nodes.some((n) => n.id === edge.from) && nodes.some((n) => n.id === edge.to));
  return { nodes, edges: validEdges };
}
