# Desktop packaging (v0.9)

SIGLStudio keeps web mode as default. Desktop mode is optional and intended for local-first review workflows.

## Minimal Electron target

1. Install Electron locally:
   - `npm install --save-dev electron`
2. Run Next dev server:
   - `npm run dev`
3. In another terminal run:
   - `npx electron desktop/main.cjs`

## Finalization notes

- Runtime Badge + Desktop About panel clarify mode and metadata.
- Open Recent panel surfaces local file continuity.
- Desktop actions panel documents top-level runtime-specific affordances.
- Icon placeholder path: `desktop/icon-placeholder.txt`.

## Build/run notes

- Build web assets first: `npm run build`
- Start Next production server: `npm run start`
- Launch Electron with `SIGL_DESKTOP_DEV_URL=http://localhost:3000 npx electron desktop/main.cjs`
