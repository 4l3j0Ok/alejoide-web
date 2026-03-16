# AGENTS.md

Agentic coding guidelines for the alejoide-web repository. This document provides instructions for autonomous agents operating in this codebase.

## Build, Lint, and Test Commands

### Package Manager
- **pnpm** is the required package manager (version: 10.11.0)
- Always use `pnpm` instead of `npm` or `yarn`

### Core Commands
```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server on localhost:3000
pnpm build            # Full build: runs astro check (TypeScript validation) then astro build
pnpm preview          # Preview production build
pnpm astro <command>  # Run any astro CLI command
```

### Type Checking & Validation
- **`pnpm build`** runs both type checking (via `astro check`) and builds the project; it fails on TypeScript errors
- **`pnpm astro check`** alone validates TypeScript without building
- No unit test framework is configured; use `pnpm build` as the primary verification

### Development Workflow
1. Run `pnpm dev` for local development with hot reload
2. Use `pnpm astro check` to validate changes before committing
3. Run `pnpm build` to verify the full build succeeds before creating PR

## Code Style Guidelines

### TypeScript
- **Strict mode enabled** (extends `astro/tsconfigs/strict`)
- Always provide **explicit type annotations** when inference is unclear
- Use `import type { ... }` for type-only imports
- JSX is configured with `react-jsx` (automatic runtime)

### File Organization
- **Astro pages/components**: `src/pages/` (routes) and `src/components/` (reusable) — all `.astro` files
- **React components**: `src/components/*.tsx` — use function components with hooks
- **API endpoints**: `src/pages/api/*.json.ts` (e.g., `sendEmail.json.ts`)
- **Configuration**: `src/config/` (colors, site data, projects, footer)
- **Styles**: component-specific CSS files or Astro `<style>` blocks (no Tailwind)
- **Layouts**: `src/layouts/Layout.astro` (global shell with Navbar/slot/Footer)

### Imports & Module Conventions
```typescript
// Use named imports for types
import type { FormEvent } from "react";
import type { APIRoute } from "astro";

// Component imports (relative paths)
import ContactForm from "../components/ContactForm";
import { colors } from "../config/colors";

// Environment variables (server-only or client)
import { RESEND_API_KEY } from "astro:env/server";
import { PUBLIC_EMAIL } from "astro:env/client";
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ContactForm.tsx`, `Navbar.astro`)
- **Functions/variables**: camelCase (e.g., `setResponseMessage`, `emailEndpoint`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for env vars
- **Files**: kebab-case for styles (`ContactForm.css`), PascalCase for components

### Formatting & Syntax
- **Indentation**: 2 spaces (matches existing code)
- **Quotes**: double quotes for strings
- **Semicolons**: include them
- **Astro components**: frontmatter (triple dashes `---`) at top with imports, then HTML template below
- **React components**: standard function component syntax with hooks

### CSS & Styling
- **No Tailwind** — use plain CSS or Astro `<style>` blocks
- **CSS variables**: defined in `Layout.astro` via `define:vars` (backed by `src/config/colors.ts`)
- **Avoid hardcoded colors** — use existing color tokens if possible
- **Global styles**: use `is:global` in `<style>` block within `Layout.astro`

### Error Handling
- **API endpoints**: return structured JSON responses with status codes
  - 200: success → `{ message: data }`
  - 400: bad request → `{ message: "Error description" }` with status 400
  - 500: server error → `{ message: error }` with status 500
- **Form validation**: validate on backend (required fields, email format)
- **Console logging**: use for debugging; include context (e.g., "Enviando mail con los siguientes datos:")

### Environment Variables
- Declared in `astro.config.mjs` under `env.schema`
- **Server-only secrets**: import from `astro:env/server` (e.g., `RESEND_API_KEY`, `SEND_EMAIL_FROM`)
- **Public vars**: import from `astro:env/client` (e.g., `PUBLIC_EMAIL`, `SEND_EMAIL_TO`)
- Never commit `.env` with real secrets; use CI secrets injection

## Language & Localization
- Keep user-facing copy in **Spanish** (es-ar) unless UI context is clearly English
- Example: form labels should be Spanish (`Nombre`, `Email`, `Mensaje`)

## Copilot Instructions
The project includes [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — refer to it for additional context on architecture, email flow, and conventions.

## Quick Checklist for Agents
- [ ] Use `pnpm` for all package operations
- [ ] Run `pnpm astro check` before committing
- [ ] Verify `pnpm build` succeeds
- [ ] Keep imports organized (types first, then components, then utils)
- [ ] Use TypeScript strict mode; add explicit types
- [ ] Match existing code style (2-space indent, double quotes)
- [ ] Avoid hardcoded colors — use `src/config/colors.ts`
- [ ] No Tailwind; use plain CSS with CSS variables
- [ ] Spanish copy for user-facing text
- [ ] API endpoints: validate input, return proper status codes
