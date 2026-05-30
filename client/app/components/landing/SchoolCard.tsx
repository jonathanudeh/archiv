"use client";

import Image from "next/image";
import Link from "next/link";

interface School {
  _id: string;
  name: string;
  logo: string;
  slug: string;
  primaryColor?: string;
}

const SchoolCard = ({ school }: { school: School }) => {
  const filterId = `noise-${school._id}`;

  return (
    <Link
      href={`/schools/${school.slug}`}
      className="group border-border bg-surface relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
    >
      {/* TEXTURE (subtle, not dominant) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      </div>

      {/* LIGHT OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/[0.02]" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-start gap-4">
        {/* LOGO */}
        <div className="ring-border flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 transition-transform group-hover:rotate-2">
          <Image
            src={school.logo}
            alt={school.name}
            width={48}
            height={48}
            className="h-full w-full object-contain"
          />
        </div>

        {/* TEXT */}
        <div className="flex flex-col">
          <h3 className="text-foreground line-clamp-1 text-[16px] font-bold tracking-[-0.02em]">
            {school.name}
          </h3>

          <p className="text-muted text-xs font-medium tracking-wide uppercase">
            {school.slug}
          </p>

          {/* META */}
          <div className="mt-4 flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 opacity-30">
              <div className="bg-foreground h-1.5 w-1.5 rounded-[2px]" />
              <div className="bg-foreground h-1.5 w-1.5 rounded-[2px]" />
              <div className="bg-foreground h-1.5 w-1.5 rounded-[2px]" />
              <div className="bg-foreground h-1.5 w-1.5 rounded-[2px]" />
            </div>

            <span className="text-muted text-[10px] font-semibold tracking-widest uppercase">
              Academic materials
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
