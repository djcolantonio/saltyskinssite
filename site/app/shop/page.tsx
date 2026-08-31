// TODO: replace this static list with real Stripe Products once the catalog
// (variants, images, inventory) is migrated over from WooCommerce. See the
// "Rebuild Shop on Stripe" task for details.
const products = [
  { name: "Clear Mind T-Shirt", price: 45 },
  { name: "Do My Nipples Offend You? Crop Tank", price: 30 },
  { name: "Limoncello Coast Crop Tank", price: 30 },
  { name: "Lucky Charm Tank", price: 30 },
  { name: "Salty Lemons Tank", price: 30, hasVariants: true },
  { name: "Salty Skins Mineral Wash T-Shirt", price: 45, hasVariants: true },
  { name: "Salty Vintage Wave Rider Sweater", price: 70, hasVariants: true },
  { name: "The Storm Within T-Shirt", price: 45 },
];

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

      <div className="mt-6 text-center text-xs uppercase tracking-widest2 text-sandDark">
        Checkout is being migrated to Stripe — shop reopens here shortly.
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((p) => (
          <div key={p.name} className="text-center">
            <div className="aspect-[3/4] w-full bg-gradient-to-b from-cream to-sand/30" />
            <h3 className="mt-4 text-sm">{p.name}</h3>
            <p className="mt-1 text-sm text-ink/70">${p.price.toFixed(2)}</p>
            <button
              disabled
              className="btn-outline mt-3 w-full cursor-not-allowed opacity-50"
            >
              {p.hasVariants ? "Select options" : "Add to cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
