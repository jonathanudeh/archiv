"use client";

import { Search } from "lucide-react";
import { useLevels } from "../hooks/useLevels";
import { useSemesters } from "../hooks/useSemesters";

type Props = {
  departmentId: string;
  departmentName: string;
  schoolName: string;
  levelId: string;
  semesterId: string;
  category: string;
  search: string;
  setFilters: (updates: Record<string, string>) => void;
};

export default function MaterialFilters({
  departmentId,
  departmentName,
  schoolName,
  levelId,
  semesterId,
  category,
  search,
  setFilters,
}: Props) {
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

  return (
    <div className="space-y-4">
      {/* Department */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{departmentName}</h1>

        <p className="text-sm text-slate-500">{schoolName}</p>
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
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
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
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[16px] outline-none"
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
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none disabled:opacity-50"
        >
          <option value="">Semester</option>

          {semesters.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.name}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="relative ml-auto w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setFilters({
                search: e.target.value,
                page: "1",
              })
            }
            placeholder="Search materials..."
            className="focus:border-primary w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
