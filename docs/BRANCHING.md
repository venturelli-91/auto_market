# Git Workflow & Branching Strategy

This document defines how branches are organized and how commits flow through the project.

---

## Branches

### `main`
- **Purpose:** Production-ready code, fully tested and reviewed
- **Protection:** No direct commits (must come from PRs)
- **Merge into from:** `feature/*`, `fix/*`, `refactor/*` branches via pull request
- **Deployment:** Every merge to `main` is potentially deployable

### Feature Branches

#### `feature/<feature-name>`
- **Purpose:** New functionality (new components, new API endpoints, new features)
- **Branch from:** `main`
- **Merge back to:** `main` via pull request
- **Naming:** `feature/vehicle-card`, `feature/price-intelligence`, `feature/dealer-workspaces`
- **Lifetime:** Short-lived (1-3 days typical)

**Example workflow:**
```bash
git checkout main
git pull origin main
git checkout -b feature/vehicle-card
# Make commits...
git push origin feature/vehicle-card
# Open PR on GitHub
# Code review → merge to main
git checkout main
git pull origin main
git branch -d feature/vehicle-card
```

#### `fix/<issue>`
- **Purpose:** Bug fixes
- **Branch from:** `main`
- **Merge back to:** `main` via pull request
- **Naming:** `fix/price-calculation-edge-case`, `fix/search-filter-crash`
- **Lifetime:** 1-2 days

#### `refactor/<area>`
- **Purpose:** Code cleanup, performance improvements (no new features)
- **Branch from:** `main`
- **Merge back to:** `main` via pull request
- **Naming:** `refactor/api-error-handling`, `refactor/container-component-extraction`
- **Lifetime:** 2-5 days

---

## Commit Discipline

Every commit should be **atomic, self-contained, and ready to ship**.

### Good Commit

```
feat(web): create VehicleCard component with price badge

Display vehicle make, model, year, mileage, images, and price score badge
(Great Deal/Fair Price/High Price). Fully responsive with Framer Motion
animations and accessibility labels (ARIA).

- VehicleCard presentational component in apps/web/components/
- PriceScore badge styling per design reference
- Image carousel with arrow navigation
- Tests: 85%+ coverage for component logic
- Accessibility: WCAG 2.1 AA compliant (keyboard nav, ARIA labels)

Closes #42
```

### Bad Commit

```
wip: stuff
fixed more things
final version i hope
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat` — New feature (new component, new endpoint, new database schema)
- `fix` — Bug fix
- `refactor` — Code reorganization (no behavior change)
- `test` — Adding/updating tests (no production code change)
- `docs` — Documentation (README, CLAUDE.md, etc.)
- `chore` — Tooling, dependencies, CI/CD (no production code change)

**Scope:**
- `web` — Frontend (Next.js app)
- `api` — Backend (Express app)
- `shared-types` — Shared types
- `pricing` — Pricing feature specifically
- `listings` — Listings feature specifically
- Empty if it affects multiple areas

**Subject:**
- Imperative mood: "create VehicleCard" not "created VehicleCard" or "creating VehicleCard"
- No period at the end
- Max 50 characters

**Body:**
- Wraps at 72 characters
- Explains **why** this change, not **what** (the diff shows what)
- Can be multiple paragraphs, separated by blank lines
- Lists changed files and key decisions

**Footer:**
- `Closes #<issue-number>` (links to GitHub issues)
- `Breaking change: ...` (if applicable)

---

## Code Review Checklist

Before merging any branch to `main`, the PR must pass:

### Automated Checks
- [ ] `pnpm typecheck` passes (no TypeScript errors in any workspace)
- [ ] `pnpm lint` passes (no ESLint violations)
- [ ] `pnpm test` passes (all tests pass with 80%+ coverage on changed code)
- [ ] GitHub Actions CI passes (if configured)

### Manual Review
- [ ] Commit messages are descriptive (follow format above)
- [ ] Each commit is atomic (can be reverted independently)
- [ ] No console.log, debugger, or commented code left behind
- [ ] No `any` types in TypeScript (use `unknown` + type narrowing)
- [ ] No secrets in code (API keys, passwords, etc.)
- [ ] Design fidelity: UI matches `apps/web/public/designs/` pixel-perfectly
- [ ] Accessibility: keyboard navigation, ARIA labels, color contrast
- [ ] Performance: no N+1 queries, no unnecessary re-renders

