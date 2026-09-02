import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center text-white">
        <Image
          src="/hero-amalfi.jpg"
          alt="Amalfi Coast"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/30" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
          <p className="mb-4 text-base tracking-widest2 uppercase text-sand">
            Salty Skins Retreats
          </p>
          <h1 className="font-serif text-6xl font-light leading-tight md:text-7xl">
            Integrate, Embody
            <br />
            <span className="italic text-sand">Remember</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg font-light text-white/80">
            Immersive experiences rooted in movement, ritual, and the wild
            beauty of the world.
          </p>
          <SubscribeForm />
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-cream">
          <Image
            src="https://ssyogaretreats.com/wp-content/uploads/2026/03/DSC00745.jpg"
            alt="Salty Skins community"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <p className="label-caps mb-4">Our Philosophy</p>
          <h2 className="font-serif text-4xl font-light">
            Not a getaway.
            <br />
            <span className="italic">A Return.</span>
          </h2>
          <p className="mt-6 text-ink/80">
            Salty Skins Retreats are curated experiences rooted in movement,
            ritual, and refined coastal living. This is where clarity deepens,
            connection strengthens, and something quietly shifts.
          </p>
          <p className="mt-2 text-ink/80">Come as you are. Leave a little more you.</p>
          <Link href="/el-salvador-recap" className="btn-outline mt-8">
            Explore Our Last Retreat
          </Link>
        </div>
      </section>

      {/* Upcoming Retreats */}
      <section className="bg-sandLight py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="label-caps mb-2 text-center">Upcoming Retreats</p>
          <h2 className="text-center font-serif text-4xl font-light">
            Where Are We Going Next?
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <RetreatCard
              eyebrow="United States · Northeast"
              title="Upstate, NY"
              date="Date TBA"
              status="COMING SOON"
              href="/application"
              image="/retreat-upstate.jpg"
            />
            <RetreatCard
              eyebrow="Central America · Pacific Coast"
              title="El Salvador"
              date="February 6–11, 2027"
              status="EARLY ACCESS"
              href="/application"
              image="/retreat-el-salvador.jpg"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-ink py-28 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="label-caps mb-3">What You Receive</p>
            <h2 className="font-serif text-4xl font-light md:text-5xl">
              Everything the Retreat Gives You
            </h2>
            <p className="mt-5 text-cream/60">
              Three threads run through every Salty Skins retreat, woven
              together into one experience.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Pillar
              icon={<MovementIcon />}
              number="01"
              title="Movement"
              body="Yoga, Pilates, dance, and free exploration — every day begins and ends in the body."
            />
            <Pillar
              icon={<RitualIcon />}
              number="02"
              title="Ritual"
              body="Intentional practices that ground you, open you, and bring you back to what matters."
            />
            <Pillar
              icon={<ConnectionIcon />}
              number="03"
              title="Connection"
              body="Strangers become community. Every retreat creates bonds that last beyond the mat."
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-sand/20 bg-sea py-28 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-serif text-6xl leading-none text-sand/50">&ldquo;</p>
          <blockquote className="mt-2 font-serif text-3xl font-light italic leading-snug md:text-4xl">
            This wasn&rsquo;t just a trip. It was the reset I didn&rsquo;t know
            I needed — and the community I didn&rsquo;t know I was missing.
          </blockquote>
          <p className="mt-8 label-caps text-sand/90">El Salvador Retreat, 2026</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sandLight py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="label-caps mb-3">Limited Spots</p>
          <h2 className="font-serif text-4xl font-light md:text-5xl">
            Ready to go deeper?
          </h2>
          <p className="mt-4 text-lg text-ink/70">Your next chapter starts here.</p>
          <p className="mt-3 text-ink/60">
            Apply early to secure your place on our upcoming retreats.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/application" className="btn-solid">
              View All Retreats
            </Link>
            <Link href="/contact" className="btn-outline">
              Ask a Question
            </Link>
          </div>
        </div>
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
  image,
}: {
  eyebrow: string;
  title: string;
  date: string;
  status: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="block overflow-hidden border border-black/10 bg-cream text-center transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-8">
        <p className="label-caps mb-3">{eyebrow}</p>
        <h3 className="font-serif text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-ink/70">{date}</p>
        <p className="mt-4 text-xs font-medium tracking-widest2 text-sandDark">
          {status}
        </p>
      </div>
    </Link>
  );
}

function Pillar({
  icon,
  number,
  title,
  body,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-cream/10 bg-white/[0.03] p-10 text-center transition-colors hover:border-sand/40">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sand/40 text-sand">
        {icon}
      </div>
      <p className="mt-6 text-xs tracking-widest2 text-sand">{number}</p>
      <h3 className="mt-2 font-serif text-2xl">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-cream/65">{body}</p>
    </div>
  );
}

function MovementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 13c2.5-5 5-5 7 0s4.5 5 7 0 3-3 4-3" />
    </svg>
  );
}

function RitualIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 3c1.6 2.4-0.8 3.4-0.8 5.4a2.8 2.8 0 0 0 5.6 0c0-0.9-0.4-1.7-0.8-2.4 1.3 1.3 2.2 3.1 2.2 5.2a6.2 6.2 0 1 1-12.4 0c0-2.7 1.3-4.6 2.7-5.9C9.6 4.6 10.7 3.9 12 3z" />
    </svg>
  );
}

function ConnectionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  );
}
