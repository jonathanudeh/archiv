"use client";

import { Suspense } from "react";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import Spinner from "@/src/components/ui/Spinner";
import Pagination from "@/src/components/layout/Pagination";
import MaterialCard from "@/src/features/materials/components/MaterialCard";
import { useAllMaterials } from "@/src/features/materials/hooks/useAllMaterials";
import { Material } from "@/src/features/materials/types/material";

const MaterialsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL STATE
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  // INPUT STATE
  const [input, setInput] = useState(search);

  // KEEP INPUT SYNCED WITH URL
  useEffect(() => {
    setInput(search);
  }, [search]);

  // MATERIALS
  const {
    materials,
    totalPages,
    total,
    isLoadingAllMaterials,
    errorAllMaterials,
  } = useAllMaterials({
    page,
    search,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (input.trim()) {
      params.set("search", input.trim());
    }

    router.push(`/materials?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();

    params.set("page", String(newPage));

    if (search) {
      params.set("search", search);
    }

    router.push(`/materials?${params.toString()}`);
  };

  if (isLoadingAllMaterials) {
    return <Spinner />;
  }

  if (errorAllMaterials) {
    return (
      <div className="py-20 text-center text-slate-500">
        Failed to load materials.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Browse Materials
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Discover lecture notes, past questions, assignments, projects,
              textbooks and other academic materials.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;

                  setInput(value);

                  if (!value.trim() && search) {
                    router.push("/materials?page=1");
                  }
                }}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search materials..."
                className="h-14 w-full rounded-full border border-slate-200 bg-white pr-36 pl-14 text-base shadow-sm transition outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              <button
                onClick={handleSearch}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* RESULTS HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {search ? `Search results for "${search}"` : "All Materials"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {total} {total === 1 ? "material" : "materials"} found
            </p>
          </div>
        </div>

        {/* GRID */}
        {materials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-cols-3">
              {materials.map((material: Material) => (
                <MaterialCard key={material._id} material={material} />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <h3 className="text-md font-semibold text-slate-900">
              No materials found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {search
                ? "Try searching with a different keyword."
                : "There are no materials available yet."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default function MaterialsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <MaterialsPageContent />
    </Suspense>
  );
}
