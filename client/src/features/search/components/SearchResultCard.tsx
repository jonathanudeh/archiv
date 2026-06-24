"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SearchResult } from "../types/search";

type Props = {
  result: SearchResult;
};

export default function SearchResultCard({ result }: Props) {
  let href = "/";

  switch (result.type) {
    case "school":
      href = `/schools/${result.slug}`;
      break;

    case "department":
      href = `/schools/${result.schoolSlug}/departments/${result.slug}`;
      break;

    case "material":
      href = `/materials/${result.id}`;
      break;
  }

  return (
    <Link href={href}>
      <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
        <div className="mb-2">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium capitalize">
            {result.type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{result.title}</h3>

            {result.subtitle && (
              <p className="mt-1 text-sm text-slate-500">{result.subtitle}</p>
            )}
          </div>
          <div className="rounded-full bg-slate-100 p-2">
            <ChevronRight className="h-4 w-4 text-slate-900" />
          </div>
        </div>
      </article>
    </Link>
  );
}
