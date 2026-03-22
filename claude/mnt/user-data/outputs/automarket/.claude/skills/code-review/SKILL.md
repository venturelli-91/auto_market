---
name: code review
description: >
  Auto-invoke when reviewing code, checking pull requests, auditing
  existing files for quality, or when asked to review, audit, or
  check any implementation in this project.
allowed tools: Read, Grep, Glob
---

# Code Review Checklist — AutoMarket

## TypeScript

- [ ] No `any` — use `unknown` and narrow, or define a proper type
- [ ] Types defined in `<feature>.types.ts` before use
- [ ] No non-null assertions (`!`) without a comment explaining why it's safe
- [ ] Return types explicitly declared on public functions

## React / Next.js

- [ ] No raw `fetch()` or `useEffect` for server data — must use TanStack Query
- [ ] Presentational components have zero data fetching (props only)
- [ ] No business logic inside JSX — extract to hooks or utils
- [ ] Server Components used where there's no interactivity (App Router)
- [ ] Loading and error states handled in every container
- [ ] Framer Motion animations wrapped in `prefers-reduced-motion` check

## Backend

- [ ] Controller never calls Repository directly — always through Service
- [ ] No business logic in Repository — only SQL
- [ ] All request bodies validated with Zod before use
- [ ] Errors thrown as typed errors (NotFoundError, ValidationError, etc.)
- [ ] No raw SQL string interpolation — always use parameterized queries (`$1`, `$2`)
- [ ] Bull jobs used for any operation > 200ms (never block HTTP response)

## Database

- [ ] New queries have a corresponding index (check with EXPLAIN ANALYZE)
- [ ] No `SELECT *` — always list columns explicitly
- [ ] No `OFFSET` pagination — use cursor-based
- [ ] RLS policy exists for any new dealer-scoped table
- [ ] Migrations are reversible (has `down` function)

## Security

- [ ] No secrets or API keys in source code
- [ ] `.env` files are gitignored
- [ ] User input sanitized before DB queries
- [ ] Auth middleware applied to all protected routes
- [ ] dealer_id from JWT, never from request body

## Testing

- [ ] New business logic has unit tests written first (TDD)
- [ ] No `toMatchSnapshot()` usage
- [ ] Mock at the boundary (repository mocked in service tests)
- [ ] Test covers: happy path, edge cases, error cases

## Git

- [ ] Commit message follows convention: `feat(scope): description`
- [ ] One logical change per commit
- [ ] No `console.log` left in committed code

---

## Red flags — always flag these

```typescript
// BAD: any type
const score: any = await calculateScore()

// BAD: raw fetch in component
useEffect(() => { fetch('/api/...').then(...) }, [])

// BAD: controller calling repository
class ListingController {
  async get(req, res) {
    const listing = await this.listingRepository.findById(req.params.id) // ❌
  }
}

// BAD: string interpolation in SQL
const query = `SELECT * FROM listings WHERE id = '${req.params.id}'` // SQL injection

// BAD: offset pagination
const listings = await db('listings').offset(page * 20).limit(20) // ❌ slow at scale

// BAD: secret in code
const apiKey = 'sk-ant-api03-...' // ❌
```
