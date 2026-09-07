import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Salty Skins Yoga — Links",
  description: "Everything Salty Skins Yoga, in one place.",
};

// This is its own root layout (separate from the main site's), on purpose:
// the links page is a link-in-bio landing page for Instagram/mobile, so it
// intentionally has no site Header or Footer around it.
export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
