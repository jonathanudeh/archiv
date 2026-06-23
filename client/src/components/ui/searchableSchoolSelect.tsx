"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Building2, Check } from "lucide-react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { MiniSpinner } from "./MiniSpinner";
import { useSchools } from "@/src/features/schools/hooks/useSchools";
import { School } from "@/src/features/schools/types/schools";

type Props = {
  value?: string;
  onChange: (school: School) => void;
};

export default function SearchableSchoolSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { schools, isLoadingAllSchools } = useSchools(1, 20, debouncedSearch);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedSchool = schools.find((school) => school._id === value);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left"
      >
        <span className="truncate">
          {selectedSchool?.name ?? "Select school"}
        </span>

        <Building2 className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search className="h-4 w-4 text-slate-500" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search school..."
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoadingAllSchools && (
              <div className="flex justify-center py-6">
                <MiniSpinner />
              </div>
            )}

            {!isLoadingAllSchools &&
              schools.map((school) => (
                <button
                  key={school._id}
                  type="button"
                  onClick={() => {
                    onChange(school);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium capitalize">{school.name}</p>

                    {school.acronym && (
                      <p className="text-xs text-slate-500 uppercase">
                        {school.acronym}
                      </p>
                    )}
                  </div>

                  {value === school._id && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </button>
              ))}

            {!isLoadingAllSchools && schools.length === 0 && (
              <div className="space-y-4 p-5 text-center">
                <p className="text-sm text-slate-500">No schools found.</p>

                <Link
                  href="/contribute/school"
                  className="bg-primary inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white"
                >
                  Create School
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
