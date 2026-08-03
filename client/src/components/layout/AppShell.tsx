import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useCommandPalette } from "@/src/hooks/useCommandPalette";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  useCommandPalette();

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto md:p-8">{children}</main>
      </div>
    </div>
  );
}
