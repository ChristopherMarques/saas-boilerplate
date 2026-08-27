import { NextRequest, NextResponse } from "next/server";
import { handleSubscriptionUpdate } from "@/shared/lib/payments/handle-event";

/**
 * Webhook handler for Cakto.
 *
 * To use Stripe instead:
 * 1. Delete this `cakto` folder.
 * 2. Use the `stripe` folder next to this one.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify token in query string
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (token !== process.env.PAYMENT_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Verify signature (in a real app, implement HMAC validation here)
    // const secret = process.env.PAYMENT_WEBHOOK_SECRET;

    const body = await req.json();
    const eventType = body.event;

    if (!eventType) {
      return NextResponse.json({ error: "No event type" }, { status: 400 });
    }

    // Cakto events typically look like 'subscription.created', 'subscription.renewed', etc.
    if (eventType.startsWith("subscription.")) {
      const subscription = body.data;

      // Extract metadata passed during checkout creation
      const userId = subscription.metadata?.userId;
      const planSlug = subscription.metadata?.planSlug;

      if (!userId || !planSlug) {
        console.warn("[Cakto Webhook] Missing metadata.userId or metadata.planSlug");
        return NextResponse.json({ received: true });
      }

      await handleSubscriptionUpdate({
        provider: "cakto",
        providerSubscriptionId: subscription.id,
        userId,
        planSlug,
        status: subscription.status === "active" ? "active" : "canceled", // map to our statuses
        currentPeriodStart: new Date(subscription.current_period_start || Date.now()),
        currentPeriodEnd: new Date(
          subscription.current_period_end || Date.now() + 30 * 24 * 60 * 60 * 1000,
        ),
        cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Cakto Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
