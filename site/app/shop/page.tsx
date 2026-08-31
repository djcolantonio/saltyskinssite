import Image from "next/image";

// TODO: replace this static list with real Stripe Products once checkout is
// wired up. Sizes/prices below were pulled from the live WooCommerce catalog.
const products = [
  {
    slug: "clear-mind-t-shirt",
    name: "Clear Mind T-Shirt",
    price: 45,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/07/ssbeigefront.png",
    blurb: "Heavyweight vintage-washed tee with exclusive Salty Skins artwork.",
  },
  {
    slug: "do-my-nipples-offend-you-crop-tank",
    name: "Do My Nipples Offend You? Crop Tank",
    price: 30,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/07/dmnoy.png",
    blurb: "A clean, everyday crop tank with a little attitude.",
  },
  {
    slug: "limoncello-coast-crop-tank",
    name: "Limoncello Coast Crop Tank",
    price: 30,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/07/amalfi.png",
    blurb: "An illustrated Amalfi Coast landscape framed by lemon branches.",
  },
  {
    slug: "lucky-charm-tank",
    name: "Lucky Charm Tank",
    price: 30,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/07/beetle.png",
    blurb: "A vibrant iridescent beetle graphic on a relaxed-fit tank.",
  },
  {
    slug: "salty-lemons-tank",
    name: "Salty Lemons Tank",
    price: 30,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/02/Screenshot-2026-03-19-112035.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "salty-skins-mineral-wash-t-shirt",
    name: "Salty Skins Mineral Wash T-Shirt",
    price: 45,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/02/Screenshot-2026-03-19-112121.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "salty-skins-retro-sweatshirt",
    name: "Salty Vintage Wave Rider Sweater",
    price: 70,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/02/Screenshot-2026-03-19-112419.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "the-storm-within-t-shirt",
    name: "The Storm Within T-Shirt",
    price: 45,
    image: "https://ssyogaretreats.com/wp-content/uploads/2026/07/ss-black.png",
    blurb: "Yoga beyond the mat — remaining centered while life moves around you.",
  },
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
          <div key={p.slug} className="text-center">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-sm">{p.name}</h3>
            <p className="mt-1 text-sm text-ink/70">${p.price.toFixed(2)}</p>
            {p.sizes && (
              <p className="mt-1 text-xs text-ink/50">
                Sizes: {p.sizes.join(" / ")}
              </p>
            )}
            <button
              disabled
              className="btn-outline mt-3 w-full cursor-not-allowed opacity-50"
            >
              {p.sizes ? "Select options" : "Add to cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
