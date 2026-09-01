"use client";

import Image from "next/image";
import { useState } from "react";
import { products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="label-caps text-center">Salty Skins Collection</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        Wear the Journey
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-center text-ink/80">
        Apparel designed for movement, salt air, and the space between
        adventures.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="text-center">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <h3 className="mt-4 text-sm">{product.name}</h3>
      <p className="mt-1 text-sm text-ink/70">${product.price.toFixed(2)}</p>

      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        aria-label={`Size for ${product.name}`}
        className="mt-2 w-full border border-black/15 bg-white px-2 py-2 text-xs outline-none focus:border-sand"
      >
        {product.sizes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button onClick={handleAdd} className="btn-outline mt-3 w-full">
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
