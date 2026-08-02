"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/AuthProvider";
import Spinner from "@/src/components/ui/Spinner";
import AppShell from "@/src/components/layout/AppShell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
