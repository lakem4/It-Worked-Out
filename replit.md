# It Worked Out

## Overview

A warm, reflective journaling app that helps users gain perspective on stress. Users log things stressing them out, set a future reflection date, and later mark whether it worked out.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/it-worked-out) — serves at `/`
- **API framework**: Express 5 (artifacts/api-server) — serves at `/api`
- **Database**: PostgreSQL + Drizzle ORM (lib/db)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for API), Vite (for frontend)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Architecture

### Frontend (artifacts/it-worked-out)
- Landing page at `/` — marketing/intro page with CTA
- App page at `/app` — main journaling experience
- React Query for data fetching (generated hooks from `@workspace/api-client-react`)
- Warm earthy design (terracotta, sage green, cream, warm beige)
- Google Fonts: Fraunces (serif) + Outfit (sans)

### API (artifacts/api-server)
- Routes defined in `artifacts/api-server/src/routes/`
- `entries.ts` — CRUD for stress entries + stats + due-for-reflection endpoints
- Validated with Zod schemas from `@workspace/api-zod`

### Database (lib/db)
- Table: `stress_entries` (id, description, logged_date, reflection_date, status, created_at, updated_at)
- Status enum: "pending" | "worked_out" | "still_stressing"

### API Contract (lib/api-spec/openapi.yaml)
- GET/POST /api/entries
- GET/PATCH/DELETE /api/entries/:id
- GET /api/entries/stats
- GET /api/entries/due-for-reflection

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
