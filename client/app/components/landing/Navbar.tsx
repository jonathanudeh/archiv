import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-border/70 bg-background sticky top-0 z-50 border-b backdrop-blur-xl">
      <nav className="archiv-container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex h-full w-30 items-center gap-3">
          <Image
            src="/archiv-logo/archivLogo.svg"
            alt="Archiv Logo"
            width={96}
            height={86}
            priority
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Center Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/schools"
            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
          >
            Schools
          </Link>

          <Link
            href="/discover"
            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
          >
            Discover
          </Link>

          <Link
            href="/contribute"
            className="text-muted hover:text-foreground text-sm font-medium transition-colors"
          >
            Contribute
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-3">
          <button className="text-muted hover:text-foreground rounded-full border px-4 py-2 text-sm font-medium transition-colors md:px-5">
            Login
          </button>

          <button className="bg-primary hover:bg-primary-light rounded-full border px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] md:px-5">
            Join Archiv
          </button>
        </div>
      </nav>
    </header>
  );
}
