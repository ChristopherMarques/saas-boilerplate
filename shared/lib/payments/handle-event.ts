import "server-only";
import { supabaseAdmin } from "@/shared/lib/supabase-admin";
import type { PlanTier } from "@/shared/lib/plans";

export type PaymentProvider = "stripe" | "cakto";

export interface SubscriptionEvent {
  provider: PaymentProvider;
  providerSubscriptionId: string;
  userId: string;
  planSlug: string;
  status: "active" | "canceled" | "past_due" | "unpaid";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

/**
 * Idempotent handler for subscription updates from any payment provider.
 */
export async function handleSubscriptionUpdate(event: SubscriptionEvent) {
  try {
    // 1. Resolve tier from slug
    const tier = event.planSlug.split("-")[0] as PlanTier;

    // 2. Upsert subscription record
    const { error: subError } = await supabaseAdmin.from("subscriptions").upsert(
      {
        user_id: event.userId,
        plan_slug: event.planSlug,
        status: event.status,
        provider: event.provider,
        provider_subscription_id: event.providerSubscriptionId,
        current_period_start: event.currentPeriodStart.toISOString(),
        current_period_end: event.currentPeriodEnd.toISOString(),
        cancel_at_period_end: event.cancelAtPeriodEnd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "provider_subscription_id" },
    );

    if (subError) throw subError;

    // 3. Sync user tier if status is active
    if (event.status === "active") {
      const { error: userError } = await supabaseAdmin
        .from("users")
        .update({ subscription_tier: tier, updated_at: new Date().toISOString() })
        .eq("id", event.userId);

      if (userError) throw userError;
    } else if (event.status === "canceled" || event.status === "unpaid") {
      // Downgrade to free if canceled and period ended
      if (event.currentPeriodEnd < new Date()) {
        const { error: userError } = await supabaseAdmin
          .from("users")
          .update({ subscription_tier: "free", updated_at: new Date().toISOString() })
          .eq("id", event.userId);

        if (userError) throw userError;
      }
    }

    return { success: true };
  } catch (error) {
    console.error(`[handleSubscriptionUpdate] Error processing ${event.provider} event:`, error);
    throw error;
  }
}
