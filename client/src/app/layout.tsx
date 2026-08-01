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
const siteUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "https://archiv-academy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Archiv | Academic Resources, Notes & Past Questions",
    template: "%s | Archiv",
  },

  description:
    "Find, share, and download verified academic materials from your school.",

  applicationName: "Archiv",

  keywords: [
    "academic materials",
    "student resources",
    "lecture notes",
    "past questions",
    "course materials",
    "Nigeria",
    "universities",
    "Archiv",
    "education",
  ],

  authors: [
    {
      name: "Jonathan Udeh",
    },
  ],

  creator: "Jonathan Udeh",

  publisher: "Archiv",

  category: "Education",

  icons: {
    icon: "/archiv-logo/archivIcon.svg",
    shortcut: "/archiv-logo/archivIcon.svg",
    apple: "/archiv-logo/archivIcon.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Archiv",

    title: "Archiv",

    description:
      "Find, share, and download verified academic materials from your school.",

    images: [
      {
        url: "/og/archiv-og.png",
        width: 1200,
        height: 630,
        alt: "Archiv",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Archiv",

    description:
      "Find, share, and download verified academic materials from your school.",

    images: ["/og/archiv-og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased",
        inter.variable,
        sora.variable,
        geist.variable,
      )}
    >
      <body className="bg-background text-foreground min-h-screen font-sans">
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
