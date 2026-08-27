/**
 * RBAC based on subscription tier.
 * Server-only: uses supabaseAdmin. Never import in "use client" modules.
 */
import "server-only";
import { supabaseAdmin } from "./supabase-admin";
import { PLAN_FEATURES, TOKEN_COSTS, type PlanTier, type TokenOperation } from "./plans";

// ---------------------------------------------------------------------------
// Tier resolution
// ---------------------------------------------------------------------------

export async function getUserTier(userId: string): Promise<PlanTier> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("subscription_tier")
    .eq("id", userId)
    .maybeSingle();

  const raw = (data?.subscription_tier as string | null) ?? "free";
  return (["free", "pro", "max"].includes(raw) ? raw : "free") as PlanTier;
}

// ---------------------------------------------------------------------------
// Feature gates
// ---------------------------------------------------------------------------

export async function canUseFeature(userId: string, feature: string): Promise<boolean> {
  const tier = await getUserTier(userId);
  const features = PLAN_FEATURES[tier];
  return Boolean(features.customFeatures[feature]);
}

// ---------------------------------------------------------------------------
// Project limits
// ---------------------------------------------------------------------------

export async function getProjectLimit(userId: string): Promise<number> {
  const tier = await getUserTier(userId);
  const features = PLAN_FEATURES[tier];
  return features.maxProjects === null ? -1 : features.maxProjects;
}

// ---------------------------------------------------------------------------
// AI Token metering
// ---------------------------------------------------------------------------

export async function getMonthlyTokensUsed(userId: string): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data } = await supabaseAdmin
    .from("ai_token_usage")
    .select("tokens_used")
    .eq("user_id", userId)
    .gte("created_at", startOfMonth.toISOString());

  const tokensUsed = (data ?? []).reduce(
    (sum: number, r: { tokens_used: number | null }) => sum + (r.tokens_used ?? 0),
    0,
  );
  return tokensUsed;
}

export interface TokenBalance {
  used: number;
  limit: number;
  remaining: number;
}

export async function getTokenBalance(userId: string): Promise<TokenBalance> {
  const tier = await getUserTier(userId);
  const limit = PLAN_FEATURES[tier]?.aiTokensMonthly ?? 100;
  const used = await getMonthlyTokensUsed(userId);
  return { used, limit, remaining: Math.max(0, limit - used) };
}

export async function checkTokens(
  userId: string,
  operation: TokenOperation,
): Promise<{ allowed: boolean; cost: number; balance: TokenBalance }> {
  const cost = TOKEN_COSTS[operation];
  const balance = await getTokenBalance(userId);
  return { allowed: balance.remaining >= cost, cost, balance };
}

export async function consumeTokens(
  userId: string,
  operation: TokenOperation,
  description?: string,
): Promise<void> {
  const cost = TOKEN_COSTS[operation];
  await supabaseAdmin.from("ai_token_usage").insert({
    user_id: userId,
    tokens_used: cost,
    operation,
    description: description ?? operation,
  });
}

// ---------------------------------------------------------------------------
// Plan summary (used by /api/user/limits)
// ---------------------------------------------------------------------------

export interface UserPlanSummary {
  tier: PlanTier;
  projects: { used: number; limit: number };
  tokens: TokenBalance;
}

export async function getUserPlanSummary(userId: string): Promise<UserPlanSummary> {
  const tier = await getUserTier(userId);
  const limit = await getProjectLimit(userId);
  const tokens = await getTokenBalance(userId);

  return {
    tier,
    projects: { used: 0, limit }, // Actual count depends on your project table
    tokens,
  };
}
