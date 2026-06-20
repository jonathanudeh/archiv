"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full bg-slate-100 p-2 disabled:opacity-20"
      >
        <ChevronLeft />
      </button>

      <span className="flex items-center px-4 text-sm font-medium">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full bg-slate-100 p-2 disabled:opacity-40"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
