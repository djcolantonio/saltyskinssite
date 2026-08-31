import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden text-center text-white">
        <Image
          src="https://ssyogaretreats.com/wp-content/uploads/2026/02/kristine-zale-macro-viewpoint-EZT6qusWOBQ-unsplash-3-1024x768.jpg"
          alt="Amalfi Coast"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/60 to-ink/30" />
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
          <SubscribeForm />
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-ink/5">
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
              image="https://ssyogaretreats.com/wp-content/uploads/2026/04/upstate.jpg"
            />
            <RetreatCard
              eyebrow="Central America · Pacific Coast"
              title="El Salvador"
              date="February 6–11, 2027"
              status="EARLY ACCESS"
              href="/application"
              image="https://ssyogaretreats.com/wp-content/uploads/2026/02/el-salvador-thumbnail-cartoon.png"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-ink py-28 text-cream">
        <div className="mx-auto max-w-6xl px-6">
          <p className="label-caps mb-2 text-center">What You Receive</p>
          <h2 className="text-center font-serif text-4xl font-light">
            Everything the Retreat Gives You
          </h2>
          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            <Pillar
              number="01"
              title="Movement"
              body="Yoga, Pilates, dance, and free exploration — every day begins and ends in the body."
            />
            <Pillar
              number="02"
              title="Ritual"
              body="Intentional practices that ground you, open you, and bring you back to what matters."
              divider
            />
            <Pillar
              number="03"
              title="Connection"
              body="Strangers become community. Every retreat creates bonds that last beyond the mat."
              divider
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-sand/20 bg-sea py-20 text-center text-white">
        <blockquote className="mx-auto max-w-2xl px-6 font-serif text-2xl font-light italic">
          &ldquo;This wasn&rsquo;t just a trip. It was the reset I didn&rsquo;t
          know I needed — and the community I didn&rsquo;t know I was
          missing.&rdquo;
        </blockquote>
        <p className="mt-4 label-caps">El Salvador Retreat, 2026</p>
      </section>

      {/* CTA */}
      <section className="bg-sandLight py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
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
  number,
  title,
  body,
  divider,
}: {
  number: string;
  title: string;
  body: string;
  divider?: boolean;
}) {
  return (
    <div className={divider ? "sm:border-l sm:border-cream/15 sm:pl-10" : ""}>
      <p className="font-serif text-4xl text-sand">{number}</p>
      <h3 className="mt-3 font-serif text-2xl">{title}</h3>
      <p className="mt-3 text-sm text-cream/70">{body}</p>
    </div>
  );
}
