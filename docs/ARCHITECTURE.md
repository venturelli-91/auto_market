# AutoMarket — Architecture & Design Decisions

## Table of Contents

1. [Monorepo vs Microservices](#monorepo-vs-microservices)
2. [Design Patterns](#design-patterns)
3. [Directory Structure](#directory-structure)
4. [Branching Strategy](#branching-strategy)

---

## Monorepo vs Microservices

### Decision: **Monorepo** (pnpm workspaces)

### Why Monorepo?

#### 1. **Type Safety Across Boundaries** (Strongest Argument)

With a monorepo + `packages/shared-types/`, we import the same types in both frontend and backend:

```typescript
// apps/web and apps/api both use the same type
import { Listing, PriceBadge } from "@automarket/shared-types";
```

If the shape of `Listing` changes, `tsc --noEmit` breaks in **both places simultaneously** during a single typecheck run. This is a first-class guarantee.

**Microservices alternative:** Version the shared types package, publish to npm, then update both services. This creates a silent divergence window where frontend and backend can be out of sync.

#### 2. **Feature-Driven Development (FDD) is Structurally Incompatible with Microservices**

The CLAUDE.md defines our process: *"ship one complete vertical slice at a time (db → api → ui → tests)"*

In a monorepo:
- Feature branch modifies `apps/api/src/features/listings/` and `apps/web/components/ListingCard.tsx` in the same commit
- Single `pnpm dev` starts both servers
- Single `pnpm test` runs all tests across workspaces

In microservices:
- Each service has its own repo, its own branch, its own CI/CD pipeline
- A vertical slice requires coordinating 2+ PRs, 2+ deployments, 2+ service discovery updates
- Testing the integration requires spinning up multiple containers locally

For a **solo developer on a portfolio project**, microservices creates process overhead that doesn't exist in a monorepo.

#### 3. **Operational Simplicity**

**Monorepo setup:**
```bash
docker-compose up -d       # PostgreSQL + Redis
pnpm install               # All workspaces
pnpm dev                   # Next.js :5000 + Express :3001
```

**Microservices setup (correct implementation):**
```bash
docker-compose up -d       # PostgreSQL + Redis + 4 service containers + API gateway
docker-compose logs -f     # Debug 5 services at once
# Per-service env files, service health checks, startup ordering rules
```

For interviews and demos, the monorepo `docker-compose up && pnpm dev` is a massive UX advantage.

#### 4. **Domain Isolation Without Network Overhead**

The concern "microservices give us domain isolation" is addressed differently in the monorepo:

**Microservices isolation:**
- `listings-service` talks to `pricing-service` via HTTP
- Risk: network latency, partial failures, circuit breakers needed
- Benefit: independent scaling, independent deployment

**Monorepo isolation:**
```
apps/api/src/features/
├── listings/
│   ├── listings.controller.ts
│   ├── listings.service.ts
│   └── listings.repository.ts
├── pricing/
│   ├── pricing.controller.ts
│   ├── pricing.service.ts
│   └── pricing.strategy.ts
├── search/
└── dealers/
```

Features are isolated by folder, not by network boundary. `pricing.service.ts` calls `listings.repository.ts` as a function import, not an HTTP call. This is faster and deterministic.

**When would microservices be correct?**
- The pricing engine needs to scale 10x independently (would need real traffic data)
- Team has 4+ developers who need to deploy independently
- Services need to be written in different languages

None of these conditions apply to AutoMarket right now.

### The Bull Queue Proves Async Decoupling is Already Present

One legitimate reason to consider microservices is "we need async, decoupled processing." The monorepo already has this:

```
Listing saved → enqueue pricing job in Bull → worker consumes asynchronously
```

The pricing engine never blocks the listing creation endpoint. This is the decoupling we need, without the complexity of distributed systems.

---

## Design Patterns

### Frontend

#### Container/Presentational Pattern

**Location:** `apps/web/containers/` and `apps/web/components/`

**Containers** (`apps/web/containers/ListingsContainer.tsx`):
- Fetch data via TanStack Query
- Manage application state
- Pass data down to presentational components as props
- Never render DOM directly (except for `<Suspense>` boundaries)

**Presentational Components** (`apps/web/components/ListingCard.tsx`):
- Receive all data as props
- No `useState`, no `useEffect`, no TanStack Query
- Pure functions: same props → same output
- Easier to test, compose, and reuse

**Why?**
- Separates data fetching logic from rendering logic
- Makes components testable without mocking API calls
- Clearly shows data flow: container → presentational

#### Custom Hooks Pattern

**Location:** `apps/web/hooks/`

All TanStack Query calls are wrapped in named custom hooks:

```typescript
// apps/web/hooks/useListings.ts
export function useListings(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => apiClient<PaginatedResult<Listing>>('/api/listings', { filters }),
  });
}
```

Never a raw `useQuery` in a component:

```typescript
// ❌ DON'T DO THIS
function ListingsPage() {
  const { data } = useQuery({ queryKey: ['listings'], queryFn: ... });
}

// ✅ DO THIS
function ListingsPage() {
  const { data } = useListings();
}
```

**Why?**
- Centralizes API contract in one place
- Easier to refactor data fetching logic
- Custom hooks can add caching, retry logic, error handling

#### Compound Components Pattern

Used for complex, tightly-coupled UI groups like `<SearchFilters>`:

```typescript
export function SearchFilters() {
  return (
    <SearchFilters.Root>
      <SearchFilters.PriceRange />
      <SearchFilters.FuelType />
      <SearchFilters.Submit />
    </SearchFilters.Root>
  );
}
```

**Why?**
- Encapsulates internal state in a single context
- Allows flexible composition without prop drilling
- Clear API: consumers know what sub-components exist

### Backend

#### Repository Pattern

**Location:** `apps/api/src/features/listings/listings.repository.ts`

All database queries are isolated in repository classes:

```typescript
export class ListingsRepository {
  async findById(id: string): Promise<Listing | null> {
    return pool.query('SELECT * FROM listings WHERE id = $1', [id]);
  }

  async findByDealerId(dealerId: string): Promise<Listing[]> {
    // RLS is enforced at the DB level via SET app.current_dealer_id
    return pool.query('SELECT * FROM listings WHERE dealer_id = $1', [dealerId]);
  }
}
```

**Why?**
- Business logic (`listings.service.ts`) never touches SQL directly
- Database queries are testable in isolation (mock the repository)
- Easy to switch databases without changing business logic
- RLS can be enforced at this boundary

#### Strategy Pattern (for Pricing)

**Location:** `apps/api/src/features/pricing/strategies/`

Different pricing algorithms are separate classes implementing a common interface:

```typescript
interface IPricingStrategy {
  readonly name: string;
  canApply(input: PricingInput, pool: Pool): Promise<boolean>;
  compute(input: PricingInput, pool: Pool): Promise<MarketStats>;
}

export class ExactMatchStrategy implements IPricingStrategy { }  // make+model, year ±2, mileage ±30k
export class MakeModelStrategy  implements IPricingStrategy { }  // make+model, year ±3
export class NationalStrategy   implements IPricingStrategy { }  // make+model, any year
```

The `PricingEngine` tries strategies in order (most specific → broadest), using the first that qualifies (≥ 5 samples):

```typescript
export class PricingEngine {
  private readonly strategies = [
    new ExactMatchStrategy(),
    new MakeModelStrategy(),
    new NationalStrategy(),
  ];

  async calculate(input: PricingInput): Promise<PricingOutput | null> {
    for (const strategy of this.strategies) {
      if (await strategy.canApply(input, this.pool)) {
        const stats = await strategy.compute(input, this.pool);
        return { badge: assignBadge(price, stats.p25, stats.p75), ...stats };
      }
    }
    return null; // not enough market data
  }
}
```

Badge assignment:
- `price < p25` → **GREAT_DEAL**
- `p25 ≤ price ≤ p75` → **FAIR_PRICE**
- `price > p75` → **HIGH_PRICE**

**Why?**
- Adding a new pricing rule = new class, not a new `if/else`
- Each strategy is independently testable
- Aligns with open/closed principle: open for extension, closed for modification

#### Observer Pattern (via Bull Queue)

**Location:** `apps/api/src/features/listings/listings.controller.ts` → `src/shared/queue.ts`

When a listing is saved, it enqueues a job instead of calling the pricing engine directly:

```typescript
export class ListingsController {
  async create(req: Request, res: Response) {
    const listing = await listingsService.create(req.body);
    await pricingQueue.add({ listingId: listing.id, vehicleId: listing.vehicleId });
    res.json(listing);
  }
}
```

The pricing job is consumed asynchronously by `pricing.worker.ts`:

```typescript
// apps/api/src/features/pricing/pricing.worker.ts
pricingQueue.process(async (job) => {
  const { listingId } = job.data;
  const listing = await service.findById(listingId);
  const result  = await engine.calculate({ vehicle: listing.vehicle });
  if (result) await repository.updatePriceScore(listingId, result);
});
```

**Why?**
- Listing creation endpoint returns immediately (better UX)
- Pricing calculation never blocks the request
- If pricing fails, the job is retried automatically
- Decouples listing service from pricing service conceptually (even though they're in the same repo)

---

## Directory Structure

```
automarket/
├── docs/                               ← You are here
│   ├── ARCHITECTURE.md                 ← Design decisions
│   ├── COMMITS.md                      ← Commit descriptions & rationale
│   └── BRANCHING.md                    ← Git workflow
│
├── apps/
│   ├── web/                            ← Next.js frontend
│   │   ├── app/                        ← App Router pages
│   │   ├── components/                 ← Presentational (no data fetching)
│   │   ├── containers/                 ← Data fetching via TanStack Query
│   │   ├── hooks/                      ← Custom hooks (useListings, usePriceScore, etc.)
│   │   ├── lib/                        ← api-client, utilities
│   │   └── public/designs/             ← UI design references (images)
│   │
│   └── api/                            ← Express backend
│       └── src/
│           ├── features/               ← FDD: one folder per feature
│           │   ├── listings/
│           │   │   ├── listings.types.ts
│           │   │   ├── listings.controller.ts
│           │   │   ├── listings.service.ts
│           │   │   ├── listings.repository.ts
│           │   │   └── listings.routes.ts
│           │   ├── pricing/
│           │   │   ├── pricing.strategy.ts     ← IPricingStrategy interface
│           │   │   ├── pricing.engine.ts       ← selects strategy, assigns badge
│           │   │   ├── pricing.worker.ts       ← Bull queue processor
│           │   │   └── strategies/
│           │   │       ├── exact-match.strategy.ts
│           │   │       ├── make-model.strategy.ts
│           │   │       └── national.strategy.ts
│           │   └── auth/
│           │       ├── auth.types.ts
│           │       ├── auth.repository.ts
│           │       ├── auth.service.ts
│           │       ├── auth.controller.ts
│           │       └── auth.routes.ts
│           └── shared/
│               ├── db.ts               ← PostgreSQL connection + RLS helper
│               ├── redis.ts            ← Redis client
│               ├── queue.ts            ← Bull queue setup
│               └── middleware.ts       ← Express middleware
│
└── packages/
    └── shared-types/                   ← TypeScript types (vehicle, listing, dealer, etc.)
```

---

## Branching Strategy

### Branches

- **`main`** — production-ready code, fully tested
- **`feature/<feature-name>`** — new features (branched from `main`)
- **`fix/<issue>`** — bug fixes (branched from `main`)
- **`refactor/<area>`** — code cleanup (branched from `main`)

### Commit Discipline

Each commit should be **atomic and self-contained**:

```
feat(web): create VehicleCard component with price badge
- Display vehicle make, model, year, mileage
- Show PriceScore badge (Great Deal/Fair Price/High Price)
- Responsive grid layout (1-4 columns)
- Image carousel with Framer Motion
```

**Not:**
```
wip: update stuff
fixed more bugs
final version
```

### Code Review Checklist

Before merging to `main`:
- [ ] All tests pass (`pnpm test`)
- [ ] TypeScript strict mode passes (`pnpm typecheck`)
- [ ] No ESLint violations (`pnpm lint`)
- [ ] Each commit message is descriptive
- [ ] Design fidelity reviewed against `public/designs/`
- [ ] No secrets in code (check `.env.example` for required vars)

---

## Summary

| Aspect | Choice | Why |
|--------|--------|-----|
| Repo Structure | Monorepo (pnpm workspaces) | Type safety, FDD workflow, operational simplicity |
| Frontend State | TanStack Query v5 | SSR-compatible, automatic caching, server state |
| Frontend Architecture | Container/Presentational | Separation of concerns, testability |
| Backend Patterns | Repository, Strategy, Observer | Maintainability, testability, decoupling |
| Database | PostgreSQL with RLS | Percentile queries, row-level security, powerful queries |
| Queue | Bull (Redis-backed) | Async jobs, retries, no external service |
| Image Hosting | Cloudinary | Auto-resize, CDN, doesn't block server |

---

*Last updated: 2026-03-22*
