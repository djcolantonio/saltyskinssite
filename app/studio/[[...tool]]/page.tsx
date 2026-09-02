/**
 * This route hosts the built-in Sanity Studio authoring environment at
 * /studio, using Next.js' catch-all routes so Studio can manage its own
 * internal navigation. Studio (and its config, which itself pulls in the
 * whole "sanity" package) is fully client-side and cannot be evaluated
 * during Next's server-side build/page-data step — so this page never
 * imports it directly. Everything Studio-related lives in StudioClient,
 * loaded only via a client-only dynamic import (ssr: false).
 */
import dynamicImport from "next/dynamic";
import type { Viewport } from "next";

export const dynamic = "force-static";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000",
};

const StudioClient = dynamicImport(() => import("./StudioClient"), { ssr: false });

export default function StudioPage() {
  return <StudioClient />;
}
