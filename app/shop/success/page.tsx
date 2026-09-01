"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function ShopSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // Only ever needs to run once, when the confirmation page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
}
