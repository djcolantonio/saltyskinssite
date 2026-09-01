"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="hover:text-sand transition-colors">
      Cart{itemCount > 0 ? ` (${itemCount})` : ""}
    </Link>
  );
}
