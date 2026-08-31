import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-ink/80">
        <div className="font-serif text-xl text-ink">SALTY SKINS</div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/el-salvador-recap">El Salvador Recap</Link></li>
          <li><Link href="/application">Application</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/shop">Shop</Link></li>
        </ul>
        <a href="https://instagram.com/ssyogaretreats" className="hover:text-sand">
          Instagram
        </a>
        <p className="text-xs text-ink/50">
          &copy; {new Date().getFullYear()} Salty Skins Retreats
        </p>
      </div>
    </footer>
  );
}
