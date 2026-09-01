export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  blurb?: string;
  sizes: string[];
};

const SIZES = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "clear-mind-t-shirt",
    name: "Clear Mind T-Shirt",
    price: 45,
    image: "/images/products/ssbeigefront.jpg",
    blurb: "Heavyweight vintage-washed tee with exclusive Salty Skins artwork.",
    sizes: SIZES,
  },
  {
    slug: "do-my-nipples-offend-you-crop-tank",
    name: "Do My Nipples Offend You? Crop Tank",
    price: 30,
    image: "/images/products/dmnoy.jpg",
    blurb: "A clean, everyday crop tank with a little attitude.",
    sizes: SIZES,
  },
  {
    slug: "limoncello-coast-crop-tank",
    name: "Limoncello Coast Crop Tank",
    price: 30,
    image: "/images/products/amalfi-tank.jpg",
    blurb: "An illustrated Amalfi Coast landscape framed by lemon branches.",
    sizes: SIZES,
  },
  {
    slug: "lucky-charm-tank",
    name: "Lucky Charm Tank",
    price: 30,
    image: "/images/products/beetle.jpg",
    blurb: "A vibrant iridescent beetle graphic on a relaxed-fit tank.",
    sizes: SIZES,
  },
  {
    slug: "salty-lemons-tank",
    name: "Salty Lemons Tank",
    price: 30,
    image: "/images/products/lemons.jpg",
    sizes: SIZES,
  },
  {
    slug: "salty-skins-mineral-wash-t-shirt",
    name: "Salty Skins Mineral Wash T-Shirt",
    price: 45,
    image: "/images/products/mineral-wash.jpg",
    sizes: SIZES,
  },
  {
    slug: "salty-skins-retro-sweatshirt",
    name: "Salty Vintage Wave Rider Sweater",
    price: 70,
    image: "/images/products/wave-sweater.jpg",
    sizes: SIZES,
  },
  {
    slug: "the-storm-within-t-shirt",
    name: "The Storm Within T-Shirt",
    price: 45,
    image: "/images/products/ss-black.jpg",
    blurb: "Yoga beyond the mat — remaining centered while life moves around you.",
    sizes: SIZES,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
