# /pricing — Price Intelligence feature

Full implementation context for the pricing engine.
See `.claude/skills/pricing/SKILL.md` for domain rules and SQL.

## Usage
```
/pricing <task>
```

Examples:
```
/pricing implement RegionalPercentileStrategy
/pricing create PriceBadge component with Framer Motion
/pricing write cron job for daily recalculation
/pricing add price score endpoint
/pricing set up Bull queue worker
```

## Priority order when building this feature

1. Types (`pricing.types.ts`)
2. Failing tests (`__tests__/pricing-engine.test.ts`)
3. `PricingStrategy` interface
4. `RegionalPercentileStrategy` (make tests pass)
5. `NationalFallbackStrategy`
6. `PricingEngine` (orchestrates strategies)
7. `pricing.repository.ts` (SQL query)
8. `pricing.queue.ts` (Bull job + worker)
9. `pricing.router.ts` (GET endpoint)
10. Redis cache layer
11. `pricing.cron.ts` (daily recalculation)
12. Frontend: `PriceBadge`, `PriceBar`, `PriceBreakdown`
13. Frontend: `usePriceScore` hook
14. Frontend: `PriceScoreContainer`
15. Framer Motion animations

## Key constraint

**Never calculate price score inline during listing creation.**
Always enqueue a Bull job and return immediately.
The score appears on the listing within seconds via polling or websocket.
