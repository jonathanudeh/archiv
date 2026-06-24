"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchModal({ open, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  console.log("searchModal");

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  const submit = () => {
    const value = query.trim();

    if (!value) return;

    onClose();

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center bg-black/40 backdrop-blur-sm">
      <div className="mt-28 w-full max-w-3xl px-4">
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
          <div className="flex items-center px-6 py-5">
            <Search className="mr-4 h-5 w-5 text-slate-400" />

            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submit();
                }
              }}
              placeholder="Search schools, departments or materials..."
              className="flex-1 bg-transparent text-lg outline-none"
            />

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-t px-6 py-3 text-sm text-slate-500">
            Press Enter to search
          </div>
        </div>
      </div>
    </div>
  );
}
