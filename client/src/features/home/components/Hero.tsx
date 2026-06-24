"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "@/src/features/search/components/SearchModal";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Hero() {
  const router = useRouter();
  const [openSearch, setOpenSearch] = useState(false);
  console.log("Hero");

  return (
    <>
      <section className="bg-background relative flex min-h-full flex-col overflow-hidden">
        {/* CONTENT */}
        <div className="archiv-container relative z-10 flex flex-1 flex-col items-center justify-center pt-15 pb-40 text-center">
          {/* Tiny Label */}
          <div className="border-border mb-6 flex items-center gap-2 rounded-full border bg-white/60 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-muted text-xs font-medium tracking-wide uppercase">
              Academic archive platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-foreground max-w-5xl text-center text-4xl leading-[0.92] font-bold tracking-[-0.06em] md:text-7xl">
            No More
            <br />
            Last Minute PDFs
          </h1>

          {/* Description */}
          <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed md:text-xl">
            Find, share and download course materials from your school.
          </p>

          {/* SEARCH */}
          <div className="group relative mt-8 w-full max-w-3xl">
            {/* glow */}
            <div className="absolute inset-0 rounded-[28px] bg-blue-500/5 blur-2xl transition-opacity duration-500 group-focus-within:opacity-100" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-2xl shadow-slate-200/40 backdrop-blur-xl">
              {/* texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply">
                <svg width="100%" height="100%">
                  <filter id="noise">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.9"
                      numOctaves="2"
                      stitchTiles="stitch"
                    />
                  </filter>

                  <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
              </div>

              <motion.div layoutId="global-search">
                <div className="relative flex items-center border shadow-md">
                  <div className="pointer-events-none pl-6">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>

                  <button
                    onClick={() => router.push("/search")}
                    className="w-full bg-transparent py-6 pr-6 pl-4 text-left text-sm text-slate-400"
                  >
                    Search Materials, schools, department...
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="mt-8 text-sm font-medium tracking-tight text-slate-600">
            Made for students, by students.
          </p>
        </div>

        {/* BACKGROUND ATMOSPHERE */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* top blur */}
          <div className="absolute top-[-10%] left-1/2 max-h-125 w-125 -translate-x-1/2 rounded-full bg-[#172033]/10 blur-3xl" />

          {/* paper gradients */}
          <div className="absolute bottom-0 left-0 h-50 w-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1440 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="grad-left"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4e5461" />
                  <stop offset="100%" stopColor="#555b68" />
                </linearGradient>

                <linearGradient
                  id="grad-right"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7e828a" />
                  <stop offset="100%" stopColor="#6b6e75" />
                </linearGradient>
              </defs>

              <path
                d="M0 150C250 80 550 320 850 250C1150 180 1350 100 1440 140V400H0V150Z"
                fill="url(#grad-left)"
                opacity="0.95"
              />

              <path
                d="M1440 100C1150 40 850 320 550 260C250 200 100 100 0 140V400H1440V100Z"
                fill="url(#grad-right)"
                style={{ mixBlendMode: "multiply" }}
                opacity="0.75"
              />
            </svg>
          </div>

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </section>
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  );
}

export default Hero;
