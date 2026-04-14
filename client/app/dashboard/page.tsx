"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

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