### For Component Commits
- [ ] Component in `apps/web/components/`
- [ ] Test file in `apps/web/components/__tests__/` or `.test.tsx` suffix
- [ ] Storybook story added (if component is complex)
- [ ] Design reference image in `apps/web/public/designs/`

### For API Commits
- [ ] Endpoint in feature folder (`apps/api/src/features/*/`)
- [ ] Repository pattern used (queries isolated)
- [ ] Test file in `apps/api/src/features/*/__tests__/`
- [ ] Error handling for all edge cases
- [ ] RLS enforced (if multi-tenant data)

---

## Release Flow (Future)

When ready for production release:

1. Create `release/v1.0.0` branch from `main`
2. Update version in `package.json`
3. Generate changelog from commit history
4. Merge `release/v1.0.0` back to `main` with tag `v1.0.0`
5. Deploy to production

*(This is a placeholder for future releases. Solo dev currently skips this.)*

---

## Example: Building a Feature from Start to Merge

**Goal:** Add a SearchFilters component

### 1. Analyze Design
- Download design reference: `public/designs/search-filters.png`
- Read and describe the design (colors, layout, inputs)
- Note which fields are required (min/max price, fuel type, etc.)

### 2. Create Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/search-filters
```

### 3. Create Types
```bash
# Create types in packages/shared-types/src/search.types.ts
git add packages/shared-types/src/search.types.ts
git commit -m "feat(shared-types): add SearchFilters type"
```

### 4. Create Component
```bash
# Create component
cat > apps/web/components/SearchFilters.tsx
cat > apps/web/components/SearchFilters.test.tsx

# Commit
git add apps/web/components/SearchFilters*
git commit -m "feat(web): create SearchFilters component with TanStack Query

- Min/max price range slider (Tailwind)
- Checkbox group for fuel types
- Submit button with loading state
- Responsive mobile-first layout
- 85%+ test coverage (RTL)"
```

### 5. Create API Endpoint
```bash
# Create API handler
cat > apps/api/src/features/search/search.controller.ts
cat > apps/api/src/features/search/search.service.ts
cat > apps/api/src/features/search/search.repository.ts

# Commit
git add apps/api/src/features/search/
git commit -m "feat(api): create search endpoint with faceted filters

- GET /api/search with filters (price, fuel type, year, mileage)
- Cursor-based pagination (limit 20, max 100)
- Composite index on (make, model, year, mileage)
- Full-text search on vehicle description
- Cache results in Redis for 5 minutes
- RLS: only return listings from active dealers"
```

### 6. Connect Frontend to API
```bash
# Create custom hook
cat > apps/web/hooks/useSearch.ts

# Create container
cat > apps/web/containers/SearchResultsContainer.tsx

# Commit
git add apps/web/hooks/useSearch.ts apps/web/containers/SearchResultsContainer.tsx
git commit -m "feat(web): connect SearchFilters to API

- useSearch() hook wraps TanStack Query
- Debounce query 300ms while user types
- Display results in grid with VehicleCard
- Show loading skeleton during fetch
- Handle error states gracefully"
```

### 7. Push and Create PR
```bash
git push origin feature/search-filters
# Open PR on GitHub
# Assign reviewer
# Wait for CI to pass + code review
```

### 8. Merge to Main
```bash
# On GitHub: click "Squash and merge" (one commit per feature)
# OR merge with multiple commits if each is atomic

# Locally:
git checkout main
git pull origin main
git branch -d feature/search-filters
```

---

## Common Commands

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat(web): add my component"

# Push branch
git push origin feature/my-feature

# Fetch latest from main (without merging)
git fetch origin main

# Rebase your branch on latest main (if main advanced)
git rebase origin/main

# View commit log
git log --oneline -10

# Squash last 2 commits (before pushing)
git reset --soft HEAD~2
git commit -m "feat(web): combined changes"

# Discard uncommitted changes
git checkout -- .

# View what changed
git diff
git diff --staged
```

---

*Last updated: 2026-03-22*
*Update this document when branching strategy changes.*
