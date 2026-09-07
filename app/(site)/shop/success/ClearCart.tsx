"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export default function ClearCart() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // Only ever needs to run once, when the confirmation page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
