# SIGLStudio

SIGLStudio is the local-first visual/product layer for SIGL. It focuses on editing, visualization, comparison, review, boards, artifacts, handoff, templates, analytics, and workstation UX.

Vibe remains canonical for parsing, lowering, verification, proof truth, and engine-side provenance.

## v0.8 highlights

- Deeper composition pipelines with previewable deterministic manifests and send-to actions.
- Desktop polish: runtime-aware actions/help surfaces and clearer packaging notes.
- Extension pack schema versioning + migration-aware import validation.
- Dashboard-style analytics route (`/analytics`) with local deterministic filtering/metrics.
- Optional local automation recipes route (`/recipes`) with explicit user-triggered runs.
- Workflow snapshots and stronger route-aware workstation cohesion.

## Core routes

- `/compose` / `/validate` / `/atlas` / `/sequences` / `/export`
- `/diff` / `/batch` / `/projects` / `/sessions` / `/present`
- `/artifacts` / `/boards` / `/review-packs` / `/review-flows`
- `/analytics` / `/recipes`

## Desktop mode (optional)

See `desktop/README.md` for optional Electron setup and polished workflow notes. Browser workflows remain first-class.

## Local run commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Additional docs

- `docs/board-pipelines.md`
- `docs/analytics-dashboard.md`
- `docs/recipes.md`
- `docs/extension-packs.md`
- `docs/extensions.md`
- `docs/review-templates.md`
