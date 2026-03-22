# /feature — Scaffold a complete feature (FDD)

Creates a full vertical slice following Feature-Driven Development.
One feature = database + API + frontend + tests, all at once.

## Usage
```
/feature <name> [description]
```

## What gets created

### Backend — `apps/api/src/features/<name>/`
```
<name>.router.ts        Express routes
<name>.controller.ts    Request/response only, no business logic
<name>.service.ts       Business logic, calls repository
<name>.repository.ts    All SQL queries, nothing else
<name>.schema.ts        Zod validation schemas
<name>.types.ts         TypeScript interfaces for this feature
__tests__/
  <name>.service.test.ts      Unit tests (mock repository)
  <name>.repository.test.ts   Integration tests (test DB)
  <name>.router.test.ts       API tests (Supertest)
```

### Frontend — `apps/web/`
```
components/<name>/
  <Name>Card.tsx           Presentational — renders one item
  <Name>List.tsx           Presentational — renders collection
  <Name>Card.test.tsx      RTL tests
  index.ts                 Barrel export

containers/
  <Name>Container.tsx      Fetches via TanStack Query, no rendering logic

hooks/
  use<Name>.ts             Custom hook wrapping TanStack Query
  use<Name>.test.ts        Hook tests with renderHook + MSW

app/(dashboard)/<name>/
  page.tsx                 Next.js page (Server Component where possible)
```

## Rules Claude must follow

1. Define TypeScript types in `<name>.types.ts` FIRST
2. Write failing tests BEFORE writing implementation (TDD)
3. Controller → Service → Repository (never skip layers)
4. Presentational components are props-only (no fetching, no hooks)
5. Register new router in `apps/api/src/index.ts`
6. Add new hook to `apps/web/hooks/index.ts` barrel export
7. Add RLS policy if table contains dealer-scoped data
