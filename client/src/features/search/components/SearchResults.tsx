"use client";

import SearchResultCard from "./SearchResultCard";
import Pagination from "@/src/components/layout/Pagination";
import { SearchResponse } from "../types/search";
import { MiniSpinner } from "@/src/components/ui/MiniSpinner";

type Props = {
  search?: SearchResponse;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export default function SearchResults({
  search,
  isLoading,
  onPageChange,
}: Props) {
  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <MiniSpinner />
      </div>
    );
  }

  if (!search?.data.results.length) {
    return (
      <div className="py-20 text-center text-slate-500">No results found.</div>
    );
  }

  console.log("SearchResults");

  return (
    <>
      <div className="mb-6 text-sm text-slate-500">
        {search.total} result{search.total !== 1 ? "s" : ""}
      </div>

      <div className="grid gap-4">
        {search.data.results.map((result) => (
          <SearchResultCard
            key={`${result.type}-${result.id}`}
            result={result}
          />
        ))}
      </div>

      <Pagination
        page={search.page}
        totalPages={search.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
