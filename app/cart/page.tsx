"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setCheckingOut(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, size: i.size, quantity: i.quantity })),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.url) {
        throw new Error(body.error || "Could not start checkout.");
      }
      window.location.href = body.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setCheckingOut(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="label-caps">Your Cart</p>
        <h1 className="mt-4 font-serif text-4xl font-light">It&rsquo;s empty</h1>
        <p className="mt-6 text-ink/80">
          Nothing in your cart yet.{" "}
          <Link href="/shop" className="underline hover:text-sand">
            Browse the shop
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="label-caps text-center">Your Cart</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light">
        Review &amp; Checkout
      </h1>

      <div className="mt-14 divide-y divide-black/10">
        {items.map((item) => (
          <div key={`${item.slug}-${item.size}`} className="flex items-center gap-4 py-6">
            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-cream">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{item.name}</p>
              <p className="mt-1 text-xs text-ink/60">Size: {item.size}</p>
              <p className="mt-1 text-sm text-ink/70">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.slug, item.size, Number(e.target.value) || 1)
                }
                aria-label={`Quantity for ${item.name}, size ${item.size}`}
                className="w-14 border border-black/15 bg-white px-2 py-1 text-center text-sm outline-none focus:border-sand"
              />
              <button
                onClick={() => removeItem(item.slug, item.size)}
                className="text-xs text-ink/50 underline hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6">
        <p className="text-sm text-ink/70">Subtotal</p>
        <p className="text-lg">${subtotal.toFixed(2)}</p>
      </div>
      <p className="mt-1 text-xs text-ink/50">Shipping and tax calculated at checkout.</p>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={checkingOut}
        className="btn-solid mt-6 w-full sm:w-auto"
      >
        {checkingOut ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
}
