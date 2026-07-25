"use client";

import { Suspense } from "react";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import Spinner from "@/src/components/ui/Spinner";
import SchoolCard from "@/src/components/SchoolCard";
import Pagination from "@/src/components/layout/Pagination";
import { useSchools } from "@/src/features/schools/hooks/useSchools";
import { School } from "@/src/features/schools/types/schools";

const SchoolsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read values from URL
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  // Input is separate from actual search
  const [input, setInput] = useState(search);

  // Keep input synced with URL
  useEffect(() => {
    setInput(search);
  }, [search]);

  const { schools, totalPages, isLoadingAllSchools, errorAllSchools } =
    useSchools(page, 12, search);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (input.trim()) {
      params.set("search", input.trim());
    }

    router.push(`/schools?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    if (search) {
      params.set("search", search);
    }

    router.push(`/schools?${params.toString()}`);
  };

  if (isLoadingAllSchools) {
    return <Spinner />;
  }

  if (errorAllSchools) {
    return <div className="py-20 text-center">Failed to load schools.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        <div className="mb-12 flex w-full flex-col justify-between gap-6 md:flex-row">
          <h1 className="text-3xl font-bold text-slate-900">Browse Schools</h1>

          <div className="mx-auto mb-5 w-3/6 max-w-5xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setInput(value);

                  if (!value.trim()) {
                    router.push("/schools?page=1");
                  }
                }}
                placeholder="Search schools..."
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="h-13 w-full rounded-full border border-slate-200 bg-white pr-36 pl-14 text-lg shadow-sm transition outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                onClick={handleSearch}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {schools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((school: School) => (
                <SchoolCard key={school._id} school={school} />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="py-20 text-center text-slate-500">
            No schools found.
          </div>
        )}
      </main>
    </div>
  );
};

export default function SchoolsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SchoolsPageContent />
    </Suspense>
  );
}
