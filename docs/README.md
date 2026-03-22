# Documentation Index

Welcome to the AutoMarket documentation. This folder contains architecture decisions, commit history, and git workflow documentation.

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

- **[CLAUDE.md](../claude/CLAUDE.md)** — Project specification, stack, conventions
- **[Architecture Decisions](./ARCHITECTURE.md)** — Why we chose monorepo, design patterns, directory structure
- **[Commit History](./COMMITS.md)** — Detailed explanation of each commit
- **[Git Workflow](./BRANCHING.md)** — How to create branches and commits

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
