# SIGLStudio

SIGLStudio is the local-first visual/product layer for SIGL. It focuses on editing, visualization, comparison, review, boards, artifacts, handoff, and workstation UX.

Vibe remains canonical for parsing, lowering, verification, proof truth, and engine-side provenance.

## v0.7 highlights

- Curated review templates (with local custom template save).
- Board pipeline exports to artifact/review/presentation/handoff/session manifests.
- Advanced proof/report analytics overlays with deterministic metric summaries.
- Optional bounded local extension registry hooks (config-only, schema-validated).
- Desktop ergonomics polish with runtime badge + recent files/items cohesion.

## Core routes

- `/compose` / `/validate` / `/atlas` / `/sequences` / `/export`
- `/diff` / `/batch` / `/projects` / `/sessions` / `/present`
- `/artifacts` / `/boards` / `/review-packs` / `/review-flows`

## Desktop mode (optional)

See `desktop/README.md` for optional Electron setup. Browser workflows remain first-class.

## Local run commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Additional docs

- `docs/review-templates.md`
- `docs/board-pipelines.md`
- `docs/extensions.md`
- `docs/engine-ingestion.md`
- `docs/import-export-compat.md`
