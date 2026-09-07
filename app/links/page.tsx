import Link from "next/link";

const links = [
  {
    href: "/upstate-retreat",
    label: "Upstate Retreat",
    sub: "Coming soon · get the details",
    icon: <MountainIcon />,
  },
  {
    href: "/private-clients",
    label: "Book a Private Session",
    sub: "One-on-one yoga with Marci",
    icon: <CalendarIcon />,
  },
  {
    href: "/",
    label: "Join the Community",
    sub: "Subscribe for our next retreats",
    icon: <MailIcon />,
  },
  {
    href: "/shop",
    label: "Shop",
    sub: "Yoga essentials · curated picks",
    icon: <BagIcon />,
  },
];

export default function LinksPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 15%, rgba(201,168,118,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 80% 85%, rgba(47,74,74,0.5) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-sand/40 bg-sand/10">
          <span className="font-serif text-2xl font-light tracking-widest text-sand">
            MC
          </span>
        </div>
        <p className="label-caps mb-1 text-cream/60">Salty Skins</p>
        <h1 className="font-serif text-3xl font-light text-cream">
          <span className="italic text-sand">Marci</span> Cat
        </h1>
        <p className="mt-2 mb-8 text-xs tracking-widest2 uppercase text-cream/50">
          Yoga · Retreats · Wellness
        </p>
        <div className="mb-8 h-px w-8 bg-sand/30" />

        <div className="flex w-full flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 border border-cream/15 bg-white/[0.03] px-5 py-4 text-left transition-colors hover:border-sand/50 hover:bg-sand/10"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-sand/25 bg-sand/10 text-sand">
                {link.icon}
              </span>
              <span className="flex-1">
                <span className="block text-sm text-cream">{link.label}</span>
                <span className="mt-0.5 block text-xs text-cream/45">
                  {link.sub}
                </span>
              </span>
              <span className="text-sand/50 transition-transform group-hover:translate-x-1 group-hover:text-sand">
                &rsaquo;
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[11px] tracking-widest2 uppercase text-cream/40">
          <a href="https://saltyskinsyoga.com" className="hover:text-sand transition-colors">
            saltyskinsyoga.com
          </a>
        </p>
      </div>
    </section>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 20l6-11 4 6 2-3 6 8H3z" />
      <circle cx="17" cy="6" r="2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
