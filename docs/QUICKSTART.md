# QuickStart Guide

Get AutoMarket running locally in 5 minutes.

---

## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **pnpm** 8+ (`npm install -g pnpm`)
- **Docker** & **Docker Compose** ([download](https://www.docker.com/))
- **Git** ([download](https://git-scm.com/))

Verify installation:
```bash
node --version      # v18.0.0+
pnpm --version      # 8.0.0+
docker --version    # 20.0.0+
docker-compose --version  # v2.0.0+
git --version       # 2.40.0+
```

---

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/auto-market.git
cd auto-market
```

---

## 2. Install Dependencies

```bash
pnpm install
```

This installs all packages for:
- `apps/web/` (Next.js frontend)
- `apps/api/` (Express backend)
- `packages/shared-types/` (Shared types)

**Time:** ~2 minutes

---

## 3. Start Infrastructure

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** on `localhost:5432`
- **Redis** on `localhost:6379`

Verify they're running:
```bash
docker ps
# Should show 2 containers: postgres and redis
```

**Time:** ~30 seconds

---

## 4. Create Environment Files

Copy `.env.example` to `.env.local` in each app:

### Frontend (`apps/web/.env.local`)
```bash
cp apps/web/.env.example apps/web/.env.local
```

Contents:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`apps/api/.env`)
```bash
cp apps/api/.env.example apps/api/.env
```

Contents:
```env
NODE_ENV=development
DATABASE_URL=postgresql://automarket:automarket_dev@localhost:5432/automarket
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=change-this-in-production
JWT_EXPIRES_IN=7d

# Cloudinary (optional for dev)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 5. Run Migrations and Seed

```bash
pnpm --filter=api db:migrate   # Create tables + indexes + RLS policies
pnpm --filter=api db:seed      # Insert 3 dealers + 20 published listings
```

You should see:
```
  apply 001_initial.sql
Migrations complete.
Seeded 3 dealers and 20 listings.
```

---

## 6. Start Development Servers

```bash
pnpm dev
```

This runs:
- **Next.js** on `http://localhost:5000`
- **Express** on `http://localhost:3001`

You should see:
```
apps/web:
ready - started server on 0.0.0.0:5000
apps/api:
✓ Database connected
✓ Redis connected
✓ Pricing worker started
✓ API running on http://localhost:3001
```

---

## 7. Open in Browser

Open [http://localhost:5000](http://localhost:5000)

You should see the AutoMarket home page.

---

## Common Commands

### Development
```bash
pnpm dev              # Start frontend + backend
pnpm dev --filter=@automarket/web   # Frontend only
pnpm dev --filter=@automarket/api   # Backend only
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
pnpm test --filter=@automarket/web  # Frontend tests only
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm typecheck        # TypeScript strict mode
pnpm format           # Prettier formatting
```

### Building
```bash
pnpm build            # Build all apps
pnpm build --filter=@automarket/web
pnpm build --filter=@automarket/api
```

### Database
```bash
pnpm --filter=api db:migrate   # Run migrations (idempotent)
pnpm --filter=api db:seed      # Seed 20 vehicle listings
```

---

## Troubleshooting

### "Cannot find module '@automarket/shared-types'"

**Solution:** Ensure you ran `pnpm install` from the root directory.

```bash
cd automarket/  # Root directory
pnpm install
```

---

### "ECONNREFUSED: PostgreSQL not running"

**Solution:** Start Docker containers.

```bash
docker-compose up -d
docker-compose logs postgres  # Check for errors
```

---

### "Port 5000 already in use"

**Solution:** Change port in `apps/web/package.json` script:

```json
"dev": "next dev -p 5001"
```

Or kill the process using port 5000:
```bash
# macOS/Linux
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows (PowerShell admin)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

---

### "pnpm install fails with 'ERR_PNPM_FETCH_404'"

**Solution:** Delete lock file and reinstall.

```bash
rm pnpm-lock.yaml
pnpm install
```

---

### "TypeScript errors after code changes"

**Solution:** Run typecheck to see all errors.

```bash
pnpm typecheck
```

If errors persist, clear Next.js cache:
```bash
rm -rf apps/web/.next
pnpm dev
```

---

## Next Steps

1. **Read Architecture:** [docs/ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Understand Features:** [docs/FEATURES.md](./FEATURES.md)
3. **View Code Examples:** Check `apps/web/components/` and `apps/api/src/features/`
4. **Deploy:** [docs/DEPLOY.md](./DEPLOY.md)

---

## File Structure

```
automarket/
├── apps/
│   ├── web/          ← Next.js frontend (port 5000)
│   └── api/          ← Express backend (port 3001)
├── packages/
│   └── shared-types/ ← Shared TypeScript types
├── docs/             ← Documentation
├── docker-compose.yml
└── pnpm-workspace.yaml
```

---

## IDE Setup

### VSCode
1. Install extensions:
   - ESLint
   - Prettier
   - Thunder Client (for API testing)
   - Tailwind CSS IntelliSense

2. Create `.vscode/settings.json` (optional):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### WebStorm/IntelliJ
1. Open project root folder
2. Mark as workspace root
3. ESLint and Prettier should auto-detect

---

## First Component Development

Ready to build your first component?

1. Get a design reference in `apps/web/public/designs/`
2. Read [docs/ARCHITECTURE.md](./ARCHITECTURE.md#design-patterns) for patterns
3. Follow [docs/BRANCHING.md](./BRANCHING.md) workflow
4. Create:
   - `apps/web/components/MyComponent.tsx`
   - `apps/web/components/MyComponent.test.tsx`
5. Commit: `feat(web): create MyComponent`

---

*Last updated: 2026-03-22*
