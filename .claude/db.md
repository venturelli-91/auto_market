# /db — Database patterns and schema

PostgreSQL schema, indexes, RLS, and query patterns for AutoMarket.

## Usage
```
/db <task>
```

Examples:
```
/db create migration for listings table
/db add RLS policy for dealer isolation
/db write cursor pagination query
/db show full schema
/db explain index for pricing query
```

## Core tables

```
dealers           — dealer workspaces
dealer_members    — RBAC (owner | admin | agent)
users             — authenticated users
listings          — vehicle listings (core table)
listing_photos    — Cloudinary URLs per listing
listing_events    — analytics (append-only, partitioned by month)
```

## Key listing columns for pricing

```sql
price_badge     TEXT    -- great_deal | fair_price | high_price | null
market_p25      INTEGER
market_median   INTEGER
market_p75      INTEGER
market_sample   INTEGER -- number of comparables used
price_score_at  TIMESTAMPTZ -- when score was last calculated
```

## Non-negotiable query rules

1. Always cursor-based pagination — never OFFSET
2. Always parameterized queries — never string interpolation
3. Always list columns explicitly — never SELECT *
4. New table with dealer_id → must have RLS policy
5. New query → run EXPLAIN ANALYZE and add index if seq scan on large table

## RLS setup pattern

```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;

CREATE POLICY <table>_dealer_isolation ON <table>
  USING (dealer_id = current_setting('app.current_dealer_id', true)::uuid);
```

```typescript
// Middleware — inject before every query on dealer-scoped tables
await db.raw('SET LOCAL app.current_dealer_id = ?', [req.dealer.id])
```

## Cursor pagination pattern

```sql
SELECT * FROM listings
WHERE status = 'active'
  AND (created_at, id) < ($1, $2)  -- cursor from previous page
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Migrations location

```
apps/api/src/shared/db/migrations/
  001_create_dealers.ts
  002_create_users.ts
  003_create_listings.ts
  004_create_listing_photos.ts
  005_create_listing_events.ts
  006_add_price_intelligence_columns.ts
  007_add_rls_policies.ts
  008_add_indexes.ts
```
