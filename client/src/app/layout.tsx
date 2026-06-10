import type { Metadata } from "next";
import { Inter, Sora, Geist } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { NotificationProvider } from "../providers/NotificationProvider";
import Notification from "../components/ui/Notification";
import Navbar from "../components/Navbar";
import { cn } from "@/src/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archiv",
  description: "Academic materials, structured properly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased",
        inter.variable,
        sora.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <QueryProvider>
          <AuthProvider>
            <NotificationProvider>
              <Notification />
              <Navbar />
              {children}
            </NotificationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
