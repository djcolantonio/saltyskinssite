import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="label-caps text-center">Our Story</p>
      <h1 className="mt-4 text-center font-serif text-4xl font-light md:text-5xl">
        Meet Marci &amp; Karina
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-center text-ink/80">
        Two soul sisters with a shared love for movement, connection, and
        sunshine — the hearts behind every Salty Skins retreat.
      </p>

      <div className="relative mx-auto mt-12 aspect-[16/10] w-full max-w-2xl overflow-hidden">
        <Image
          src="https://ssyogaretreats.com/wp-content/uploads/2025/05/km-sitting-1.jpg"
          alt="Karina and Marci"
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-16">
        <h2 className="font-serif text-2xl">Who We Are</h2>
        <p className="mt-4 text-ink/80">
          With big smiles and even bigger hearts, Marci and Karina have come
          together to create experiences that go far beyond the mat. Their
          retreats are equal parts grounding and joyful — where downward dogs
          meet dance breaks, deep breaths meet belly laughs, and strangers
          become community. Through Yoga, Pilates, and playful exploration,
          they&rsquo;re building a space where awareness, self-love, and a
          little magic can bloom. Come as you are, and leave a little more
          you.
        </p>
      </div>

      <div className="mt-16">
        <p className="label-caps">The Team</p>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <div>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="https://ssyogaretreats.com/wp-content/uploads/2025/05/marci-red.jpg"
                alt="Marci Catala"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-xs tracking-widest2 text-sandDark">
              RETREAT HOST &amp; LEAD INSTRUCTOR
            </p>
            <h3 className="mt-2 font-serif text-2xl">Marci Catala</h3>
            <p className="mt-3 text-sm text-ink/70">
              Marci is one of Hot Yoga 4 You&rsquo;s most experienced
              teachers, bringing over 12 years of teaching across modalities
              including Hot Vinyasa, Hot Pilates, Yogalates, Yin Yoga, Sound
              Meditation, and Animal Flow. Her teaching is dynamic yet
              grounding, and her warmth creates an environment where everyone
              feels welcome and fully supported.
            </p>
          </div>
          <div>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="https://ssyogaretreats.com/wp-content/uploads/2025/05/karina-prayer.jpeg"
                alt="Karina Blackstone"
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-xs tracking-widest2 text-sandDark">
              RETREAT HOST &amp; STUDIO OWNER
            </p>
            <h3 className="mt-2 font-serif text-2xl">Karina Blackstone</h3>
            <p className="mt-3 text-sm text-ink/70">
              Karina is the owner of Hot Yoga 4 You in Rockville Centre, NY,
              always seeking new ways to inspire and uplift her community.
              Though born and raised in New York, her heart has always been
              tied to El Salvador — her parents&rsquo; homeland. Hosting a
              retreat there has been a lifelong dream fueled by her deep love
              for the country&rsquo;s incredible weather, warm hospitality,
              and grounding energy.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="font-serif text-3xl font-light">
          Ready to practice together?
        </h2>
        <p className="mt-2 text-ink/80">
          Join Karina and Marci on one of their upcoming retreats and
          experience the magic for yourself.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/2026-italy-retreat" className="btn-solid">
            View Retreats
          </Link>
          <Link href="/contact" className="btn-outline">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
