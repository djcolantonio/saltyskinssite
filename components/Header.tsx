import Link from "next/link";
import CartLink from "./CartLink";
import RecapsDropdown from "./RecapsDropdown";
import MoreDropdown from "./MoreDropdown";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const navLinksAfterRecaps = [
  { href: "/blog", label: "Blog" },
  { href: "/private-clients", label: "Private Clients" },
  { href: "/application", label: "Application" },
  { href: "/contact", label: "Contact" },
  { href: "/shop", label: "Shop" },
];

// Mobile keeps only the handful of links people actually need in a hurry —
// everything else lives one tap away in the "More" dropdown, so the mobile
// nav stays a single tidy row instead of wrapping into a messy grid.
const MOBILE_PRIMARY = [
  { href: "/", label: "Home" },
  { href: "/private-clients", label: "Private Clients" },
  { href: "/application", label: "Application" },
  { href: "/shop", label: "Shop" },
];

const MOBILE_MORE = [
  { href: "/about", label: "About" },
  { href: "/el-salvador-recap", label: "El Salvador Recap" },
  { href: "/italy-recap", label: "Italy Recap" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="w-full bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="whitespace-nowrap font-serif text-3xl leading-tight tracking-wide text-ink"
        >
          Salty Skins
        </Link>

        {/* Desktop nav — unchanged, every link inline */}
        <nav className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-base text-ink">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sand transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <RecapsDropdown />
            </li>
            {navLinksAfterRecaps.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sand transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CartLink />
            </li>
          </ul>
        </nav>

        {/* Mobile nav — a short primary row plus a "More" dropdown for the rest */}
        <nav className="mt-4 w-full md:hidden">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink">
            {MOBILE_PRIMARY.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sand transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CartLink />
            </li>
            <li>
              <MoreDropdown links={MOBILE_MORE} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
