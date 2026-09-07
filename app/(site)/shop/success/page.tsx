import Link from "next/link";
import Stripe from "stripe";
import ClearCart from "./ClearCart";

export const dynamic = "force-dynamic";

async function getSession(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  try {
    const stripe = new Stripe(secretKey);
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("[Stripe] Failed to retrieve checkout session:", err);
    return null;
  }
}

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sessionId =
    typeof searchParams.session_id === "string" ? searchParams.session_id : undefined;
  const session = sessionId ? await getSession(sessionId) : null;
  const isPaid = session?.payment_status === "paid";

  if (!isPaid) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="label-caps">Order Not Found</p>
        <h1 className="mt-4 font-serif text-4xl font-light">
          We couldn&rsquo;t confirm this order
        </h1>
        <p className="mt-6 text-ink/80">
          If you completed a purchase and are seeing this, reach out through
          our{" "}
          <Link href="/contact" className="underline hover:text-sand">
            contact page
          </Link>{" "}
          and we&rsquo;ll sort it out right away.
        </p>
        <Link href="/shop" className="btn-outline mt-8 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="label-caps">Order Confirmed</p>
      <h1 className="mt-4 font-serif text-4xl font-light">Thank you!</h1>
      <p className="mt-6 text-ink/80">
        Your order is confirmed — a receipt is on its way to your email.
        We&rsquo;ll be in touch with shipping details soon.
      </p>
      <Link href="/shop" className="btn-outline mt-8 inline-block">
        Continue Shopping
      </Link>
      <ClearCart />
    </div>
  );
}
