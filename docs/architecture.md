# Architecture

SIGLStudio is the local-first product/workstation layer for SIGL.

## Boundary with Vibe

- Vibe is canonical for parsing, lowering, verification, proof truth, and engine provenance.
- SIGLStudio handles editing, visualization, comparison, review, publishing bundles, and local workflow orchestration.

## Runtime modes

- Browser mode (default): full local-first experience.
- Optional desktop mode (Electron wrapper): better local file open/save ergonomics.
