import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/el-salvador-recap", label: "El Salvador Recap" },
  { href: "/application", label: "Application" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
];

export default function Header() {
  return (
    <header className="w-full bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-6 py-6">
        <Link href="/" className="font-serif text-2xl leading-tight tracking-wide text-ink">
          SALTY
          <br />
          SKINS
        </Link>
        <nav className="mt-4 w-full md:mt-0 md:w-auto">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sand transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
