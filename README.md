# SIGLStudio

SIGLStudio is the local-first workstation and product layer for SIGL.

It provides practical tooling for compose/inspect/validate, comparison, review, analytics, publishing bundles, and deterministic handoff exports.

## Relationship to Vibe (important)

- **Vibe** is canonical for parsing, lowering, verification, proof truth, and engine-side provenance.
- **SIGLStudio** focuses on editing, visualization, workflow orchestration, review/publishing UX, and local deterministic packaging.

SIGLStudio does **not** replace canonical verification logic.

## What SIGLStudio is / is not

### Is
- local-first workstation
- deterministic manifest-oriented tooling
- browser-first with optional desktop runtime
- mock-mode friendly for offline/local workflows

### Is not
- cloud backend
- auth system
- realtime collaboration platform
- unrestricted plugin runtime

## Local-first guarantee

SIGLStudio prioritizes local files, local storage, explicit exports, and deterministic serialization.

## Major routes

- `/compose` `/validate` `/atlas` `/sequences` `/export`
- `/diff` `/batch` `/projects` `/sessions` `/present`
- `/boards` `/review-packs` `/review-flows` `/artifacts`
- `/analytics` `/recipes` `/publishing`

## Browser vs desktop mode

- Browser mode is default and fully supported.
- Desktop mode is optional (`Electron`) for local file ergonomics.
- See `docs/desktop.md` and `desktop/README.md`.

## Mock mode vs Vibe mode

- Mock mode remains first-class for local/offline usability.
- Vibe integration is optional and used when available.

## Install / run / build

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

Optional desktop run (after installing Electron as dev dependency):

```bash
npm run desktop:dev
```

Production-like desktop launch (after `npm run build` and `npm run start`):

```bash
npm run desktop:start
```

## Limitations (honest)

See `docs/known-limitations.md`.

## Post-1.0 roadmap direction

- stronger import/export compatibility tooling
- desktop packaging/distribution hardening
- richer workflow templates and demo seeds
- deeper optional Vibe bridge diagnostics (without shifting canonical verification ownership)

## Docs index

- `docs/architecture.md`
- `docs/workflows.md`
- `docs/desktop.md`
- `docs/import-export.md`
- `docs/publishing.md`
- `docs/automation.md`
- `docs/known-limitations.md`
- `docs/launch-checklist.md`
