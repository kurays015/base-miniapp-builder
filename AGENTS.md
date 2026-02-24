Purpose

This document defines coding, architecture, and contribution standards for this project.

This app is a Next.js-based interface for building Base mini-apps.
All contributors and AI agents must follow these standards to maintain consistency, scalability, and maintainability.

1. General Principles

Write clean, readable, and maintainable code.
Prefer simplicity over cleverness.
Avoid premature optimization.
Keep components small and composable.
Follow consistent naming conventions.
Every file and function must have a clear purpose.

2. Tech Stack Standards

Framework: Next.js (App Router)
Language: TypeScript (strict mode enabled)
Styling: Tailwind CSS
State Management: React hooks (or Zustand if global state is required)
Backend: Server Actions / API routes
Web3: viem / wagmi (for Base integration)
Testing: Vitest + React Testing Library

3. File & Folder Naming Conventions
   File Naming

Use kebab-case for component files, PascalCase for components, and camelCase for helper functions, hooks, and utils files.

Correct:

sampleFile.ts
WalletConnector.tsx
CreateMiniAppForm.tsx
useBaseContract.ts

Use kebab-case for folders.

Group by feature when possible.

4. Project Structure

Use feature-based organization when applicable.

app/
(dashboard)/
(builder)/
layout.tsx
page.tsx

components/
ui/
shared/

features/
mini-app-builder/
wallet/
deployment/

hooks/
use-wallet.ts
use-base-network.ts

lib/
base-client.ts
constants.ts

types/
mini-app.ts
contract.ts 5. Component Standards
General Rules

Use functional components only.
Use TypeScript interfaces for props.
Extract reusable logic into hooks.

Example:

interface CreateMiniAppFormProps {
onSubmit: (data: MiniAppFormValues) => void;
}

export function CreateMiniAppForm({ onSubmit }: CreateMiniAppFormProps) {
return (

<form>
{/_ form content _/}
</form>
);
}

6. TypeScript Rules

Enable "strict": true
Avoid any
Use explicit return types for exported functions
Define shared types inside /types
Prefer type for simple structures, interface for extendable contracts

7. Hooks Standards

All custom hooks must start with use-
Place in /hooks unless feature-specific
Hooks must not contain UI
Hooks must be reusable and testable

8. Web3 / Base Integration Standards

All blockchain logic must live in /lib or feature-specific folder.
Never mix UI and contract logic.
Store contract ABIs in /lib/abis.
Keep chain IDs and RPC URLs inside constants.ts.
Environment variables must be used for RPC URLs.

9. API & Server Actions

Use Server Actions when possible.
Keep API routes inside /app/api.
Validate all inputs (zod recommended).
Never trust client input.
Return typed responses.

10. Styling Rules

Use Tailwind only.
Avoid inline styles.
Extract repeated patterns into reusable UI components.
Keep classNames readable and grouped logically.

11. Environment Variables

All secrets go in .env.local
Never commit secrets
Prefix public values with NEXT*PUBLIC*

12. Linting & Formatting

ESLint enabled
Prettier formatting
No unused variables
No console.logs in production

13. Testing Standards (MANDATORY)

All code must be tested before committing to GitHub.

Testing Stack

Vitest

React Testing Library

jsdom environment

What Must Be Tested

All exported utility functions

All custom hooks

Critical UI logic

Form validation

Error states

Web3 interactions (must be mocked)

Test File Naming

Use:

ComponentName.test.tsx
useHookName.test.ts
serviceName.test.ts

Tests must live beside the file being tested or inside a **tests** folder.

Required Scripts (package.json)
{
"scripts": {
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
}
}

14. Pre-Commit Hook (REQUIRED)

Commits must be blocked if tests fail.

Install Husky:

npm install -D husky
npx husky init

Add pre-commit hook:

npx husky add .husky/pre-commit "npm run test:run"

This enforces:

❌ If tests fail → commit is blocked

✅ If tests pass → commit succeeds

No contributor or AI agent may bypass this rule.

15. Git Standards
    Branch Naming
    feature/add-wallet-connection
    fix/deployment-error
    refactor/builder-state
    Commit Messages

Use conventional commits:

feat: add base wallet connector
fix: resolve contract deployment bug
refactor: simplify builder state logic

16. Performance Standards

Use dynamic imports when needed
Avoid unnecessary re-renders
Memoize expensive computations
Use Suspense where appropriate

17. Security Standards

Never expose private keys
Never hardcode RPC URLs
Validate all inputs
Sanitize user-provided content
Use rate limiting on API routes

18. Documentation

Every major feature must have a README.
Complex logic must include inline comments.
Update AGENTS.md when architecture changes.

19. Definition of Done (UPDATED)

A feature is complete when:

It compiles without errors

It passes lint checks

It passes npm run test:run

It has no TypeScript warnings

It follows folder and naming standards

It does not introduce console warnings

It is responsive and works on mobile

If tests fail, the feature is not complete.

20. AI Agent Rules

When generating code:

Follow all naming conventions

Do not use class components

Do not use any

Respect folder structure

Do not create unnecessary files

Prefer reusable abstractions

Keep code production-ready

Always generate corresponding tests for new exported logic
