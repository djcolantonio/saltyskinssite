"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  const { addItem } = useCart();
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [hoverZoom, setHoverZoom] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  function handleZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="label-caps">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl font-light">
          We couldn&rsquo;t find that product
        </h1>
        <Link href="/shop" className="btn-outline mt-8 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  function handleAdd() {
    if (!product) return;
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

  const otherProducts = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Link href="/shop" className="text-xs tracking-widest2 uppercase text-ink/50 hover:text-sand">
        ← Back to Shop
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="group relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-cream"
          aria-label="Enlarge photo"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />
          <span className="absolute bottom-3 right-3 bg-ink/70 px-3 py-1 text-[10px] tracking-widest2 uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
            Click to enlarge
          </span>
        </button>

        <div>
          <p className="label-caps">Salty Skins Collection</p>
          <h1 className="mt-3 font-serif text-3xl font-light md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-ink/80">${product.price.toFixed(2)}</p>

          <p className="mt-6 text-ink/80">
            {product.blurb ||
              "Apparel designed for movement, salt air, and the space between adventures."}
          </p>

          <div className="mt-8">
            <label className="mb-2 block text-xs tracking-widest2 uppercase text-black">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    size === s
                      ? "border-sand bg-sand text-white"
                      : "border-black/15 text-ink hover:border-sand"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAdd} className="btn-solid mt-8 w-full sm:w-auto">
            {added ? "Added!" : "Add to Cart"}
          </button>

          <p className="mt-4 text-xs text-ink/50">
            Shipping and tax calculated at checkout.
          </p>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <div className="mt-24 border-t border-black/10 pt-12">
          <p className="label-caps text-center">You Might Also Like</p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {otherProducts.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="text-center">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-sm">{p.name}</h3>
                <p className="mt-1 text-sm text-ink/70">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4 md:p-10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleZoomMove}
            onMouseEnter={() => setHoverZoom(true)}
            onMouseLeave={() => setHoverZoom(false)}
            className={`relative h-full w-full max-w-4xl overflow-hidden ${
              hoverZoom ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-150 ease-out"
              style={{
                transformOrigin: zoomOrigin,
                transform: hoverZoom ? "scale(2.75)" : "scale(1)",
              }}
            />
          </div>
          <p className="mt-3 text-xs tracking-widest2 uppercase text-white/50">
            Move your cursor over the photo to zoom in &middot; tap outside to close
          </p>
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close"
            className="absolute right-6 top-6 text-3xl font-light text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
