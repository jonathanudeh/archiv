"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/src/lib/utils";
import { sidebarSections } from "../ui/Navigations";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-background border-border hidden w-72 shrink-0 border-r md:flex md:flex-col">
      {/* Logo */}

      <div className="border-border flex h-20 items-center border-b px-6">
        <Link href="/">
          <Image
            src="/archiv-logo/archivLogo.svg"
            alt="Archiv"
            width={96}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-8">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-wider uppercase">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                        active
                          ? "bg-slate-200 text-slate-950"
                          : "text-muted-foreground hover:bg-muted hover:text-amber-50",
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom User Area */}

      <div className="border-border border-t p-4">User</div>
    </aside>
  );
}
