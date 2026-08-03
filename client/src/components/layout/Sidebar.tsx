"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/src/lib/utils";
import { sidebarItems } from "../ui/Navigations";
import { useAuth } from "@/src/providers/AuthProvider";
import { LogOut } from "lucide-react";
import { useLogout } from "@/src/features/auth/hooks/useLogout";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { logoutUser, isLoggingOut } = useLogout();

  if (!user) return null;

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <aside className="bg-light border-border hidden h-screen w-64 shrink-0 md:flex md:flex-col">
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

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-200 text-slate-950"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-slate-950",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom User Area */}

      <div className="border-border border-t p-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-full p-2 transition-colors hover:bg-slate-100 hover:text-slate-950"
        >
          <Image
            src={user.photo?.url ?? "/default.jpg"}
            alt={user.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email}
            </p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-muted-foreground mt-3 flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition-colors hover:bg-slate-100 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
