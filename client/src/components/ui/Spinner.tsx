"use client";

import { motion } from "framer-motion";

const Spinner = ({ color = "#000000" }: { color?: string }) => {
  const cycle = 4.6;

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 bg-gray-50">
      <motion.svg
        viewBox="0 0 251 238"
        className="h-20 w-20 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          animate={{
            scale: [1, 1, 1, 1, 1.04, 0.985, 1, 1],
            opacity: [1, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: cycle,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.22, 0.44, 0.6, 0.67, 0.72, 0.88, 1],
          }}
        >
          {/* Bottom */}
          <motion.path
            fill={color}
            d="M75.6599 161.606L53.824 221.914C50.9913 229.738 56.7866 238 65.1072 238H173.334L148.883 169.568C147.177 164.793 142.653 161.606 137.582 161.606H75.6599Z"
            animate={{
              opacity: [0, 1, 1],
              y: [30, 0, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: cycle - 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Middle */}
          <motion.path
            fill={color}
            d="M142.425 106.606C147.496 106.606 152.019 109.794 153.725 114.569L197.828 238H184.36L158.452 165.49C155.608 157.532 148.069 152.22 139.619 152.22H79.058L95.5736 106.606H142.425Z"
            animate={{
              opacity: [0, 0, 1, 1],
              y: [40, 40, 0, 0],
            }}
            transition={{
              delay: 1.05,
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: cycle - 1.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Top */}
          <motion.path
            fill={color}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M176.678 48C181.748 48 186.272 51.187 187.979 55.9619L247.29 221.962C250.082 229.777 244.289 238 235.99 238H208.667L162.326 108.305C159.482 100.346 151.943 95.0342 143.492 95.0342H99.7627L113.927 55.915C115.647 51.1648 120.158 48.0002 125.21 48H176.678Z"
            animate={{
              opacity: [0, 0, 0, 1, 1],
              y: [55, 55, 55, 0, 0],
            }}
            transition={{
              delay: 2.1,
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: cycle - 2.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.g>
      </motion.svg>

      <motion.span
        className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase"
        animate={{
          opacity: [0, 0, 0, 1, 1, 0],
          y: [6, 6, 6, 0, 0, 0],
        }}
        transition={{
          duration: cycle,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.48, 0.58, 0.68, 0.9, 1],
        }}
      >
        just a sec
      </motion.span>
    </div>
  );
};

export default Spinner;
