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
  // Use the primaryColor from schema, fallback to a soft ivory/gold if empty
  const brandColor = school.primaryColor || "#FDF4E3";
  const filterId = `noise-${school._id}`;

  return (
    <Link
      href={`/schools/${school.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
      style={{ backgroundColor: brandColor }}
    >
      {/* 1. The "Squeezed Paper" SVG Texture Layer */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply contrast-125">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id={filterId}>
            {/* Higher baseFrequency + numOctaves creates that crumpled 3D look */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      </div>

      {/* 2. Depth Overlay (Gradient to make the texture feel "real") */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/30" />

      {/* 3. Content Container */}
      <div className="relative z-10 flex items-start gap-4">
        {/* Logo Box */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/90 p-2 shadow-md ring-1 ring-black/5 transition-transform group-hover:rotate-3">
          <Image
            src={school.logo}
            alt={school.name}
            width={48}
            height={48}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <h3 className="line-clamp-1 text-[17px] leading-tight font-bold text-slate-900">
            {school.name}
          </h3>
          <p className="text-xs font-semibold tracking-tight text-slate-700/60 uppercase">
            ({school.slug})
          </p>

          <div className="mt-4 flex items-center gap-2">
            {/* The 4-dot Grid Icon from your image */}
            <div className="grid grid-cols-2 gap-0.5 opacity-40">
              <div className="h-1.5 w-1.5 rounded-[1px] bg-slate-900" />
              <div className="h-1.5 w-1.5 rounded-[1px] bg-slate-900" />
              <div className="h-1.5 w-1.5 rounded-[1px] bg-slate-900" />
              <div className="h-1.5 w-1.5 rounded-[1px] bg-slate-900" />
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-slate-800/70 uppercase">
              120 Materials
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
