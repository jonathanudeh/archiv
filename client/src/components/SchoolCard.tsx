"use client";

import Image from "next/image";
import Link from "next/link";
import { School } from "@/src/features/schools/types/schools";
import { BookCheck, SchoolIcon } from "lucide-react";

const SchoolCard = ({ school }: { school: School }) => {
  console.log(school.logo?.url);

  return (
    <Link
      href={`/schools/${school.slug}`}
      className="group border-border bg-surface relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
    >
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-black/2" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Logo */}
        <div className="ring-border flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm ring-1 transition-transform group-hover:rotate-2">
          <Image
            src={school.logo?.url ?? "/default-school-logo.png"}
            alt={school.name}
            width={48}
            height={48}
            className="h-full w-full rounded-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground line-clamp-1 text-[16px] font-bold tracking-[-0.02em] capitalize">
            {school.name}
          </h3>

          {school.acronym && (
            <p className="text-muted mt-1 text-xs font-medium tracking-wide uppercase">
              {school.acronym}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="flex gap-0.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <BookCheck size={15} />
              {school.stats.materialsCount} Materials
            </span>

            <span className="flex gap-0.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
              <SchoolIcon size={15} /> {school.stats.departmentsCount}{" "}
              Departments
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
