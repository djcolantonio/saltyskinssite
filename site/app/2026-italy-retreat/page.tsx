import Image from "next/image";
import Link from "next/link";

const included = [
  {
    title: "Daily Yoga & Pilates",
    body: "Morning and evening sessions led by Marci, tailored for all levels. Move, breathe, and reconnect every day.",
  },
  {
    title: "Meals (Breakfast & Dinner)",
    body: "All breakfasts and dinners included, featuring fresh local Italian cuisine. Free time to explore local cafes and trattorias for lunch!",
  },
  {
    title: "Accommodation",
    body: "5 nights in a beautiful property perched above the Amalfi Coast in the stunning village of Furore.",
  },
  {
    title: "Airport Transfers",
    body: "Round-trip airport transfers included so you can arrive stress-free and focus entirely on the experience.",
  },
  {
    title: "Wine Tasting",
    body: "A curated wine tasting experience featuring the finest wines from the Campania region — la dolce vita at its best.",
  },
  {
    title: "Excursions",
    body: "Hike the legendary Path of Gods, explore local markets, and soak in the authentic Italian lifestyle together as a group.",
  },
];

const experiences = [
  {
    title: "Path of the Gods Hike",
    body: "One of Italy's most spectacular coastal trails, winding along the cliffs above the Amalfi Coast with breathtaking views of the sea.",
  },
  {
    title: "Italian Wine Tasting",
    body: "Sip your way through the finest local wines of Campania in a beautiful setting — the perfect way to unwind after a day of movement.",
  },
  {
    title: "Local Shopping & Markets",
    body: "Wander through local markets and boutiques, discover handmade ceramics, limoncello, and the charm of Amalfi Coast village life.",
  },
  {
    title: "La Dolce Vita",
    body: "Slow mornings with espresso, afternoon swims, sunset dinners by the sea — fully embracing the Italian way of living beautifully.",
  },
];

export default function ItalyRetreatPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-24 text-center text-white">
        <Image
          src="https://ssyogaretreats.com/wp-content/uploads/2026/03/Gemini_Generated_Image_w04mpw04mpw04mpw.png"
          alt="Furore, Amalfi Coast"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-sea/70" />
        <div className="relative z-10">
          <p className="label-caps mb-4">Salty Skins Retreats · Italy</p>
          <h1 className="font-serif text-4xl font-light md:text-5xl">
            Furore, Amalfi Coast
          </h1>
          <p className="mt-4 text-white/80">
            5 nights · 6 days · August 22–27, 2026
          </p>
          <p className="mt-6 inline-block border border-sand px-4 py-1 text-xs tracking-widest2 text-sand">
            SOLD OUT
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-16 text-center sm:grid-cols-5">
        <Stat label="Dates" value="Aug 22–27" />
        <Stat label="Location" value="Furore, Italy" />
        <Stat label="Duration" value="5 Nights" />
        <Stat label="Experience" value="All Levels" />
        <Stat label="Availability" value="Sold Out" />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="label-caps mb-4">About This Retreat</p>
        <h2 className="font-serif text-3xl font-light">
          Where the cliffs meet the sea
        </h2>
        <p className="mt-6 text-ink/80">
          Join Marci and Karina for an intimate 5-night, 6-day immersion along
          the breathtaking cliffs of Furore, nestled within the legendary
          beauty of the Amalfi Coast. This limited-space experience is
          thoughtfully designed to blend yoga, connection, and coastal
          serenity in one of the most beautiful places on earth.
        </p>
        <p className="mt-4 text-ink/80">
          Each day invites you to slow down and sink into movement,
          community, and discovery — flowing through intentional yoga and
          Pilates sessions, exploring hidden coastal gems, and savoring the
          effortless magic of Italy&rsquo;s most iconic coastline.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src="https://ssyogaretreats.com/wp-content/uploads/2026/03/FCAC20CE-3301-449A-9B18-A8C97C39D8F2.jpeg" alt="Amalfi Coast" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src="https://ssyogaretreats.com/wp-content/uploads/2026/03/95072428-C617-48E0-BB83-F147D0FD6C4E.jpeg" alt="Italy Retreat" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="label-caps mb-2 text-center">Everything You Need</p>
          <h2 className="text-center font-serif text-3xl font-light">
            What&rsquo;s Included
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {included.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="label-caps mb-2 text-center">Beyond the Mat</p>
        <h2 className="text-center font-serif text-3xl font-light">
          Experiences that stay with you
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {experiences.map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <span className="font-serif text-2xl text-sand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sea px-6 py-20 text-center text-white">
        <h2 className="font-serif text-3xl font-light">
          Your Italian summer awaits.
        </h2>
        <p className="mt-4 text-white/80">
          This retreat is fully booked. Join our email list to be the first
          to know about future retreats.
        </p>
        <Link href="/application" className="btn-solid mt-8">
          Get Notified of Future Retreats
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif text-lg">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest2 text-ink/50">
        {label}
      </p>
    </div>
  );
}
