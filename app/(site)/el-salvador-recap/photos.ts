export type MomentCategory =
  "Yoga" | "Surf" | "Slow moments" | "Coast" | "At the table" | "Together";
export type RetreatPhoto = {
  id: string;
  category: MomentCategory;
  caption: string;
};
export const photos: RetreatPhoto[] = [
  {
    id: "DSC00083",
    category: "Together",
    caption: "Arriving with a smile and a little room for something new.",
  },
  {
    id: "DSC00089",
    category: "Together",
    caption: "The first of many moments together.",
  },
  {
    id: "DSC00096",
    category: "Together",
    caption: "A little welcome to the Salty Skins experience.",
  },
  {
    id: "DSC00097",
    category: "At the table",
    caption: "Fresh drinks, good conversation, and the start of the story.",
  },
  {
    id: "DSC00099",
    category: "At the table",
    caption: "Gathering around the table, getting to know each other.",
  },
  {
    id: "DSC00112",
    category: "Slow moments",
    caption: "A hammock waiting for a slower moment.",
  },
  {
    id: "DSC00118",
    category: "Slow moments",
    caption: "Poolside conversations, with nowhere else to rush to.",
  },
  {
    id: "DSC00124",
    category: "Slow moments",
    caption: "A little water, a little shade, a little time for ourselves.",
  },
  {
    id: "DSC00128",
    category: "Slow moments",
    caption: "Rest was part of the retreat, too.",
  },
  {
    id: "DSC00140-rotated",
    category: "Slow moments",
    caption: "The hammock had the right idea.",
  },
  {
    id: "DSC00155",
    category: "Coast",
    caption: "Where the river meets the sea, and the day opens up.",
  },
  {
    id: "DSC00163",
    category: "Coast",
    caption: "Following the shoreline, one unhurried step at a time.",
  },
  {
    id: "DSC00173",
    category: "Coast",
    caption: "The Pacific coastline, setting the scene.",
  },
  {
    id: "DSC00202",
    category: "Coast",
    caption: "A beach break worth saving to the camera roll.",
  },
  {
    id: "DSC00216",
    category: "At the table",
    caption: "Another meal, another chance to connect.",
  },
  {
    id: "DSC00231",
    category: "Slow moments",
    caption: "The poolside conversations continued after dark.",
  },
  {
    id: "DSC00292",
    category: "Yoga",
    caption: "Opening up on the mat, one breath at a time.",
  },
  {
    id: "DSC00295",
    category: "Yoga",
    caption: "Our studio, our mats, and space to move together.",
  },
  {
    id: "DSC00296",
    category: "Yoga",
    caption: "A shared practice with room for everyone's own pace.",
  },
  {
    id: "DSC00300",
    category: "Yoga",
    caption: "A pause on the mat, with a smile along the way.",
  },
  {
    id: "DSC00306",
    category: "Yoga",
    caption: "Finding strength in the practice, together.",
  },
  {
    id: "DSC00309",
    category: "At the table",
    caption: "The in-between moments often happened around a table.",
  },
  {
    id: "DSC00345-rotated",
    category: "Coast",
    caption: "A sunset that made us stop and look.",
  },
  {
    id: "DSC00359",
    category: "At the table",
    caption: "A colorful little toast to being here.",
  },
  {
    id: "DSC00367",
    category: "Together",
    caption: "One table, plenty of laughter.",
  },
  {
    id: "DSC00368",
    category: "Together",
    caption: "Good company made the evening even better.",
  },
  {
    id: "DSC00444",
    category: "At the table",
    caption: "Fresh fruit and a little tropical color.",
  },
  {
    id: "DSC00452",
    category: "Slow moments",
    caption: "A quiet pool tucked into the greenery.",
  },
  {
    id: "DSC00461",
    category: "Coast",
    caption: "Walking the beach, soaking in the coast.",
  },
  {
    id: "DSC00466",
    category: "Coast",
    caption: "Taking a moment together with the ocean in front of us.",
  },
  {
    id: "DSC00483",
    category: "Coast",
    caption: "Some memories look just as good in black and white.",
  },
  {
    id: "DSC00535-rotated",
    category: "Together",
    caption: "The kind of connection that stays with you.",
  },
  {
    id: "DSC00552",
    category: "Yoga",
    caption: "A little movement to bring us back into the body.",
  },
  {
    id: "DSC00555",
    category: "Yoga",
    caption: "Making space for a new perspective.",
  },
  {
    id: "DSC00567",
    category: "Yoga",
    caption: "There was plenty of joy in the practice.",
  },
  {
    id: "DSC00603",
    category: "At the table",
    caption: "A coconut break. Simple pleasures, Salvadoran style.",
  },
  { id: "DSC00627", category: "Surf", caption: "Boards ready, ocean waiting." },
  {
    id: "DSC00631",
    category: "Surf",
    caption: "Starting on the sand before heading into the waves.",
  },
  {
    id: "DSC00633",
    category: "Surf",
    caption: "Finding our feet, one board at a time.",
  },
  {
    id: "DSC00638",
    category: "Surf",
    caption: "Taking the practice from the beach into the water.",
  },
  {
    id: "DSC00640",
    category: "Surf",
    caption: "Out into the Pacific, together.",
  },
  {
    id: "DSC00649-rotated",
    category: "Surf",
    caption: "A little courage, a little balance, a whole lot of ocean.",
  },
  {
    id: "DSC00692-rotated",
    category: "Together",
    caption: "Movement found its way onto the dance floor, too.",
  },
  {
    id: "DSC00718-rotated",
    category: "Together",
    caption: "Letting loose, sharing laughs, and enjoying the moment.",
  },
  {
    id: "DSC00744",
    category: "Together",
    caption: "Our El Salvador crew. The people made the retreat.",
  },
  {
    id: "DSC00749",
    category: "At the table",
    caption: "A shared meal to remember the moments together.",
  },
];
export const photoSrc = (id: string) => `/images/el-salvador/${id}.jpg`;
