# Commit History & Rationale

Each commit in this project is atomic and self-contained. This document explains the **why** behind each commit.

---

## Commit: `15a0ee9` — `chore: scaffold monorepo root config`

**Files:**
- `package.json` — Root workspace definition, build/test/lint/typecheck scripts
- `pnpm-workspace.yaml` — Declares workspace locations: `apps/*`, `packages/*`
- `tsconfig.base.json` — Shared TypeScript strict config, path aliases
- `.eslintrc.json` — Root ESLint rules, extends `next/core-web-vitals`
- `.prettierrc` — Code formatting (100 char line length, single quotes, 2-space tabs)
- `.gitignore` — Excludes node_modules, .next, dist, .env files
- `docker-compose.yml` — PostgreSQL (port 5432) + Redis (port 6379) with volumes
- `.env.example` — Template for environment variables (no secrets, only placeholders)

**Why:**
- Establishes the monorepo foundation: all workspaces can reference shared config
- Centralizes TypeScript, ESLint, and Prettier rules to avoid duplication
- Docker Compose is ready for local dev (PostgreSQL + Redis)
- `.env.example` documents required environment variables for new developers

**Decisions:**
- **pnpm workspaces** over npm/yarn: faster hoisting, stricter dependency management
- **PostgreSQL 16 + Redis 7**: latest stable versions
- **Strict TypeScript in tsconfig.base.json**: inherited by all apps

---

## Commit: `82cec87` — `feat(shared-types): add core domain types`

**Files:**
- `packages/shared-types/package.json` — Declares the types package, exports via entry point
- `packages/shared-types/tsconfig.json` — Extends base, builds to `dist/`
- `packages/shared-types/src/vehicle.types.ts` — Vehicle, VehicleImage, FuelType, Transmission, VehicleCondition enums
- `packages/shared-types/src/listing.types.ts` — Listing, ListingStatus, PriceBadge (Great Deal | Fair Price | High Price), PriceScore
- `packages/shared-types/src/dealer.types.ts` — Dealer, DealerUser, DealerRole (owner | admin | agent)
- `packages/shared-types/src/search.types.ts` — SearchFilters, SortOption, CursorPage, SearchResult, facets (makes, models, fuel types, etc.)
- `packages/shared-types/src/pricing.types.ts` — PricingStrategy, MarketStats, PricingInput, PricingOutput, PricingJobPayload
- `packages/shared-types/src/index.ts` — Re-exports all types (single entry point)

**Why:**
- Establishes the **source of truth** for all domain types
- Both `apps/web` and `apps/api` import from `@automarket/shared-types`
- If `Listing` shape changes, TypeScript breaks in both frontend and backend simultaneously
- Types are defined **before** implementation (TDD discipline)

**Decisions:**
- **PriceBadge as union type** (`'great_deal' | 'fair_price' | 'high_price'`): smaller than classes, type-safe
- **Enums for fuel types, transmissions**: business rules codified in types
- **CursorPage** (cursor-based pagination) over offset/limit: more efficient for large datasets
- **PricingJobPayload** for Bull queue: defines the shape of async pricing jobs

---

## Commit: `eb66178` — `chore(web): scaffold Next.js 14 app with Tailwind + TypeScript`

**Files:**
- `apps/web/package.json` — Next.js 14, React 18, TanStack Query v5, Framer Motion, testing libraries
- `apps/web/tsconfig.json` — Extends base, JSX preserve, incremental builds, path aliases
- `apps/web/next.config.ts` — Enables Cloudinary images, strict mode, swc minify
- `apps/web/tailwind.config.ts` — Extends theme (primary/secondary/accent/success/warning/danger colors)
- `apps/web/postcss.config.js` — Tailwind + Autoprefixer
- `apps/web/.eslintrc.json` — Extends `next/core-web-vitals`
- `apps/web/jest.config.ts` — Jest for testing, jsdom environment, setupFiles
- `apps/web/jest.setup.ts` — Imports `@testing-library/jest-dom`
- `apps/web/app/layout.tsx` — Root layout (metadata, global providers)
- `apps/web/app/globals.css` — Tailwind directives, reset styles, reduced-motion accessibility
- `apps/web/app/page.tsx` — Home page (placeholder)
- `apps/web/lib/api-client.ts` — Fetch wrapper with `NEXT_PUBLIC_API_URL` env var
- `apps/web/.env.example` — Template (only `NEXT_PUBLIC_API_URL`, no backend secrets)

