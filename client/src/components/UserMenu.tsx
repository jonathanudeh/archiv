"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, LogOut, Settings, Upload, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useAuth } from "@/src/providers/AuthProvider";
import { useLogout } from "@/src/features/auth/hooks/useLogout";

export default function UserMenu() {
  const { user } = useAuth();
  const { logoutUser, isLoggingOut } = useLogout();

  if (!user) return null;

  const isAdminorContributor =
    user?.role === "admin" || user?.role === "contributor";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full transition hover:opacity-90 focus:outline-none">
          <Image
            src={user.photo?.url ?? "/default.jpg"}
            alt={user.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex w-64 flex-col gap-2 rounded-2xl p-2"
      >
        {/* User information */}
        <div className="px-2 py-3">
          <p className="text-primary font-semibold">{user.name}</p>

          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        {/* Profile - visible on mobile and desktop */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        {/* Mobile-only navigation */}
        <div className="md:hidden">
          {isAdminorContributor && (
            <DropdownMenuItem asChild>
              <Link href="/contribute/school" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Create School
              </Link>
            </DropdownMenuItem>
          )}

          {isAdminorContributor && (
            <DropdownMenuItem asChild>
              <Link href="/contribute/department" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Create Department
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Link href="/upload" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload document
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/profile/my-uploads" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              My uploads
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/profile/saved" className="cursor-pointer">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Materials
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Logout - visible on mobile and desktop */}
        <DropdownMenuItem
          onClick={() => logoutUser()}
          disabled={isLoggingOut}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />

          {isLoggingOut ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
