import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { NotificationProvider } from "../providers/NotificationProvider";
import Notification from "../components/ui/Notification";
import Navbar from "../components/Navbar";

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
      className={`${inter.variable} ${sora.variable} antialiased`}
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
