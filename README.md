# SIGLStudio

SIGLStudio is the local-first visual/product layer for SIGL. It focuses on editing, visualization, comparison, review, boards, artifacts, handoff, templates, analytics, automation, publishing bundles, and workstation UX.

Vibe remains canonical for parsing, lowering, verification, proof truth, and engine-side provenance.

## v0.9 highlights

- Publishing Bundles route (`/publishing`) with deterministic bundle manifests/summaries.
- Reusable pipeline blueprints with instantiation/export and local blueprint copies.
- Desktop finalization pass with runtime/about/open-recent surfaces and cleaned docs.
- Automation packs + dry-run guardrail reporting for safer repeatable workflows.
- 1.0 readiness cohesion pass with next-step guidance and tighter workflow surfaces.

## Core routes

- `/compose` / `/validate` / `/atlas` / `/sequences` / `/export`
- `/diff` / `/batch` / `/projects` / `/sessions` / `/present`
- `/artifacts` / `/boards` / `/review-packs` / `/review-flows`
- `/analytics` / `/recipes` / `/publishing`

## Desktop mode (optional)

See `desktop/README.md` for optional Electron setup and polished workflow notes.

## Local run commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Additional docs

- `docs/publishing-bundles.md`
- `docs/pipeline-blueprints.md`
- `docs/automation-packs.md`
- `docs/desktop-workflow.md`
- `docs/readiness-v1.md`
