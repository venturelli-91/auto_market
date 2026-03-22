# Documentation Index

Welcome to the AutoMarket documentation. This folder contains architecture decisions, features roadmap, deployment guide, quickstart guide, and more.

## Getting Started

**New to the project?** Start here:

1. **[QUICKSTART.md](./QUICKSTART.md)** — Get running locally in 5 minutes
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Understand the design
3. **[FEATURES.md](./FEATURES.md)** — See what's planned

**Deploying to production?** Read:

- **[DEPLOY.md](./DEPLOY.md)** — Infrastructure, environment setup, deployment steps

**Contributing?** Check:

- **[BRANCHING.md](./BRANCHING.md)** — Git workflow and commit discipline
- **[COMMITS.md](./COMMITS.md)** — Learn from existing commits

---

## Files

### [ARCHITECTURE.md](./ARCHITECTURE.md)
Explains the **why** behind major design decisions:
- **Monorepo vs Microservices** — Why we chose monorepo with pnpm workspaces
- **Design Patterns** — Frontend (Container/Presentational, Custom Hooks, Compound Components) and Backend (Repository, Strategy, Observer)
- **Directory Structure** — Folder organization and responsibilities
- **Branching Strategy** — How branches are organized

**Read this if you want to understand:**
- Why not microservices?
- How are frontend components structured?
- How is the API organized?
- What patterns are used and why?

---

### [COMMITS.md](./COMMITS.md)
Detailed description of each commit made to the project:
- Commit hash, message, and files changed
- Rationale for the commit
- Decisions made in that commit
- Files and their purposes

**Read this if you want to understand:**
- What was done in each commit?
- Why was it done that way?
- What dependencies were added and why?
- How should future commits follow the same pattern?

---

### [QUICKSTART.md](./QUICKSTART.md)
Get started in 5 minutes:
- Prerequisites (Node, pnpm, Docker)
- Installation steps
- Starting development servers
- Common commands (dev, test, build, lint)
- Troubleshooting guide
- IDE setup (VSCode, WebStorm)

**Read this if you want:**
- A quick way to get the project running locally
- Answers to common setup problems
- A reference for frequently used commands

---

### [FEATURES.md](./FEATURES.md)
Complete features roadmap and specifications:
- **MVP Features** (must-haves before demo)
  1. Listings Catalog
  2. Price Intelligence (the differentiator)
  3. Faceted Search
  4. Dealer Workspaces
- **Phase 2 Features** (future)
  5. AI Shopping Assistant
  6. Vehicle Photos & Image Processing
  7. Saved Listings & Favorites
  8. User Reviews & Ratings
- **Feature Status** — Done, In Progress, Planned, Review, On Hold
- **Dependency Graph** — How features depend on each other
- **Interview Talking Points** — How to demo effectively

**Read this if you want:**
- A detailed spec for each feature
- Database schema and API endpoints
- Component and hook names
- Interview demo tips

---

### [DEPLOY.md](./DEPLOY.md)
Deployment guide for production:
- **Infrastructure Options** — Self-hosted, Vercel, Railway, AWS
- **Database Setup** — PostgreSQL with RLS, migrations
- **Environment Variables** — Configuration for prod
- **Deployment Steps** — Manual and automated (GitHub Actions)
- **Monitoring & Logs** — Health checks, error tracking, analytics
- **Rollback Procedure** — How to undo a failed deployment
- **Performance Optimization** — Frontend and backend tuning
- **Security Checklist** — Pre-deployment verification
- **Cost Estimation** — Monthly expenses by platform
- **Disaster Recovery** — Backup and restore strategy

**Read this if you want:**
- To deploy to production
- To understand infrastructure options
- To set up monitoring and alerting
- To configure database backups

---

### [BRANCHING.md](./BRANCHING.md)
Git workflow and branching strategy:
- **Branch types** — `main`, `feature/*`, `fix/*`, `refactor/*`
- **Commit discipline** — Format, messages, atomicity
- **Code review checklist** — What to verify before merging
- **Example workflow** — Step-by-step feature development

**Read this if you want to know:**
- How do I create a feature branch?
- What should my commit message look like?
- What checks happen before merging to main?
- What's the workflow for adding a new component?

---

## Quick Links

| Document | Purpose | Read When |
|----------|---------|-----------|
| [CLAUDE.md](../claude/CLAUDE.md) | Project spec, stack, conventions | Understanding project goals |
| [QUICKSTART.md](./QUICKSTART.md) | Get running locally | First time setting up |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Design decisions, patterns | Understanding the code |
| [FEATURES.md](./FEATURES.md) | Roadmap, specs, API endpoints | Planning what to build |
| [BRANCHING.md](./BRANCHING.md) | Git workflow, commits | Contributing code |
| [COMMITS.md](./COMMITS.md) | Detailed commit explanations | Learning from history |
| [DEPLOY.md](./DEPLOY.md) | Production deployment | Going live |

---

## Key Concepts

### Monorepo Architecture
We use **pnpm workspaces** with a single repository containing:
- `apps/web/` — Next.js 14 frontend
- `apps/api/` — Express.js backend
- `packages/shared-types/` — Shared TypeScript types

**Why?** Type safety (changes to types break in both places simultaneously), simpler development workflow, easier testing.

[Read more](./ARCHITECTURE.md#monorepo-vs-microservices)

### Feature-Driven Development (FDD)
Each feature is built vertically: database → API → UI → tests. Each commit is atomic and self-contained.

### Design-First Component Development
UI components are coded **after** analyzing design references in `public/designs/`. No invented layouts or colors.

### Atomic Commits
Each commit should be independently deployable and revertible. No "work in progress" or "fixing previous commit" commits.

---

## For New Contributors

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the structure
2. Read [BRANCHING.md](./BRANCHING.md) to learn the workflow
3. Read [COMMITS.md](./COMMITS.md) to see examples of good commits
4. Follow the code review checklist in [BRANCHING.md](./BRANCHING.md) before merging

---

*Last updated: 2026-03-22*
