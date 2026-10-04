import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import ElSalvadorJournal from "./ElSalvadorJournal";
export const metadata: Metadata = {
  title: "El Salvador Retreat Recap | Salty Skins",
  description:
    "A photo journal of yoga, surfing, Pacific sunsets, poolside rest, shared meals, and connection at our El Salvador retreat.",
  openGraph: {
    title: "Salt in the air. Joy in the body. | Salty Skins",
    description:
      "Step inside the El Salvador retreat, one shared memory at a time.",
    images: [
      {
        url: "https://saltyskinsyoga.com/images/el-salvador/DSC00744.jpg",
        alt: "The Salty Skins El Salvador retreat group",
      },
    ],
  },
};
export default function ElSalvadorRecapPage() {
  const allPhotos = fs
    .readdirSync(path.join(process.cwd(), "public/images/el-salvador"))
    .filter((file) => /\.(jpe?g|png)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/el-salvador/${file}`);
  return <ElSalvadorJournal allPhotos={allPhotos} />;
}
