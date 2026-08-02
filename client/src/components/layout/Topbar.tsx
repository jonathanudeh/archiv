"use client";

import { Bell } from "lucide-react";

import UserMenu from "../UserMenu";
// import SearchInput from "@/src/features/search/components/SearchInput";

export default function Topbar() {
  return (
    <header className="bg-background border-border flex h-20 items-center justify-between px-20">
      {/* Search */}

      <div className="flex-1">
        {/* <SearchInput /> */}
        Search
      </div>

      {/* Actions */}

      <div className="flex items-center gap-4">
        <button>Upload</button>

        <button>
          <Bell />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
