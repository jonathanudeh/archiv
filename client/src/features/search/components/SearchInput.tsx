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
    <div className="mx-auto mb-10 w-full max-w-4xl">
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />

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
            className="w-full rounded-2xl border border-slate-200 bg-white py-5 pr-6 pl-14 text-lg outline-none"
          />
        </div>

        <button
          onClick={handleSearch}
          className="rounded-2xl bg-slate-900 px-6 py-5 text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}
