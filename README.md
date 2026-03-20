# SIGLStudio

SIGLStudio is the local-first visual/product layer for SIGL. It focuses on editing, comparison, organization, review, boards, presentation, artifacts, and handoff UX.

Vibe remains canonical for parsing, lowering, verification, proof truth, and engine-side provenance.

## v0.6 highlights

- Desktop-ready path (optional Electron wrapper) with runtime-mode detection and desktop file bridge.
- Advanced Boards with layers, block locking, grouping, connection overlay, mini-map, and alignment/distribution transforms.
- Review Flows 2.0 with ordered sections, status/decision panel, and deterministic storage.
- Deeper Vibe ingestion normalization for proof/report payloads with ingestion health feedback.
- Artifact Set builder with deterministic manifest + preset workflows.
- Import/export hardening with file-kind detection, version mismatch warnings, and migration hooks.

## Core routes

- `/compose` / `/validate` / `/atlas` / `/sequences` / `/export`
- `/diff` / `/batch` / `/projects` / `/sessions` / `/present`
- `/artifacts` / `/boards` / `/review-packs` / `/review-flows`

## Desktop mode (optional)

See `desktop/README.md` for the minimal Electron target.

Desktop mode is optional and does not replace browser workflows.

## Local run commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

Optional desktop launcher (after installing Electron as a dev dependency):

```bash
npm run desktop:dev
```

## Local-first positioning

- No cloud backend required.
- No auth/multiplayer/database requirements.
- Deterministic local serialization is preferred across boards/review/artifact/handoff payloads.
