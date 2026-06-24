"use client";

import { useQuery } from "@tanstack/react-query";
import { search as searchApi } from "../api/search";

export function useSearch(query: string, page: number) {
  const {
    data: search,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchApi(query, page),
    enabled: !!query,
  });

  return {
    search,
    isSearchLoading,
    searchError,
  };
}
