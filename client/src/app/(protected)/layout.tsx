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
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Spinner />;
  //  {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
