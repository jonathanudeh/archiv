"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useMaterialFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const levelId = params.get("level") ?? "";
  const semesterId = params.get("semester") ?? "";
  const category = params.get("category") ?? "";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? "1");

  const setFilters = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    router.replace(`${pathname}?${newParams.toString()}`, {
      scroll: false,
    });
  };

  return {
    levelId,
    semesterId,
    category,
    search,
    page,
    setFilters,
  };
}
