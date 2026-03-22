# AutoMarket — Automotive Marketplace with Price Intelligence

## What this project is

Full-stack automotive marketplace platform built from scratch.
Dealers list vehicles, buyers search with faceted filters, and a pricing intelligence engine
badges each listing as "Great Deal", "Fair Price", or "High Price" based on real market data.

The pricing intelligence engine is the primary differentiator — it uses statistical market
analysis (PostgreSQL percentiles) to score every listing against comparable vehicles.

---

## Stack

### Frontend

- Next.js 14 (App Router + Server Components)
- React 18 + TypeScript (strict, no `any`)
- TailwindCSS + shadcn/ui (Radix UI primitives)
- Framer Motion (animations)
- TanStack Query v5 (server state — never raw fetch/useEffect in components)

### Backend

- Node.js + Express.js (REST API on port 3001)
- PostgreSQL (primary DB — percentile queries, full-text, RLS)
- Redis (Bull queue + cache + sessions)
- Cloudinary (image upload and processing — NOT AWS S3)

### Testing

- Jest + React Testing Library (RTL)
- Supertest (API integration tests)
- MSW (mock service worker for frontend API mocking)

---

## Architecture

```
automarket/
├── CLAUDE.md                        ← you are here
├── .claude/
│   ├── settings.json
│   ├── settings.local.json          ← gitignored, local overrides
│   ├── commands/                    ← /feature /tdd /pricing /db /assistant
│   ├── skills/                      ← auto-invoked knowledge packs
│   │   ├── pricing/SKILL.md
│   │   ├── testing/SKILL.md
│   │   └── code-review/SKILL.md
│   ├── agents/
│   │   └── security-reviewer.md
│   └── hooks/
│       ├── pre-tool-use.js
│       └── post-tool-use.js
├── apps/
│   ├── web/                         ← Next.js frontend (:5000)
│   │   ├── app/                     ← App Router pages
│   │   ├── components/              ← Presentational only (no data fetching)
│   │   ├── containers/              ← Data fetching via TanStack Query
│   │   ├── hooks/                   ← Custom hooks (usePriceScore, useListings…)
│   │   └── lib/                     ← api-client, utils
│   └── api/                         ← Express backend (:3001)
│       └── src/
│           ├── features/            ← FDD — one folder per feature
│           │   ├── listings/
│           │   ├── pricing/         ← PRIMARY FEATURE
│           │   ├── search/
│           │   └── dealers/
│           └── shared/              ← db, redis, queue, middleware
├── packages/
│   └── shared-types/                ← TypeScript types shared between apps
└── docker-compose.yml               ← PostgreSQL + Redis local
```

---

## Design References

**Antes de criar qualquer componente de UI, obrigatoriamente:**

1. **Leia os arquivos de imagem** em `public/designs/`
2. **Analise fidelidade visual**: cores, espaçamentos, tipografia, layout
3. **Descreva o que viu** antes de escrever qualquer código
4. **Use os prints como source of truth** — não invente elementos ou variações

**Implementação:**

- React + TailwindCSS (sem desvios da paleta do design)
- Pixel-perfect fidelidade ao layout dos prints
- Componentes isolados em `apps/web/components/`
- Cada componente visual = 1 commit atômico

---

## Design Patterns

### Backend

- **Strategy Pattern** — PricingEngine selects strategy based on data availability
- **Repository Pattern** — all DB queries isolated from business logic
- **Observer Pattern** — listing save → Bull job → async price calculation

### Frontend

- **Container/Presentational** — containers fetch, presentational components render
- **Custom Hooks** — all TanStack Query calls wrapped in named hooks
- **Compound Components** — `<PriceScore>`, `<VehicleCard>`, `<SearchFilters>`

### Process

- **FDD** — ship one complete vertical slice at a time (db → api → ui → tests)
- **TDD** — write failing tests before implementation for all business logic

---

## Key Features (priority order)

1. **Price Intelligence Engine** — P25/median/P75 percentile via PostgreSQL `percentile_cont`
2. **Faceted Search** — composite index + GIN full-text + cursor pagination + Redis cache
3. **AI Shopping Assistant** — Claude API streaming, RAG over active listings
4. **Multi-tenant Dealer Workspaces** — PostgreSQL RLS, RBAC (owner/admin/agent)
5. **Vehicle Photos** — Cloudinary upload, auto-resize, WebP, CDN delivery

---

## Build / Test Commands

```bash
docker-compose up -d       # Start PostgreSQL + Redis
pnpm install               # Install all dependencies
pnpm db:migrate            # Run migrations
pnpm db:seed               # Seed sample data
pnpm dev                   # Next.js :5000 + Express :3001
pnpm test                  # Jest + RTL (all tests)
pnpm test:watch            # TDD mode — watch for changes
pnpm lint                  # ESLint
pnpm typecheck             # tsc --noEmit
```

---

## Conventions

### Commits

```
feat(pricing): add regional percentile strategy
fix(pricing): handle edge case when sample size < 5
test(pricing): add unit tests for badge thresholds
refactor(listings): extract repository pattern
chore: update dependencies
```

### TypeScript

- Strict mode always. Never use `any` — use `unknown` and narrow.
- Define types in `<feature>.types.ts` before writing implementation.
- Shared types go in `packages/shared-types/`.

### Testing

- Write tests BEFORE implementation (TDD).
- Never use `toMatchSnapshot()` — test explicit values.
- Mock at the boundary: unit tests mock repository, integration tests use test DB.
- Coverage target: 80%+ on `features/pricing/` (the differentiator).

### React

- Never use raw `fetch()` or `useEffect` for server data — always TanStack Query.
- Presentational components receive all data as props — zero data fetching inside.
- Every component and hook must have a `.test.tsx` / `.test.ts` file.

---

## What to highlight in README and interviews

1. PostgreSQL `percentile_cont` + composite index — query runs ~8ms on 500k rows
2. Strategy Pattern — adding a new pricing rule = new class, not a new `if/else`
3. Row Level Security at DB level — data isolation survives application bugs
4. Bull queue — listing creation never waits for price calculation
5. Cloudinary — server never handles binary data
6. Price Intelligence Engine — market-aware badge scoring built entirely from scratch

---

## Gotchas

- Redis must be running before starting the API (Bull queue dependency)
- RLS requires setting `app.current_dealer_id` on every DB connection before queries
- Cloudinary free tier: 25GB storage, 25GB bandwidth/month — enough for development
- TanStack Query v5 syntax changed from v4 — use `{ queryKey, queryFn }` object form
- Next.js Server Components cannot use hooks or TanStack Query — use containers for that
- Framer Motion: always wrap animations with `@media (prefers-reduced-motion)` check
