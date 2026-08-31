import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-sm">
        <div className="font-serif text-xl text-cream">Salty Skins</div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li><Link href="/" className="hover:text-sand transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-sand transition-colors">About</Link></li>
          <li><Link href="/el-salvador-recap" className="hover:text-sand transition-colors">El Salvador Recap</Link></li>
          <li><Link href="/application" className="hover:text-sand transition-colors">Application</Link></li>
          <li><Link href="/contact" className="hover:text-sand transition-colors">Contact</Link></li>
          <li><Link href="/shop" className="hover:text-sand transition-colors">Shop</Link></li>
        </ul>
        <a href="https://instagram.com/ssyogaretreats" className="hover:text-sand transition-colors">
          Instagram
        </a>
        <p className="text-xs text-cream/40">
          &copy; {new Date().getFullYear()} Salty Skins Retreats
        </p>
      </div>
    </footer>
  );
}
