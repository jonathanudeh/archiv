"use client";

import { ReactNode, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import Spinner from "../ui/Spinner";
import { useAuth } from "@/src/providers/AuthProvider";
import { canContribute } from "@/src/lib/permissions";

type Props = {
  children: ReactNode;
};

export default function ContributionGuard({ children }: Props) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const hasPermission = canContribute(user);

  useEffect(() => {
    if (loading || hasPermission) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading, hasPermission, router]);

  if (loading) {
    return <Spinner />;
  }

  if (!hasPermission) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-6">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <ShieldAlert className="h-8 w-8 text-amber-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Permission Required
          </h1>

          <p className="mt-3 text-slate-500">
            Only verified contributors and administrators can create schools and
            departments on Archiv.
          </p>

          <p className="mt-2 text-sm text-slate-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
