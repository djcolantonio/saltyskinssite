"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, subtotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isDrawerOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={closeDrawer}
      role="dialog"
      aria-modal="true"
      aria-label="Cart"
    >
      <div
        className="flex h-full w-full max-w-sm flex-col bg-cream px-6 py-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-2xl leading-none text-ink/60 transition-colors hover:text-ink"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ink/60">Your cart is empty.</p>
        ) : (
          <div className="mt-6 flex-1 divide-y divide-black/10 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-3 py-4">
                <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-sandLight">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{item.name}</p>
                  <p className="mt-1 text-xs text-ink/60">
                    Size: {item.size} &middot; Qty: {item.quantity}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
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
        )}

        {items.length > 0 && (
          <div className="mt-4 border-t border-black/10 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink/70">Subtotal</p>
              <p className="text-lg">${subtotal.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-xs text-ink/50">Shipping and tax calculated at checkout.</p>

            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-solid mt-4 w-full"
            >
              {checkingOut ? "Redirecting..." : "Checkout"}
            </button>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="btn-outline mt-2 block w-full text-center"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
