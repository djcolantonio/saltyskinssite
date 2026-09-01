import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProduct } from "@/lib/products";

type CartItemInput = { slug: string; size: string; quantity: number };

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const cartItems: CartItemInput[] = Array.isArray(body?.items) ? body.items : [];

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const origin = req.headers.get("origin") || "https://ssyogaretreats.com";

  // Always price from our own catalog — never trust amounts sent by the
  // client, since the request body could be tampered with before it hits us.
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of cartItems) {
    const product = getProduct(item.slug);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.slug}` }, { status: 400 });
    }
    const quantity = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));
    line_items.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: item.size ? `${product.name} (${item.size})` : product.name,
          images: [`${origin}${product.image}`],
        },
      },
    });
  }

  const shippingRateIds = (process.env.STRIPE_SHIPPING_RATE_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: shippingRateIds.length
        ? shippingRateIds.map((shipping_rate) => ({ shipping_rate }))
        : undefined,
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Stripe] Failed to create checkout session:", err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
