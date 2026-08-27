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
  O boilerplate definitivo para SaaS, pronto para produção, construído com Next.js 16 (App Router), focado nos <strong>princípios SOLID</strong>, escalabilidade e em uma experiência de desenvolvimento premium.
</p>

<p align="center">
  <em><a href="README.en.md">🇺🇸 Read this in English</a></em>
</p>

---

Abstraia a configuração tediosa de autenticação, pagamentos, internacionalização e bancos de dados para que você possa focar no que importa: **construir o seu produto**.

## 🏗️ Arquitetura e Stack Tecnológica

Este boilerplate é alimentado por ferramentas padrão da indústria, integradas cuidadosamente para funcionarem juntas:

- **Framework**: Next.js 16 (App Router, React 19)
- **Estilização**: Tailwind CSS v4 + shadcn/ui + React Aria
- **Banco de Dados**: Supabase (PostgreSQL + Row-Level Security)
- **Autenticação**: Better Auth (Google OAuth) com ponte JWT para o Supabase
- **Pagamentos**: Webhooks pré-configurados para **Stripe** e **Cakto**
- **Gerenciamento de Estado**: Zustand (Client State) & React Query (Server State + Persistência Offline)
- **Internacionalização (i18n)**: `react-i18next` (Inglês e Português nativos)
- **Analytics Bridge**: Rastreamento unificado entre PostHog, Microsoft Clarity e GA4
- **Testes**: Vitest + React Testing Library
- **Documentação**: Mintlify (`/docs`)

---

## 📂 Estrutura "Feature-Sliced"

Reforçamos uma separação estrita de responsabilidades para manter o código limpo:

```text
├── app/                  # Next.js App Router (Páginas, Layouts, API Routes)
├── features/             # Domínios isolados (ex: landing-page, auth, dashboard)
├── shared/               # Lógica compartilhada, componentes de UI, hooks e i18n
├── supabase/             # Migrações e configurações do banco de dados
├── docs/                 # Documentação no Mintlify
└── test/                 # Configuração de testes globais
```

---

## 🚀 Começando

### 1. Pré-requisitos
- Node.js 18+ (Recomendado Node 20)
- `pnpm` (gerenciador de pacotes padrão)
- Projeto no Supabase & Projeto no Google Cloud (para OAuth)

### 2. Instalação
Clone o repositório e instale as dependências:
```bash
pnpm install
```

### 3. Variáveis de Ambiente
Copie o arquivo de exemplo e preencha suas chaves:
```bash
cp .env.example .env.local
```
*(Você precisará das credenciais do Supabase, Better Auth, Gateway de Pagamento e provedores de Analytics).*

### 4. Configuração do Banco de Dados
Execute a migração SQL inicial no seu projeto Supabase para criar as tabelas necessárias (`users`, `subscriptions`, etc.). O script SQL está em:
`supabase/migrations/0000_initial.sql`

### 5. Rodando a Aplicação
Inicie o servidor de desenvolvimento:
```bash
pnpm run dev
```

---

## 💳 Gateways de Pagamento

Este boilerplate suporta nativamente o **Stripe** e a **Cakto**.

1. Decida qual gateway você irá utilizar no seu SaaS.
2. Vá até `app/api/webhooks/` e **apague a pasta** do gateway que você *não* vai usar.
3. Ambos os gateways compartilham a mesma lógica de sincronização com o banco de dados (`handle-event.ts`), garantindo que os níveis de assinatura funcionem perfeitamente independente da sua escolha.

---

## 📖 Documentação

A documentação completa está disponível via Mintlify. Para rodar a documentação localmente:

```bash
pnpm run docs:dev
```
*O servidor de documentação roda na porta 3333 para não conflitar com o Next.js.*

---

## ✅ Qualidade de Código e Pre-commit Hooks

Utilizamos **Husky** e **lint-staged** para garantir alta qualidade de código. Antes de cada commit, o sistema roda automaticamente:
- `eslint --fix` & `prettier --write`
- `tsc --noEmit` (Zero erros de TypeScript permitidos)
- `vitest run` (Todos os testes devem passar)

Você pode rodar essas checagens manualmente a qualquer momento:
```bash
pnpm run lint:fix
pnpm run type-check
pnpm run test
```
