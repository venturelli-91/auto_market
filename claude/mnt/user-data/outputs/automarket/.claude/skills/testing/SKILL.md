---
name: testing patterns
description: >
  Auto-invoke when writing tests, creating .test.ts or .test.tsx files,
  using Jest, RTL, Supertest, MSW, renderHook, or any testing-related work.
allowed tools: Read, Write, Bash, Grep, Glob
---

# Testing Patterns — Knowledge Pack

## Philosophy

- Write tests BEFORE implementation (TDD — Red → Green → Refactor)
- Test behavior, not implementation details
- Never use `toMatchSnapshot()` — always test explicit values
- Mock at the boundary (mock repository in service tests, mock API in hook tests)
- One assertion concept per test — keep tests focused

---

## Test file naming

```
apps/api/src/features/pricing/__tests__/pricing-engine.test.ts
apps/web/components/price-score/PriceBadge.test.tsx
apps/web/hooks/usePriceScore.test.ts
apps/web/containers/PriceScoreContainer.test.tsx
```

---

## Backend unit test (Jest — mock repository)

```typescript
import { PricingEngine } from '../pricing-engine'
import { mockPricingRepository } from './__mocks__/pricing.repository'

describe('PricingEngine', () => {
  let engine: PricingEngine

  beforeEach(() => {
    engine = new PricingEngine([
      new RegionalPercentileStrategy(mockPricingRepository),
      new NationalFallbackStrategy(mockPricingRepository),
    ])
  })

  afterEach(() => jest.clearAllMocks())

  describe('badge calculation', () => {
    it('returns great_deal when price is at or below P25', async () => {
      mockPricingRepository.getPercentiles.mockResolvedValue({
        sampleSize: 10, p25: 25000, median: 28000, p75: 32000
      })
      const result = await engine.score(mockListing({ price: 24000 }))
      expect(result?.badge).toBe('great_deal')
    })

    it('returns null when sample size is below 5', async () => {
      mockPricingRepository.getPercentiles.mockResolvedValue({
        sampleSize: 3, p25: 25000, median: 28000, p75: 32000
      })
      const result = await engine.score(mockListing({ price: 20000 }))
      expect(result?.badge).toBeNull()
    })
  })
})
```

---

## Backend integration test (Supertest + test DB)

```typescript
import request from 'supertest'
import { app } from '../../index'
import { db } from '../../shared/db'

describe('GET /api/listings/:id/price-score', () => {
  beforeAll(async () => {
    await db.migrate.latest()
    await db.seed.run()
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('returns 200 with price score for active listing', async () => {
    const res = await request(app)
      .get('/api/listings/test-listing-id/price-score')
      .set('Authorization', `Bearer ${testDealerToken}`)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      badge: expect.stringMatching(/great_deal|fair_price|high_price/),
      p25: expect.any(Number),
      median: expect.any(Number),
      p75: expect.any(Number),
    })
  })

  it('returns 404 for non-existent listing', async () => {
    const res = await request(app)
      .get('/api/listings/does-not-exist/price-score')
      .set('Authorization', `Bearer ${testDealerToken}`)
    expect(res.status).toBe(404)
  })
})
```

---

## Frontend component test (RTL)

```typescript
import { render, screen } from '@testing-library/react'
import { PriceBadge } from './PriceBadge'

// AAA pattern — Arrange, Act, Assert
describe('PriceBadge', () => {
  it('renders great deal badge', () => {
    // Arrange
    render(<PriceBadge badge="great_deal" />)
    // Assert (no Act needed for static render)
    expect(screen.getByText(/great deal/i)).toBeInTheDocument()
  })

  it('renders nothing when badge is null', () => {
    const { container } = render(<PriceBadge badge={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('applies correct color class for high_price', () => {
    render(<PriceBadge badge="high_price" />)
    const badge = screen.getByTestId('price-badge')
    expect(badge).toHaveClass('bg-red-100')
  })
})
```

---

## Hook test (renderHook + MSW)

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { server } from '@/tests/msw-server'
import { usePriceScore } from './usePriceScore'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })}>
    {children}
  </QueryClientProvider>
)

describe('usePriceScore', () => {
  it('returns price score on success', async () => {
    server.use(
      http.get('/api/listings/:id/price-score', () =>
        HttpResponse.json({ badge: 'great_deal', p25: 20000, median: 25000, p75: 30000 })
      )
    )
    const { result } = renderHook(() => usePriceScore('listing-123'), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.badge).toBe('great_deal')
  })

  it('returns error state when API fails', async () => {
    server.use(
      http.get('/api/listings/:id/price-score', () =>
        HttpResponse.json({ error: 'Not found' }, { status: 404 })
      )
    )
    const { result } = renderHook(() => usePriceScore('bad-id'), { wrapper })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
```

---

## Factory helpers (use these for mock data)

```typescript
// tests/factories/listing.factory.ts
export function mockListing(overrides?: Partial<Listing>): Listing {
  return {
    id: 'listing-test-id',
    dealerId: 'dealer-test-id',
    make: 'Toyota',
    model: 'Camry',
    year: 2021,
    mileage: 55000,
    price: 28000,
    state: 'TX',
    status: 'active',
    ...overrides,
  }
}
```

---

## Coverage targets

```
features/pricing/     → 80% minimum (this is the differentiator)
features/listings/    → 70% minimum
components/           → 60% minimum
hooks/                → 70% minimum
```

Run coverage: `pnpm test --coverage`
