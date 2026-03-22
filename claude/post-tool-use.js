#!/usr/bin/env node
/**
 * PostToolUse hook — AutoMarket
 * Runs after Write/create_file tool calls.
 * Reminds about TDD workflow and missing steps.
 */

const chunks = []
process.stdin.on('data', d => chunks.push(d))
process.stdin.on('end', () => {
  const input = JSON.parse(Buffer.concat(chunks).toString() || '{}')
  const { tool_name, tool_input } = input

  const reminders = []

  if (['Write', 'create_file'].includes(tool_name)) {
    const path = tool_input?.path || tool_input?.file_path || ''

    // After service: write tests first
    if (path.includes('.service.ts') && !path.includes('.test.')) {
      const testPath = path.replace('.service.ts', '.service.test.ts')
      reminders.push(
        `TDD: Write failing tests before implementing.\n  → Create: ${testPath}`
      )
    }

    // After repository: write integration tests
    if (path.includes('.repository.ts') && !path.includes('.test.')) {
      const testPath = path.replace('.repository.ts', '.repository.test.ts')
      reminders.push(
        `TDD: Write integration tests for this repository.\n  → Create: ${testPath}`
      )
    }

    // After new strategy: register in PricingEngine
    if (path.includes('Strategy.ts') && path.includes('/pricing/') &&
        !path.includes('.test.')) {
      reminders.push(
        `Register this strategy in PricingEngine constructor.\n` +
        `  → File: apps/api/src/features/pricing/pricing-engine.ts\n` +
        `  → Order matters: more specific strategies first.`
      )
    }

    // After new hook: add to barrel
    if (path.match(/\/hooks\/use[A-Z]/) && path.endsWith('.ts') &&
        !path.includes('.test.')) {
      reminders.push(
        `Add to barrel export.\n  → File: apps/web/hooks/index.ts`
      )
    }

    // After new component: accessibility reminder
    if (path.includes('/components/') && path.endsWith('.tsx') &&
        !path.includes('.test.')) {
      reminders.push(
        `Component checklist:\n` +
        `  - Add data-testid for RTL queries\n` +
        `  - Add aria-label for interactive elements\n` +
        `  - Wrap Framer Motion in prefers-reduced-motion check`
      )
    }

    // After new router: register in index.ts
    if (path.includes('.router.ts') && !path.includes('.test.')) {
      reminders.push(
        `Register this router in the Express app.\n` +
        `  → File: apps/api/src/index.ts`
      )
    }

    // After migration: run it
    if (path.includes('/migrations/')) {
      reminders.push(
        `Run the migration.\n  → Command: pnpm db:migrate`
      )
    }
  }

  if (reminders.length > 0) {
    process.stderr.write(`\n[AutoMarket]\n${reminders.join('\n\n')}\n`)
  }

  process.exit(0)
})
