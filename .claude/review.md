# /review — Run code review and security audit

Triggers the security-reviewer agent and applies the code-review skill
checklist to the specified files or the entire project.

## Usage
```
/review [path or file]
```

Examples:
```
/review                              -- review all staged changes
/review apps/api/src/features/pricing/
/review apps/web/components/price-score/PriceBadge.tsx
/review --security                   -- run security-reviewer agent only
```

## What gets checked

1. TypeScript quality (no `any`, explicit types)
2. Architecture boundaries (controller → service → repository)
3. React patterns (no fetch in components, TanStack Query usage)
4. Security (secrets, SQL injection, auth bypass, RLS)
5. Test coverage (new logic has tests)
6. Git hygiene (no console.log, commit message convention)

## Output format

For each issue found:
```
FILE: path/to/file.ts (line N)
RULE: which rule was violated
ISSUE: what's wrong
FIX: concrete change to make
```

If clean: `REVIEW PASSED — no issues found.`
