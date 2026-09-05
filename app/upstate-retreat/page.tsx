import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export default function UpstateRetreatPage() {
  return (
    <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-ink text-center text-white">
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24">
        <p className="mb-4 text-base tracking-widest2 uppercase text-sand">
          Coming Soon
        </p>
        <h1 className="font-serif text-5xl font-light leading-tight md:text-6xl">
          Upstate, NY
          <br />
          <span className="italic text-sand">Retreat</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg font-light text-white/80">
          A new Salty Skins retreat is taking shape upstate — dates and
          details are still coming together. Be the first to know when
          registration opens.
        </p>
        <SubscribeForm />
        <p className="mt-6 text-sm text-white/60">
          Already know you want in? You can{" "}
          <Link href="/application" className="underline hover:text-sand">
            start an application
          </Link>{" "}
          now and select Upstate, NY.
        </p>
      </div>
    </section>
  );
}
