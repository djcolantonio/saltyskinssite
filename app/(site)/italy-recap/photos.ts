export type MomentCategory =
  "Yoga" | "Coast" | "Poolside" | "At the table" | "Together";
export type RetreatPhoto = {
  id: string;
  category: MomentCategory;
  caption: string;
};

export const photos: RetreatPhoto[] = [
  {
    id: "dsc00761",
    category: "At the table",
    caption: "A little sweetness, served with a lot of care.",
  },
  {
    id: "dsc00763",
    category: "At the table",
    caption: "A table with a view. The best seat was every seat.",
  },
  {
    id: "dsc00764",
    category: "Coast",
    caption: "Our invitation to slow down: a terrace above the blue.",
  },
  {
    id: "dsc00765",
    category: "Coast",
    caption: "Sea, sky, and a little space to breathe.",
  },
  {
    id: "dsc00768",
    category: "Coast",
    caption: "The Amalfi coastline, showing off in every direction.",
  },
  {
    id: "dsc00774",
    category: "At the table",
    caption: "Gathering around the table was a ritual of its own.",
  },
  {
    id: "dsc00780",
    category: "Poolside",
    caption: "Poolside smiles. No itinerary required.",
  },
  {
    id: "dsc00785",
    category: "Poolside",
    caption: "Good company, cool water, and nowhere else to be.",
  },
  {
    id: "dsc00791",
    category: "Yoga",
    caption: "Rolling out our mats with the coast as our backdrop.",
  },
  {
    id: "dsc00792",
    category: "Yoga",
    caption: "Moving together, one breath at a time.",
  },
  {
    id: "dsc00794",
    category: "Yoga",
    caption: "A sunlit terrace became our open-air studio.",
  },
  {
    id: "dsc00795",
    category: "Yoga",
    caption: "Finding our flow between the mountains and the sea.",
  },
  {
    id: "dsc00802",
    category: "Yoga",
    caption: "Making room for stillness, too.",
  },
  {
    id: "dsc00805",
    category: "Yoga",
    caption: "A little stretch. A little release. A whole lot of blue.",
  },
  {
    id: "dsc00839",
    category: "Coast",
    caption: "Even the quiet corners came with a sea view.",
  },
  {
    id: "dsc00840",
    category: "At the table",
    caption: "Fresh plates, shared family-style. Yes, please.",
  },
  {
    id: "dsc00871",
    category: "Coast",
    caption: "A small, feathered detour in our Italian photo diary.",
  },
  {
    id: "dsc00880",
    category: "Coast",
    caption: "Following the signs toward Fiordo di Furore.",
  },
  {
    id: "dsc00885",
    category: "Coast",
    caption: "Fiordo di Furore: a little beach with a spectacular backdrop.",
  },
  {
    id: "dsc00896",
    category: "Together",
    caption: "The conversations between the planned moments.",
  },
  {
    id: "dsc00904",
    category: "At the table",
    caption: "Our chef bringing the finishing touches to the table.",
  },
  {
    id: "dsc00912",
    category: "At the table",
    caption: "Coming together for another meal above the sea.",
  },
  {
    id: "dsc00913",
    category: "At the table",
    caption: "The kind of spread that makes you pause before the first bite.",
  },
  {
    id: "dsc00923",
    category: "At the table",
    caption: "Helping ourselves, sharing plates, making memories.",
  },
  {
    id: "dsc00925",
    category: "At the table",
    caption: "A plate worth remembering. And going back for.",
  },
  {
    id: "dsc00928",
    category: "Together",
    caption: "The smiles that happened around the table.",
  },
  {
    id: "dsc00943",
    category: "Together",
    caption: "Dinner turned into another reason to celebrate.",
  },
  {
    id: "dsc00944",
    category: "At the table",
    caption: "A moment with the chef, and appreciation for every plate.",
  },
  {
    id: "dsc00945",
    category: "At the table",
    caption: "Dessert deserved its own photo.",
  },
  {
    id: "dsc00959",
    category: "Together",
    caption: "One table. So many new connections.",
  },
  {
    id: "dsc00988",
    category: "Together",
    caption: "Taking the good company home with us.",
  },
  {
    id: "dsc01010",
    category: "Yoga",
    caption: "Time on the mat, time to come back to ourselves.",
  },
  {
    id: "dsc01012",
    category: "Yoga",
    caption: "A shared practice, with room for each person's own pace.",
  },
  {
    id: "dsc01032",
    category: "Yoga",
    caption: "Grounded feet, open space, and movement together.",
  },
  {
    id: "dsc01034",
    category: "Yoga",
    caption: "Finding a little more space in the body.",
  },
  {
    id: "dsc01046",
    category: "Yoga",
    caption: "Joy belongs in the practice, too.",
  },
  { id: "dsc01047", category: "Yoga", caption: "Stretching into the moment." },
  {
    id: "dsc01052",
    category: "Yoga",
    caption: "A pause on the mat before the next adventure.",
  },
  {
    id: "dsc01060",
    category: "At the table",
    caption: "The FOOD. A full table and plenty to fall in love with.",
  },
  {
    id: "dsc01069",
    category: "Together",
    caption: "Dressed up, catching up, soaking it all in.",
  },
  {
    id: "dsc01070",
    category: "Together",
    caption: "Our Italy crew. The people made the place even better.",
  },
];

export const photoSrc = (id: string) => `/images/italy/recap/${id}.jpg`;
