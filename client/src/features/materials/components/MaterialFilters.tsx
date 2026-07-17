"use client";

import { Search } from "lucide-react";
import { useLevels } from "../hooks/useLevels";
import { useSemesters } from "../hooks/useSemesters";
import { MaterialFilterProps } from "../types/material";
import { useEffect, useState } from "react";

export default function MaterialFilters({
  departmentId,
  departmentName,
  schoolName,
  levelId,
  semesterId,
  category,
  search,
  setFilters,
}: MaterialFilterProps) {
  const [input, setInput] = useState(search);

  const { levels = [] } = useLevels(departmentId);
  const { semesters = [] } = useSemesters(departmentId, levelId);

  const categories = [
    "material",
    "lecture note",
    "past question",
    "textbook",
    "assignment",
    "project",
    "lab report",
    "other",
  ];

  useEffect(() => {
    setInput(search);
  }, [search]);

  return (
    <div className="space-y-4">
      {/* Department */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 uppercase">
          {departmentName}
        </h1>

        <p className="text-lg text-slate-500 capitalize">{schoolName}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold text-slate-700">Courses</span>

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            setFilters({
              category: e.target.value,
              page: "1",
            })
          }
          className="p rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
        >
          <option value="">All</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          value={levelId}
          onChange={(e) =>
            setFilters({
              level: e.target.value,
              semester: "",
              page: "1",
            })
          }
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[16px] outline-none"
        >
          <option value="">Level</option>

          {levels.map((level) => (
            <option key={level._id} value={level._id}>
              {level.name}
            </option>
          ))}
        </select>

        {/* Semester */}
        <select
          value={semesterId}
          disabled={!levelId}
          onChange={(e) =>
            setFilters({
              semester: e.target.value,
              page: "1",
            })
          }
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none disabled:opacity-50"
        >
          <option value="">Semester</option>

          {semesters.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.name}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="mx-auto mb-5 w-full max-w-5xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={input}
              onChange={(e) => {
                const value = e.target.value;

                setInput(value);

                // If user clears the input, reset automatically
                if (!value.trim()) {
                  setFilters({
                    search: "",
                    page: "1",
                  });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFilters({
                    search: input.trim(),
                    page: "1",
                  });
                }
              }}
              placeholder="Search materials..."
              className="h-13 w-full rounded-full border border-slate-200 bg-white pr-36 pl-14 text-lg shadow-sm transition outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            <button
              onClick={() =>
                setFilters({
                  search: input.trim(),
                  page: "1",
                })
              }
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
