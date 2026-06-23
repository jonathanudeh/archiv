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
        <div className="px-2 py-3">
          <p className="font-semibold text-[#172033]">{user.name}</p>

          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/upload" className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            My Uploads
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

        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem asChild>
          <Link href="/support" className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            Support Archiv
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

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
