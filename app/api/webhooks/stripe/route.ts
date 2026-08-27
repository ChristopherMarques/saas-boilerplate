import { NextRequest, NextResponse } from "next/server";
import { handleSubscriptionUpdate } from "@/shared/lib/payments/handle-event";

/**
 * Webhook handler for Stripe.
 *
 * To use Cakto instead:
 * 1. Delete this `stripe` folder.
 * 2. Use the `cakto` folder next to this one.
 */
export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Read the raw body for Stripe signature verification
    const text = await req.text();

    // NOTE: In a real app, you would verify the Stripe signature here using the stripe SDK
    // const event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    // For boilerplate purposes, we'll parse it directly
    const event = JSON.parse(text);

    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object;

        // Extract metadata we expect you to pass when creating the checkout session
        const userId = subscription.metadata.userId;
        const planSlug = subscription.metadata.planSlug;

        if (!userId || !planSlug) {
          console.warn("[Stripe Webhook] Missing metadata.userId or metadata.planSlug");
          break;
        }

        await handleSubscriptionUpdate({
          provider: "stripe",
          providerSubscriptionId: subscription.id,
          userId,
          planSlug,
          status:
            subscription.status === "active" || subscription.status === "trialing"
              ? "active"
              : subscription.status,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
