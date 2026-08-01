"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroBackground from "@/src/components/hero/HeroBackground";
import LightBeam from "@/src/components/hero/LightBeam";

const RESOURCE_TILES = [
  // Left Side
  {
    id: "pdf",
    icon: "/icons/file1.webp",
    label: "Lecture Notes",
    target: {
      mobile: { x: "-20vw", y: "-300%" },
      md: { x: "-280px", y: "-150%" },
      rotate: -12,
      scale: 1,
    },
    floatDuration: 4.5,
  },
  {
    id: "grad",
    icon: "/icons/file2.png",
    label: "Past Questions",
    target: {
      mobile: { x: "-36vw", y: "-150%" },
      md: { x: "-350px", y: "-40%" },
      rotate: -6,
      scale: 0.85,
    },
    floatDuration: 5.0,
  },
  {
    id: "doc",
    icon: "/icons/file3.webp",
    label: "Textbooks",
    target: {
      mobile: { x: "-35vw", y: "20%" },
      md: { x: "-270px", y: "80%" },
      rotate: 8,
      scale: 0.95,
    },
    floatDuration: 4.7,
  },

  // Right Side
  {
    id: "slides",
    icon: "/icons/file4.webp",
    label: "Presentation Slides",
    target: {
      mobile: { x: "23vw", y: "-280%" },
      md: { x: "280px", y: "-140%" },
      rotate: 10,
      scale: 1,
    },
    floatDuration: 4.6,
  },
  {
    id: "cloud",
    icon: "/icons/file5.webp",
    label: "Cloud Sync",
    target: {
      mobile: { x: "36vw", y: "-140%" },
      md: { x: "330px", y: "-30%" },
      rotate: -8,
      scale: 0.85,
    },
    floatDuration: 5.0,
  },
  {
    id: "archive",
    icon: "/icons/file6.webp",
    label: "Exam Archive",
    target: {
      mobile: { x: "38vw", y: "60%" },
      md: { x: "290px", y: "90%" },
      rotate: 12,
      scale: 0.9,
    },
    floatDuration: 4.4,
  },
];

export default function Hero() {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section className="relative m-0 flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 py-4">
      {/* 1. BACKGROUND LIGHT RAYS & GLOW */}
      <div className="pointer-events-none absolute inset-0 m-0 flex items-center justify-center overflow-hidden p-0">
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
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-1 text-3xl font-extrabold tracking-normal text-slate-900 md:text-6xl"
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
        <div className="relative mt-20 flex h-80 w-full max-w-md flex-col items-center justify-center md:mt-0 md:h-100 md:max-w-2xl">
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
            className="relative z-20 h-130 w-100 md:h-150 md:w-150"
          >
            <Image
              src="/mascot.png"
              alt="Archiv Mascot"
              fill
              sizes="(max-width: 768px) 400px, 520px"
              className="object-cover drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Animated 3D Floating File Icons */}
          {RESOURCE_TILES.map((tile) => {
            const targetX = isDesktop ? tile.target.md.x : tile.target.mobile.x;
            const targetY = isDesktop ? tile.target.md.y : tile.target.mobile.y;

            return (
              <motion.div
                key={tile.id}
                className="pointer-events-none absolute z-10 flex items-center justify-center"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
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
                  animate={{
                    y: [-2, 2, -2],
                  }}
                  transition={{
                    duration: tile.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* <LightBeam /> */}

                  <div className="relative z-10 h-17 w-17 drop-shadow-2xl md:h-24 md:w-24">
                    <Image
                      src={tile.icon}
                      alt={tile.label}
                      fill
                      sizes="(max-width:768px) 68px,120px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

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
