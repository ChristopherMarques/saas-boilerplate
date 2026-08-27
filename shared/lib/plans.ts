/**
 * Canonical plan catalog — single source of truth for checkout, RBAC, and UI.
 * Client-safe: no secrets, no server imports.
 */

export type PlanTier = "free" | "pro" | "max";
export type PlanInterval = "monthly" | "annual";

export interface PlanFeatures {
  maxProjects: number | null; // null = unlimited
  aiTokensMonthly: number;
  storage: string;
  support: string;
  customFeatures: Record<string, boolean>;
}

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  free: {
    maxProjects: 1,
    aiTokensMonthly: 100,
    storage: "500MB",
    support: "Community",
    customFeatures: {},
  },
  pro: {
    maxProjects: 10,
    aiTokensMonthly: 1_000,
    storage: "5GB",
    support: "Email (48h)",
    customFeatures: {},
  },
  max: {
    maxProjects: null,
    aiTokensMonthly: 5_000,
    storage: "Unlimited",
    support: "Priority (12h)",
    customFeatures: {},
  },
};

export interface PaidPlan {
  slug: string;
  tier: Exclude<PlanTier, "free">;
  name: string;
  priceUsd: number;
  priceLabel: string;
  interval: PlanInterval;
  currency: "USD";
  features: PlanFeatures;
  /** Stripe Price ID — fill in after creating products in Stripe */
  stripePriceId: string;
}

export function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const PAID_PLANS: PaidPlan[] = [
  {
    slug: "pro-monthly",
    tier: "pro",
    name: "Pro",
    priceUsd: 19,
    priceLabel: formatUSD(19),
    interval: "monthly",
    currency: "USD",
    features: PLAN_FEATURES.pro,
    stripePriceId: "price_REPLACE_ME_PRO_MONTHLY",
  },
  {
    slug: "pro-annual",
    tier: "pro",
    name: "Pro (Annual)",
    priceUsd: 190,
    priceLabel: formatUSD(190),
    interval: "annual",
    currency: "USD",
    features: PLAN_FEATURES.pro,
    stripePriceId: "price_REPLACE_ME_PRO_ANNUAL",
  },
  {
    slug: "max-monthly",
    tier: "max",
    name: "Max",
    priceUsd: 49,
    priceLabel: formatUSD(49),
    interval: "monthly",
    currency: "USD",
    features: PLAN_FEATURES.max,
    stripePriceId: "price_REPLACE_ME_MAX_MONTHLY",
  },
  {
    slug: "max-annual",
    tier: "max",
    name: "Max (Annual)",
    priceUsd: 490,
    priceLabel: formatUSD(490),
    interval: "annual",
    currency: "USD",
    features: PLAN_FEATURES.max,
    stripePriceId: "price_REPLACE_ME_MAX_ANNUAL",
  },
];

export function getPlanBySlug(slug: string): PaidPlan | undefined {
  return PAID_PLANS.find((p) => p.slug === slug);
}

export function getPlansForTier(
  tier: Exclude<PlanTier, "free">,
  interval?: PlanInterval,
): PaidPlan[] {
  return PAID_PLANS.filter((p) => p.tier === tier && (!interval || p.interval === interval));
}

export type TokenOperation = "basic" | "medium" | "complex";

export const TOKEN_COSTS: Record<TokenOperation, number> = {
  basic: 1,
  medium: 5,
  complex: 20,
};
