"use client";

import { useCart } from "@/lib/cart-context";

export default function CartLink() {
  const { itemCount, openDrawer } = useCart();
  return (
    <button type="button" onClick={openDrawer} className="hover:text-sand transition-colors">
      Cart{itemCount > 0 ? ` (${itemCount})` : ""}
    </button>
  );
}