**Why:**
- Next.js 14 with App Router is the modern standard (not Pages Router)
- TanStack Query v5 handles server state, caching, and refetching
- Framer Motion for animations with accessibility (prefers-reduced-motion)
- Jest + RTL for component testing
- Tailwind config includes semantic color names (primary/secondary/accent) matching design system

**Decisions:**
- **App Router** over Pages Router: better performance, built-in suspense, server components
- **TanStack Query** over raw fetch: automatic caching, background refetch, error boundaries
- **Tailwind** over styled-components: smaller bundle, easier to maintain, no runtime
- **Jest + RTL** over Vitest: broader ecosystem, more tutorials, RTL teaches accessibility first

---

## Commit: `149661b` — `chore(api): scaffold Express API app with pg, Redis, Bull`

**Files:**
- `apps/api/package.json` — Express, pg, ioredis, bull, cloudinary, zod, cors, helmet
- `apps/api/tsconfig.json` — Extends base, target ES2020, commonjs modules, path aliases
- `apps/api/jest.config.ts` — ts-jest preset, node environment, test patterns
- `apps/api/.eslintrc.json` — Root ESLint rules for backend
- `apps/api/.env.example` — Backend environment vars (DATABASE_URL, REDIS_URL, CLOUDINARY_*, ANTHROPIC_API_KEY)
- `apps/api/src/shared/db.ts` — PostgreSQL Pool, RLS helper function `withRLS()`, connection pooling
- `apps/api/src/shared/redis.ts` — ioredis client with retry strategy and error handling
- `apps/api/src/shared/queue.ts` — Bull queue for pricing jobs, error/completion logging
- `apps/api/src/shared/middleware.ts` — `requireDealerId` middleware (x-dealer-id header), error handler
- `apps/api/src/index.ts` — Express app initialization, health check endpoint, database/Redis/queue initialization, graceful shutdown
- `apps/api/src/features/.gitkeep` — Placeholder for feature modules (to be added per component)

**Why:**
- Express is lightweight and unopinionated (flexibility for FDD structure)
- PostgreSQL with RLS enforces data isolation at the database level (survives application bugs)
- Redis + Bull for async job processing (listing creation never waits for pricing)
- Zod for runtime validation of request bodies
- Helmet for security headers (CORS, CSP, XSS protection)

**Decisions:**
- **pg (node-postgres) over ORM**: direct control over queries, easier to use PostgreSQL features (percentile_cont, RLS)
- **Bull queue** over direct function calls: decouples pricing from listing endpoints, enables retries and monitoring
- **`requireDealerId` middleware**: enforces multi-tenant isolation (every request must specify which dealer)
- **Graceful shutdown**: closes database connections and queue before process exits

---

## Commit: `5e97033` — `chore: fix web package.json (remove invalid radix-ui dep)`

**Files:**
- `apps/web/package.json` — Removed `@radix-ui/react-primitives` (does not exist on npm)

**Why:**
- Initial scaffolding included an invalid package name
- `shadcn-ui` will provide Radix UI components when initialized
- `pnpm install` was failing due to this invalid dependency

**Decisions:**
- Removed the invalid dep rather than keeping a broken package.json
- shadcn-ui will be set up in a future step when UI components are designed

---

## Commit: `12d1b92` — `docs(design): add design references section to CLAUDE.md`

**Files:**
- `claude/CLAUDE.md` — Added "Design References" section before "Design Patterns"
- `apps/web/public/designs/.gitkeep` — Created directory for storing design reference images

**Why:**
- Establishes the process: **no component is coded without analyzing the design reference first**
- Centralizes design rules: colors, spacing, typography, layout must be pixel-perfect
- Prevents ad-hoc styling decisions

**Decisions:**
- Design images go in `public/designs/` (accessible at build time, version-controlled)
- Claude must describe the design before writing code (prevents assumptions)
- Designs are the source of truth (no invented components)

---

## Future Commits (Template)

When building new features, commits should follow this pattern:

```
feat(web): create VehicleCard component with price badge

- Display vehicle make, model, year, mileage
- Show PriceScore badge (Great Deal/Fair Price/High Price)
- Responsive grid layout (1-4 columns)
- Image carousel with Framer Motion
- Accessibility: ARIA labels, keyboard navigation

Files:
- apps/web/components/VehicleCard.tsx
- apps/web/components/VehicleCard.test.tsx
- apps/web/public/designs/vehicle-card.png (reference)
```

Each component is one commit. Each API endpoint is one commit. Each database feature is one commit.

---

*Last updated: 2026-03-22*
*Add new entries as commits are made.*
