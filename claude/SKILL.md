---
name: pricing intelligence
description: >
  Auto-invoke when working on price scoring, badge calculation, market
  percentiles, PricingEngine, pricing strategies, price_badge column,
  AccuTrade-like features, or anything in features/pricing/.
allowed tools: Read, Write, Bash, Grep, Glob
---

# Pricing Intelligence — Knowledge Pack

## Domain language

| Term | Definition |
|---|---|
| `listing` | A vehicle posted for sale by a dealer |
| `comparable` | A similar active vehicle used as market reference |
| `price score` | Result of running a listing through PricingEngine |
| `badge` | `great_deal` / `fair_price` / `high_price` / `null` |
| `P25 / median / P75` | Percentiles of comparable prices |
| `sample_size` | Number of comparables — minimum 5 for a valid score |
| `stale score` | Score older than 24h — needs recalculation |

---

## Badge thresholds (business rule — never change without tests)

```
price <= P25             → great_deal
P25 < price <= P75       → fair_price
price > P75              → high_price
sample_size < 5          → null (not enough data)
no comparables found     → null
```

---

## Comparable filters (all must pass)

```
make = exact match
model = exact match
year BETWEEN listing.year - 1 AND listing.year + 1
mileage BETWEEN listing.mileage * 0.8 AND listing.mileage * 1.2
state = exact match (regional first)
status = 'active'
created_at > NOW() - INTERVAL '30 days'
```

---

## Strategy selection order

```
1. RegionalPercentileStrategy  — requires sample_size >= 5 in same state
2. NationalFallbackStrategy    — requires sample_size >= 5 nationally
3. DepreciationCurveStrategy   — for rare/new models, no comparables needed
```

First strategy where `canApply()` returns true wins. Never skip this order.

---

## Core SQL query

```sql
SELECT
  COUNT(*)::int AS sample_size,
  ROUND(percentile_cont(0.25) WITHIN GROUP (ORDER BY price))::int AS p25,
  ROUND(percentile_cont(0.50) WITHIN GROUP (ORDER BY price))::int AS median,
  ROUND(percentile_cont(0.75) WITHIN GROUP (ORDER BY price))::int AS p75
FROM listings
WHERE
  make        = $1
  AND model       = $2
  AND year        BETWEEN $3 - 1 AND $3 + 1
  AND mileage     BETWEEN $4 * 0.8 AND $4 * 1.2
  AND state       = $5
  AND status      = 'active'
  AND created_at  > NOW() - INTERVAL '30 days';
```

## Required index

```sql
CREATE INDEX idx_listings_pricing
  ON listings (make, model, year, state, status)
  INCLUDE (price, mileage)
  WHERE status = 'active';
```

---

## File locations

```
apps/api/src/features/pricing/
├── pricing-engine.ts           ← orchestrates strategies
├── pricing.queue.ts            ← Bull job definition + worker
├── pricing.cron.ts             ← daily recalculation (3 AM UTC)
├── pricing.repository.ts       ← all SQL queries
├── pricing.router.ts           ← GET /listings/:id/price-score
├── strategies/
│   ├── pricing-strategy.interface.ts
│   ├── regional-percentile.strategy.ts
│   ├── national-fallback.strategy.ts
│   └── depreciation-curve.strategy.ts
└── __tests__/
    ├── pricing-engine.test.ts
    └── regional-percentile.strategy.test.ts

apps/web/
├── components/price-score/
│   ├── PriceBadge.tsx
│   ├── PriceBar.tsx
│   ├── PriceBreakdown.tsx
│   └── PriceScore.tsx          ← compound component
├── hooks/
│   └── usePriceScore.ts
└── containers/
    └── PriceScoreContainer.tsx
```

---

## Redis cache

```typescript
const KEY = (id: string) => `price_score:${id}`
const TTL = 86400 // 24 hours

// Always check cache before calculating
const cached = await redis.get(KEY(listingId))
if (cached) return JSON.parse(cached)

// After calculation, always cache result
await redis.setex(KEY(listingId), TTL, JSON.stringify(score))
```

---

## Bull queue — always async, never block HTTP response

```typescript
// Enqueue on listing save — never calculate inline
await pricingQueue.add({ listingId }, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: true,
})
```

---

## Framer Motion for badge reveal

```typescript
<motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  <PriceBadge badge={score.badge} />
</motion.div>
```

---

## TanStack Query

```typescript
// hooks/usePriceScore.ts
export function usePriceScore(listingId: string) {
  return useQuery({
    queryKey: ['price-score', listingId],
    queryFn: () => api.get<PriceScore>(`/listings/${listingId}/price-score`),
    staleTime: 1000 * 60 * 30, // 30 min — scores don't change often
    retry: 1,
  })
}
```
