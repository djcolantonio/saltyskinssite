import Link from "next/link";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/el-salvador-recap", label: "El Salvador Recap" },
  { href: "/application", label: "Application" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-cream">Salty Skins</p>
            <p className="mt-3 max-w-xs text-sm text-cream/50">
              Immersive yoga and movement retreats rooted in ritual,
              connection, and the wild beauty of the world.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs tracking-widest2 uppercase text-cream/40">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sand transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs tracking-widest2 uppercase text-cream/40">
              Connect
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:ssyogaretreats@gmail.com" className="hover:text-sand transition-colors">
                  ssyogaretreats@gmail.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com/ssyogaretreats" className="hover:text-sand transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-cream/40">
              Rockville Centre, NY
              <br />
              Retreating worldwide
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-8 text-xs text-cream/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Salty Skins Retreats</p>
          <p>Designed for movement, ritual, and the wild beauty of the world.</p>
        </div>
      </div>
    </footer>
  );
}
