"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const RESOURCE_TILES = [
  // Left Side
  {
    id: "pdf",
    icon: "/icons/file1.png",
    label: "Lecture Notes",
    target: { x: "-39vw", y: "-380%", rotate: -12, scale: 1 },
    floatDuration: 3.2,
  },
  {
    id: "grad",
    icon: "/icons/file2.png",
    label: "Past Questions",
    target: { x: "-36vw", y: "0%", rotate: -6, scale: 0.85 },
    floatDuration: 2.8,
  },
  {
    id: "doc",
    icon: "/icons/file3.png",
    label: "Textbooks",
    target: { x: "-28vw", y: "160%", rotate: 8, scale: 0.95 },
    floatDuration: 3.5,
  },

  // Right Side
  {
    id: "slides",
    icon: "/icons/file4.png",
    label: "Presentation Slides",
    target: { x: "32vw", y: "-170%", rotate: 10, scale: 1 },
    floatDuration: 3.0,
  },
  {
    id: "cloud",
    icon: "/icons/file5.png",
    label: "Cloud Sync",
    target: { x: "36vw", y: "10%", rotate: -8, scale: 0.85 },
    floatDuration: 2.7,
  },
  {
    id: "archive",
    icon: "/icons/file6.png",
    label: "Exam Archive",
    target: { x: "28vw", y: "170%", rotate: 12, scale: 0.9 },
    floatDuration: 3.4,
  },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="bg-background relative m-0 flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-4">
      {/* 1. BACKGROUND LIGHT RAYS & GLOW */}
      <div className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center overflow-hidden p-0">
        <div className="h-96 w-96 rounded-full bg-linear-to-tr from-indigo-500/10 via-sky-400/10 to-amber-300/10 blur-3xl md:h-150 md:w-150" />

        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            background: `conic-gradient(
              from 90deg at 50% 45%, 
              transparent 0deg, 
              rgba(99, 102, 241, 0.08) 30deg, 
              transparent 60deg, 
              rgba(59, 130, 246, 0.08) 120deg, 
              transparent 150deg, 
              rgba(251, 146, 60, 0.08) 210deg, 
              transparent 240deg, 
              rgba(168, 85, 247, 0.08) 300deg, 
              transparent 360deg
            )`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 md:text-6xl"
        >
          All Your Academic <br className="hidden md:inline" />
          Resources, In <span className="text-indigo-600">One Place</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 max-w-xl text-sm text-slate-600 md:text-lg"
        >
          Find, share, and download verified course materials from your school.
        </motion.p>

        {/* MASCOT & EXPLODING FLOATING FILES CONTAINER */}
        <div className="relative mt-20 flex h-80 w-full max-w-md flex-col items-center justify-center md:h-106 md:max-w-2xl">
          {/* Archimedes Mascot */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              delay: 0.2,
            }}
            className="relative z-20 h-130 w-100 md:h-166 md:w-166"
          >
            <Image
              src="/mascot.png"
              alt="Archiv Mascot"
              fill
              className="object-cover drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Animated 3D Floating File Icons */}
          {RESOURCE_TILES.map((tile) => (
            <motion.div
              key={tile.id}
              className="pointer-events-none absolute z-30 flex items-center justify-center"
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                x: tile.target.x,
                y: tile.target.y,
                rotate: tile.target.rotate,
                scale: tile.target.scale,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 12,
                delay: 0.35,
              }}
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  duration: tile.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative h-14 w-14 drop-shadow-xl md:h-20 md:w-20">
                  <Image
                    src={tile.icon}
                    alt={tile.label}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* 6. HERO SEARCH BAR */}
          <div className="absolute bottom-0 z-60 w-full max-w-2xl rounded-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative mx-auto w-full max-w-2xl"
              layoutId="global-search"
            >
              <div
                onClick={() => router.push("/search")}
                className="relative flex h-16 w-full cursor-pointer items-center rounded-full border border-slate-200 bg-white pr-2 pl-4 shadow-sm transition-all hover:border-slate-300"
              >
                <Search className="h-5 w-5 text-slate-400" />
                <span className="ml-3 text-xs text-slate-400 md:text-sm">
                  Search materials, schools...
                </span>

                <button
                  type="button"
                  className="ml-auto rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
