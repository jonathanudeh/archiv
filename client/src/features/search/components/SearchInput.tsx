"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
  };

  return (
    <div className="mx-auto mb-5 w-full max-w-5xl">
      <div className="relative">
        <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search schools, departments or materials..."
          className="h-16 w-full rounded-full border border-slate-200 bg-white pr-36 pl-14 text-lg shadow-sm transition outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />

        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}
