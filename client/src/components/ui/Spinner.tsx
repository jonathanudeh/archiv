import React from "react";

const Spinner = ({ color = "#000000" }: { color?: string }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 bg-gray-50">
      {/* SVG Logo Container */}
      <svg
        viewBox="0 0 200 200"
        className="h-20 w-20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Left-to-right clip masks for the three distinct segments */}
          <clipPath id="reveal-bottom">
            <rect
              className="reveal-rect bottom-clip"
              x="0"
              y="0"
              height="200"
              width="200"
            />
          </clipPath>
          <clipPath id="reveal-middle">
            <rect
              className="reveal-rect middle-clip"
              x="0"
              y="0"
              height="200"
              width="200"
            />
          </clipPath>
          <clipPath id="reveal-top">
            <rect
              className="reveal-rect top-clip"
              x="0"
              y="0"
              height="200"
              width="200"
            />
          </clipPath>
        </defs>

        {/* BOTTOM SEGMENT */}
        <path
          d="M 20 185 C 20 191 25 195 31 195 L 121 195 L 102 140 C 100 134 94 130 87 130 L 38 130 Z"
          fill={color}
          clipPath="url(#reveal-bottom)"
        />

        {/* MIDDLE SEGMENT */}
        <path
          d="M 37.8 123 L 90.4 125 C 34.4 125 107.4 120 103.4 129 L 134 192 L 165.2 190 L 140.4 115.5 C 138.4 100 125.1 88.5 109.3 88.5 L 41.5 88.5 L 37.8 100 Z"
          fill={color}
          clipPath="url(#reveal-middle)"
        />

        {/* TOP SEGMENT (Main diagonal slab + top peak) */}
        <path
          d="M 45.3 77.5 L 122.2 77.5 C 131.6 77.5 139.7 84 141.7 93.2 L 173.8 190 L 186.4 190 C 196.1 190 203.9 182.2 203.9 172.5 L 143.9 17.5 C 140.2 8.1 131.1 2 121 2 L 79 2 C 68.9 2 59.8 8.1 56.1 17.5 L 45.3 77.5 Z"
          fill={color}
          clipPath="url(#reveal-top)"
        />
      </svg>

      {/* Loading Text */}
      <span className="animate-pulse text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
        just a sec
      </span>

      {/* Scoped CSS Animation Logic */}
      <style jsx>{`
        /* Target the masking rectangles */
        .reveal-rect {
          transform-origin: left;
          animation: leftToRightReveal 2.2s cubic-bezier(0.25, 1, 0.5, 1)
            infinite;
          transform: scaleX(0);
        }

        /* Bottom segment starts immediately */
        .bottom-clip {
          animation-delay: 0.5s;
        }

        /* Middle segment follows */
        .middle-clip {
          animation-delay: 0.8s;
        }

        /* Top / Right major slab finishes the build */
        .top-clip {
          animation-delay: 1.2s;
        }

        @keyframes leftToRightReveal {
          0% {
            transform: scaleX(0);
          }
          40%,
          75% {
            transform: scaleX(1);
          }
          90%,
          100% {
            transform: scaleX(1);
            opacity: 0; /* Clean fade down before it loops over */
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
