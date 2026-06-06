"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return (
    <div className="h-full w-full bg-amber-200 text-black">Protected Page</div>
  );
}
