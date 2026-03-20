# Desktop mode

Desktop mode is optional.

- install Electron locally (`npm install --save-dev electron`)
- run Next dev server (`npm run dev`)
- launch desktop wrapper via `npm run desktop:dev`
- for production-like launch: `npm run build && npm run start` then `npm run desktop:start`

## Capability notes

- Browser mode remains first-class and supports all core v1.0 workflows.
- Desktop mode adds local file open/save ergonomics using the preload bridge.
- Keep icon/packaging metadata placeholders updated before any public binary distribution.

Browser mode remains first-class and fully supported.
