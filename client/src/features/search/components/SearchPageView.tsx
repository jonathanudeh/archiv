"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "../hooks/useSearch";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { motion } from "framer-motion";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const { search, isSearchLoading } = useSearch(query, page);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <motion.main
      layoutId="global-search"
      className="archiv-container pt-5 pb-12"
    >
      <SearchInput />

      <SearchResults
        search={search}
        isLoading={isSearchLoading}
        onPageChange={handlePageChange}
      />
    </motion.main>
  );
}

export default function SearchPageView() {
  return (
    <Suspense
      fallback={<div className="archiv-container pt-5 pb-12">Loading...</div>}
    >
      <SearchPageContent />
    </Suspense>
  );
}
