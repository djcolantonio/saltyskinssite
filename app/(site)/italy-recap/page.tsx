import type { Metadata } from "next";
import ItalyJournal from "./ItalyJournal";

export const metadata: Metadata = {
  title: "Italy Retreat Recap | Salty Skins",
  description:
    "Step inside our Italy retreat: terrace yoga, the Path of the Gods hike, poolside wellness, chef-prepared food, and the people who made it unforgettable.",
  openGraph: {
    title: "A little Italy. A lot of soul. | Salty Skins",
    description:
      "A photo journal of movement, adventure, good food, and connection on the Amalfi Coast.",
    images: [
      {
        url: "https://saltyskinsyoga.com/images/italy/recap/dsc01070.jpg",
        alt: "The Salty Skins Italy retreat group",
      },
    ],
  },
};

export default function ItalyRecapPage() {
  return <ItalyJournal />;
}
