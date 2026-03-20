# Board pipeline notes (v0.7)

- Board pipelines export deterministic manifests (`lib/boardPipeline.ts`) for artifact-set/review-pack/presentation/handoff/session outputs.
- Outputs preserve selected block ids, board hash, source context, and theme id.
- Mapping is metadata-driven (no visual scraping).
