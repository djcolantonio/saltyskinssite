import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-gradient-to-b from-sea to-ink text-center text-white">
        {/* TODO: replace with real hero photo from the current site */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-24">
          <p className="label-caps mb-4">Salty Skins Retreats</p>
          <h1 className="font-serif text-5xl font-light leading-tight md:text-6xl">
            Integrate, Embody
            <br />
            <span className="italic text-sand">Remember</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-white/80">
            Immersive experiences rooted in movement, ritual, and the wild
            beauty of the world.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Your email address..."
              className="flex-1 border border-white/30 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none"
            />
            <button type="submit" className="btn-solid">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="label-caps mb-4">Our Philosophy</p>
        <h2 className="font-serif text-4xl font-light">
          Not a getaway.
          <br />
          <span className="italic">A Return.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-ink/80">
          Salty Skins Retreats are curated experiences rooted in movement,
          ritual, and refined coastal living. This is where clarity deepens,
          connection strengthens, and something quietly shifts.
        </p>
        <p className="mt-2 text-ink/80">Come as you are. Leave a little more you.</p>
        <Link href="/el-salvador-recap" className="btn-outline mt-8">
          Explore Our Last Retreat
        </Link>
      </section>

      {/* Upcoming Retreats */}
      <section className="bg-white/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="label-caps mb-2 text-center">Upcoming Retreats</p>
          <h2 className="text-center font-serif text-4xl font-light">
            Where Are We Going Next?
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <RetreatCard
              eyebrow="Europe · Mediterranean"
              title="Italy"
              date="August 2026"
              status="SOLD OUT"
              href="/2026-italy-retreat"
            />
            <RetreatCard
              eyebrow="United States · Northeast"
              title="Upstate, NY"
              date="Date TBA"
              status="COMING SOON"
              href="/application"
            />
            <RetreatCard
              eyebrow="Central America · Pacific Coast"
              title="El Salvador"
              date="February 6–11, 2027"
              status="EARLY ACCESS"
              href="/application"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <Pillar
            number="01"
            title="Movement"
            body="Yoga, Pilates, dance, and free exploration — every day begins and ends in the body."
          />
          <Pillar
            number="02"
            title="Ritual"
            body="Intentional practices that ground you, open you, and bring you back to what matters."
          />
          <Pillar
            number="03"
            title="Connection"
            body="Strangers become community. Every retreat creates bonds that last beyond the mat."
          />
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-sea py-20 text-center text-white">
        <blockquote className="mx-auto max-w-2xl px-6 font-serif text-2xl font-light italic">
          &ldquo;This wasn&rsquo;t just a trip. It was the reset I didn&rsquo;t
          know I needed — and the community I didn&rsquo;t know I was
          missing.&rdquo;
        </blockquote>
        <p className="mt-4 label-caps">El Salvador Retreat, 2026</p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-serif text-3xl font-light">
          Ready to go deeper?
        </h2>
        <p className="mt-2 text-ink/80">Your next chapter starts here.</p>
        <p className="mt-4 text-ink/70">
          Limited spots available for our upcoming retreats. Apply early to
          secure your place.
        </p>
        <Link href="/application" className="btn-solid mt-8">
          View All Retreats
        </Link>
      </section>
    </>
  );
}

function RetreatCard({
  eyebrow,
  title,
  date,
  status,
  href,
}: {
  eyebrow: string;
  title: string;
  date: string;
  status: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block border border-black/10 bg-cream p-8 text-center transition-shadow hover:shadow-lg"
    >
      <p className="label-caps mb-3">{eyebrow}</p>
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-ink/70">{date}</p>
      <p className="mt-4 text-xs font-medium tracking-widest2 text-sandDark">
        {status}
      </p>
    </Link>
  );
}

function Pillar({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="font-serif text-3xl text-sand">{number}</p>
      <h3 className="mt-2 font-serif text-2xl">{title}</h3>
      <p className="mt-3 text-sm text-ink/70">{body}</p>
    </div>
  );
}
