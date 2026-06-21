"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import Spinner from "@/src/components/ui/Spinner";
import SchoolCard from "@/src/components/SchoolCard";
import Pagination from "@/src/components/layout/Pagination";
import { useSchools } from "@/src/features/schools/hooks/useSchools";

const SchoolsPage = () => {
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
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-slate-900">Browse Schools</h1>

          <div className="w-full md:w-96">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);

                  if (!value.trim()) {
                    router.push("/schools?page=1");
                  }
                }}
                placeholder="Search schools..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />

              <button
                onClick={handleSearch}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>

        {schools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {schools.map((school: any) => (
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

export default SchoolsPage;
