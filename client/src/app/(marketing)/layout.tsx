import type { ReactNode } from "react";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/features/home/components/Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <main className="bg-background">{children}</main>

      <Footer />
    </>
  );
}
