import { describe, expect, it } from "vitest";
import { atlasGlyphs, atlasRelations } from "../lib/data/atlas";
import { shapeRelationGraph } from "../lib/relationGraph";
import type { RelationEdge } from "../lib/types";

describe("relation graph shaping", () => {
  it("keeps only valid edges", () => {
    const graph = shapeRelationGraph(atlasGlyphs, [...atlasRelations, { from: "x", to: "y", label: "related" } as RelationEdge]);
    expect(graph.nodes.length).toBeGreaterThan(0);
    expect(graph.edges.every((e) => e.from !== "x")).toBe(true);
  });
});
