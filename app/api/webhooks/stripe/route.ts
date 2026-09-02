import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const TO_EMAIL = "ssyogaretreats@gmail.com";
const FROM_EMAIL = "Salty Skins Website <notifications@ssyogaretreats.com>";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.log("[Stripe webhook] Not configured yet — ignoring event.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();
  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature || "", webhookSecret);
  } catch (err) {
    console.error("[Stripe webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // "completed" can still mean a delayed payment method that hasn't
    // actually settled yet — only notify once money has actually moved.
    if (session.payment_status === "paid") {
      await notifyNewOrder(stripe, session);
    }
  }

  return NextResponse.json({ received: true });
}

async function notifyNewOrder(stripe: Stripe, session: Stripe.Checkout.Session) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Resend] Not configured yet — order notification not sent.");
    return;
  }

  let itemLines: string[] = [];
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
    });
    itemLines = lineItems.data.map(
      (li) =>
        `- ${li.description} x${li.quantity} — $${((li.amount_total || 0) / 100).toFixed(2)}`
    );
  } catch (err) {
    console.error("[Stripe webhook] Failed to list line items:", err);
  }

  const address = session.shipping_details?.address;
  const shippingLine = address
    ? [address.line1, address.line2, address.city, address.state, address.postal_code, address.country]
        .filter(Boolean)
        .join(", ")
    : null;

  const body = [
    "A new order just came through Salty Skins!",
    "",
    `Customer: ${session.customer_details?.name || "Unknown"}`,
    `Email: ${session.customer_details?.email || "Unknown"}`,
    shippingLine ? `Shipping to: ${shippingLine}` : null,
    "",
    "Items:",
    ...itemLines,
    "",
    `Total: $${((session.amount_total || 0) / 100).toFixed(2)}`,
    "",
    `View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New order — $${((session.amount_total || 0) / 100).toFixed(2)}`,
      text: body,
    });
  } catch (err) {
    console.error("[Resend] Failed to send order notification:", err);
  }
}
