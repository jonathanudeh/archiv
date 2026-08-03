"use client";

import Image from "next/image";
import Link from "next/link";

import UserMenu from "../UserMenu";
import { Bell, Plus, Search } from "lucide-react";

export default function Topbar() {
  return (
    <>
      {/* Mobile */}
      <header className="bg-light border-border sticky top-0 z-50 flex h-20 items-center justify-between px-6 backdrop-blur-xl md:hidden">
        <Link href="/">
          <Image
            src="/archiv-logo/archivLogo.svg"
            alt="Archiv"
            width={96}
            height={40}
            priority
          />
        </Link>

        <UserMenu />
      </header>

      {/* Desktop */}
      <header className="bg-light border-border hidden h-20 items-center justify-between px-8 md:flex">
        <div className="flex w-3/3 items-center justify-center">
          <Link
            href="/search"
            className="border-border text-muted-foreground bg-background hover:border-primary flex h-11 w-full max-w-lg items-center justify-between rounded-full border px-4 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4" />

              <span>Search materials, schools...</span>
            </div>

            <kbd className="bg-light rounded-full px-2 py-1 text-xs">
              Ctrl K
            </kbd>
          </Link>
        </div>

        <div className="bg- flex w-1/3 items-center gap-4">
          <Link
            href="/upload"
            className="bg-primary hover:bg-primary-light flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition"
          >
            <Plus className="h-4 w-4" />
            Upload
          </Link>
          <button className="border-border hover:bg-muted hover:text-light flex h-11 w-11 items-center justify-center rounded-full border transition">
            <Bell className="h-5 w-5" />
          </button>
          <UserMenu />
        </div>
      </header>
    </>
  );
}
