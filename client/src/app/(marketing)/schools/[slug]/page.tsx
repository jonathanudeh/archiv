"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Search, MapPin } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import Spinner from "@/src/components/ui/Spinner";
import Pagination from "@/src/components/layout/Pagination";
import DepartmentCard from "@/src/features/departments/components/DepartmentCard";
import { useSchool } from "@/src/features/schools/hooks/useSchoolSlug";
import { useDepartments } from "@/src/features/departments/hooks/useDeparments";
import { Department } from "@/src/types/department";

const SchoolPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL STATE
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [input, setInput] = useState(search);

  // keep input in sync with URL
  useEffect(() => {
    setInput(search);
  }, [search]);

  // SCHOOL
  const { school, isLoadingSchool, errorSchool } = useSchool(slug as string);

  // DEPARTMENTS
  const { departments, totalPages, isLoadingDepartments, departmentsError } =
    useDepartments(school?._id, page, 12, search);

  if (isLoadingSchool) {
    return <Spinner />;
  }

  if (errorSchool || !school) {
    return <div className="p-20 text-center">School not found.</div>;
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (input.trim()) {
      params.set("search", input.trim());
    } else {
      params.delete("search");
    }
    router.push(`/schools/${slug}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/schools/${slug}?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section
        className="relative px-6 pt-10 pb-10 md:px-12"
        style={{
          background:
            "radial-gradient(circle at top right, white, #f8fafc 70%)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl md:h-32 md:w-32">
                <Image
                  src={school.logo?.url ?? "/default-school-logo.png"}
                  alt={school.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 capitalize md:text-5xl">
                  {school.name}
                </h1>

                {school.acronym && (
                  <p className="mt-2 text-sm font-bold tracking-[0.25em] text-slate-500 uppercase">
                    {school.acronym}
                  </p>
                )}

                {(school.location?.city ||
                  school.location?.state ||
                  school.country) && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />

                    <span>
                      {[
                        school.location?.city,
                        school.location?.state,
                        school?.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          {school.description && (
            <div className="mt-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <h2 className="mb-3 text-lg font-bold text-slate-900">
                  About this school
                </h2>

                {/* WEBSITE */}
                {school.website && (
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-fit items-center rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    Visit School
                  </a>
                )}
              </div>

              <p className="leading-8 text-slate-600">{school.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Browse {school.stats.departmentsCount} Departments
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore departments and discover academic materials.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mx-auto mb-5 w-full max-w-5xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;

                  setInput(value);

                  // clear search automatically
                  if (!value.trim() && search) {
                    const params = new URLSearchParams(searchParams.toString());

                    params.delete("search");
                    params.set("page", "1");

                    router.push(`/schools/${slug}?${params.toString()}`);
                  }
                }}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search departments..."
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

        {/* GRID */}
        {isLoadingDepartments ? (
          <Spinner />
        ) : departmentsError ? (
          <div className="py-20 text-center text-slate-500">
            Failed to load departments.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {departments.map((dept: Department) => (
                <DepartmentCard
                  key={dept._id}
                  name={dept.name}
                  slug={dept.slug ?? ""}
                  schoolSlug={String(slug)}
                  materialsCount={dept.stats?.materialsCount ?? 0}
                  numberOfLevels={dept.numberOfLevels ?? 0}
                />
              ))}
            </div>

            {departments.length === 0 && (
              <div className="py-20 text-center text-slate-500">
                No departments found.
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default SchoolPage;
