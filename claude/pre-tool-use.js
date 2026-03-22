#!/usr/bin/env node
/**
 * PreToolUse hook — AutoMarket
 * Runs before every Claude tool call.
 * Exit 0 = allow, exit 2 = block.
 */

const chunks = []
process.stdin.on('data', d => chunks.push(d))
process.stdin.on('end', () => {
  const input = JSON.parse(Buffer.concat(chunks).toString() || '{}')
  const { tool_name, tool_input } = input

  const warnings = []
  const blocks = []

  // ── Write / file creation ───────────────────────────────────────────────
  if (['Write', 'create_file', 'str_replace'].includes(tool_name)) {
    const path    = tool_input?.path || tool_input?.file_path || ''
    const content = tool_input?.content || tool_input?.file_text || tool_input?.new_str || ''

    // Block: TypeScript `any`
    if ((path.endsWith('.ts') || path.endsWith('.tsx')) &&
        /:\s*any[\s;,>)=]|<any>|as any/.test(content)) {
      blocks.push('TypeScript `any` detected. Use a proper type or `unknown`.')
    }

    // Block: hardcoded secrets
    if (/sk-ant-api|AKIA[A-Z0-9]{16}|password\s*=\s*['"][^'"]{4,}['"]/i.test(content)) {
      blocks.push('Possible hardcoded secret. Use process.env instead.')
    }

    // Block: SQL string interpolation
    if (path.includes('/api/') && /`[^`]*\$\{[^}]*\}[^`]*`/.test(content) &&
        /SELECT|INSERT|UPDATE|DELETE/i.test(content)) {
      blocks.push('SQL string interpolation detected. Use parameterized queries ($1, $2...).')
    }

    // Block: OFFSET pagination
    if (path.includes('/api/') && /\.offset\(|OFFSET\s+\d/.test(content)) {
      blocks.push('OFFSET pagination detected. Use cursor-based pagination instead.')
    }

    // Block: SELECT *
    if (path.includes('/repository') && /SELECT\s+\*/i.test(content)) {
      blocks.push('SELECT * detected in repository. Always list columns explicitly.')
    }

    // Warn: snapshot tests
    if ((path.includes('.test.') || path.includes('.spec.')) &&
        content.includes('toMatchSnapshot')) {
      warnings.push('Avoid toMatchSnapshot() — test explicit values (project convention).')
    }

    // Warn: raw fetch in React component
    if (path.endsWith('.tsx') && content.includes('fetch(') &&
        !content.includes('useQuery') && !path.includes('.test.')) {
      warnings.push('Raw fetch() in component. Use TanStack Query (useQuery/useMutation).')
    }

    // Warn: controller calling repository directly
    if (path.includes('.controller.') &&
        /Repository\b/.test(content) && !/Service\b/.test(content)) {
      warnings.push('Controller appears to call Repository directly. Route through Service layer.')
    }

    // Warn: missing test file reminder
    if ((path.includes('/components/') || path.includes('/hooks/') ||
         path.includes('/features/')) &&
        (path.endsWith('.ts') || path.endsWith('.tsx')) &&
        !path.includes('.test.') && !path.includes('.spec.') &&
        !path.includes('index.ts') && !path.includes('types.ts')) {
      const filename = path.split('/').pop()
      warnings.push(`Remember to create a test file for ${filename} (TDD — write tests first).`)
    }
  }

  // ── Bash commands ────────────────────────────────────────────────────────
  if (['Bash', 'bash_tool'].includes(tool_name)) {
    const cmd = tool_input?.command || ''

    // Block: force push
    if (/git push.*--force/.test(cmd)) {
      blocks.push('git push --force is not allowed. Use --force-with-lease if needed.')
    }

    // Block: dangerous rm
    if (/rm\s+-rf\s+\/(?!tmp)/.test(cmd)) {
      blocks.push('Dangerous rm -rf detected on system path.')
    }

    // Block: pipe to bash from curl
    if (/curl.*\|\s*(bash|sh)/.test(cmd)) {
      blocks.push('curl | bash is not allowed for security reasons.')
    }

    // Warn: reading env files directly
    if (/cat\s+\.env(?!\.example)/.test(cmd)) {
      warnings.push('Reading .env file directly. Use process.env in code instead.')
    }
  }

  // ── Output ────────────────────────────────────────────────────────────────
  if (blocks.length > 0) {
    process.stdout.write(JSON.stringify({
      action: 'block',
      message: `[AutoMarket Hook]\n${blocks.join('\n')}`
    }))
    process.exit(2)
  }

  if (warnings.length > 0) {
    process.stderr.write(`[AutoMarket Hook]\n${warnings.join('\n')}\n`)
  }

  process.exit(0)
})
