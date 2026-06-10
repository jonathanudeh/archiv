"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
import { useAuth } from "@/src/providers/AuthProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/profile");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Spinner />;

  if (!loading && isAuthenticated) {
    router.replace("/profile");
  }

  return <>{children}</>;
}
