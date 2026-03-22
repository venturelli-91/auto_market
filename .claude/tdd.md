# /tdd — Write failing tests first (TDD)

Generates the test file for a given target BEFORE the implementation exists.
Follow Red → Green → Refactor.

## Usage
```
/tdd <target>
```

Examples:
```
/tdd PricingEngine
/tdd RegionalPercentileStrategy
/tdd PriceBadge component
/tdd usePriceScore hook
/tdd GET /listings/:id/price-score
```

## Rules

1. Create the test file — implementation must NOT exist yet
2. Tests must FAIL on first run (that's the point)
3. Cover: happy path + edge cases + error cases
4. Use factory helpers from `tests/factories/` for mock data
5. Never use `toMatchSnapshot()`
6. See `.claude/skills/testing/SKILL.md` for all patterns
