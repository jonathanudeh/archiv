"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, Check } from "lucide-react";

import { useDebounce } from "@/src/hooks/useDebounce";
import { MiniSpinner } from "./MiniSpinner";
import { useDepartments } from "@/src/features/departments/hooks/useDeparments";
import { Department } from "@/src/types/department";

type Props = {
  schoolId?: string;
  value?: string;
  onChange: (department: Department) => void;
};

export default function SearchableDepartmentSelect({
  schoolId,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { departments, isLoadingDepartments } = useDepartments(
    schoolId,
    1,
    20,
    debouncedSearch,
  );

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

  const selectedDepartment = departments.find(
    (department: Department) => department._id === value,
  );

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        disabled={!schoolId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-full border border-slate-300 bg-white px-4 py-3 text-left disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <span className="truncate">
          {selectedDepartment?.name ?? "Select department"}
        </span>

        <GraduationCap className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3">
              <Search className="h-4 w-4 text-slate-500" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search department..."
                className="w-full py-3 outline-none"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoadingDepartments && (
              <div className="flex justify-center py-6">
                <MiniSpinner />
              </div>
            )}

            {!isLoadingDepartments &&
              departments.map((department: Department) => (
                <button
                  key={department._id}
                  type="button"
                  onClick={() => {
                    onChange(department);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium capitalize">{department.name}</p>
                  </div>

                  {value === department._id && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </button>
              ))}

            {!isLoadingDepartments && departments.length === 0 && (
              <div className="space-y-4 p-5 text-center">
                <p className="text-sm text-slate-500">No departments found.</p>

                <Link
                  href="/contribute/department"
                  className="bg-primary inline-flex rounded-full px-4 py-2 text-sm font-medium text-white"
                >
                  Create Department
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
