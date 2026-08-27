<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <br />
  <img src="https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Zustand-4D4D4D?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" alt="i18next" />
</div>

<br />

<h1 align="center">SaaS Boilerplate 🚀</h1>

<p align="center">
  An ultimate, production-ready SaaS Boilerplate built with Next.js 16 (App Router), focusing on the <strong>SOLID principles</strong>, scalability, and a premium developer experience.
</p>

<p align="center">
  <em><a href="README.md">🇧🇷 Leia em Português</a></em>
</p>

---

Abstract away the tedious setup of authentication, payments, internationalization, and databases so you can focus on building your product.

## 🏗️ Architecture & Tech Stack

This boilerplate is powered by industry-standard tools carefully integrated to work seamlessly together:

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + shadcn/ui + React Aria
- **Database**: Supabase (PostgreSQL + Row-Level Security)
- **Authentication**: Better Auth (Google OAuth) with Supabase JWT Bridge
- **Payments**: Pre-configured Webhooks for **Stripe** and **Cakto**
- **State Management**: Zustand (Client State) & React Query (Server State + Offline Persistence)
- **Internationalization (i18n)**: `react-i18next` (English & Portuguese included)
- **Analytics Bridge**: Unified tracking across PostHog, Microsoft Clarity, and GA4
- **Testing**: Vitest + React Testing Library
- **Documentation**: Mintlify (`/docs`)

---

## 📂 Feature-Sliced Structure

We enforce a strict separation of concerns to keep the codebase clean:

```text
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
├── features/             # Isolated domains (e.g., landing-page, auth, dashboard)
├── shared/               # Shared logic, UI components, hooks, and i18n
├── supabase/             # Database migrations and configuration
├── docs/                 # Mintlify Documentation
└── test/                 # Test setup and utilities
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (Node 20 recommended)
- `pnpm` (default package manager)
- Supabase Project & Google Cloud Project (for OAuth)

### 2. Installation
Clone the repository and install the dependencies:
```bash
pnpm install
```

### 3. Environment Setup
Copy the example environment file and fill in your keys:
```bash
cp .env.example .env.local
```
*(You will need credentials from Supabase, Better Auth, your Payment Gateway, and Analytics providers).*

### 4. Database Setup
Run the initial SQL migration against your Supabase instance to create the necessary tables (`users`, `subscriptions`, etc.). You can find the SQL script at:
`supabase/migrations/0000_initial.sql`

### 5. Run the Application
Start the development server:
```bash
pnpm run dev
```

---

## 💳 Payment Gateways

This boilerplate supports both **Stripe** and **Cakto**. 

1. Decide which gateway you will use for your SaaS.
2. Go to `app/api/webhooks/` and **delete the folder** of the gateway you will *not* use.
3. Both gateways share the same database synchronization logic (`handle-event.ts`), so your subscription tiers will work flawlessly regardless of your choice.

---

## 📖 Documentation

Full documentation is available via Mintlify. To run the documentation locally:

```bash
pnpm run docs:dev
```
*The docs server runs on port 3333 to avoid conflicting with Next.js.*

---

## ✅ Code Quality & Pre-commit Hooks

We use **Husky** and **lint-staged** to ensure high code quality. Before every commit, the system automatically runs:
- `eslint --fix` & `prettier --write`
- `tsc --noEmit` (Zero TypeScript errors allowed)
- `vitest run` (All tests must pass)

You can run these checks manually at any time:
```bash
pnpm run lint:fix
pnpm run type-check
pnpm run test
```
