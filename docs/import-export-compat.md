# Import/Export compatibility notes (v0.6)

- SIGLStudio validates import kind and schema version before routing payloads.
- Older payloads (< v0.5) trigger migration warnings.
- Newer payloads (> v0.6) trigger compatibility warnings.
- Migrations are best-effort and deterministic (`lib/migrations.ts`).
