# It Worked Out

## Overview

A warm, reflective journaling app that helps users gain perspective on stress. Users log things stressing them out, set a future reflection date, and later mark whether it worked out.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/it-worked-out) — serves at `/`
- **API framework**: Express 5 (artifacts/api-server) — serves at `/api` (only `/api/health` is active; entries are read/written directly from the browser to Supabase)
- **Database**: Supabase Postgres, accessed from the browser via `@supabase/supabase-js` with the publishable/anon key
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
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
- Talks directly to Supabase via `@supabase/supabase-js` (client at `src/lib/supabase.ts`)
- TanStack Query hooks at `src/hooks/use-entries.ts` wrap Supabase calls and handle cache invalidation
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Warm earthy design (terracotta, sage green, cream, warm beige)
- Google Fonts: Fraunces (serif) + Outfit (sans)

### API (artifacts/api-server)
- Only `/api/health` is active. The earlier `/api/entries` CRUD routes were removed when the data layer moved to Supabase.

### Supabase database
- Table: `stress_entries` (id, description, logged_date, reflection_date, status, created_at, updated_at)
- Status enum (CHECK constraint): "pending" | "worked_out" | "still_stressing"
- RLS is enabled with a permissive "Allow all" policy — there is no auth model, so the anon/publishable key has full read/write access (same security posture as the previous setup with no login).

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
