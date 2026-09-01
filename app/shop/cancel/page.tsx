import Link from "next/link";

export default function ShopCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="label-caps">Checkout Canceled</p>
      <h1 className="mt-4 font-serif text-4xl font-light">No charge was made</h1>
      <p className="mt-6 text-ink/80">
        Your cart is still saved — head back whenever you&rsquo;re ready to
        check out.
      </p>
      <Link href="/cart" className="btn-outline mt-8 inline-block">
        Back to Cart
      </Link>
    </div>
  );
}
