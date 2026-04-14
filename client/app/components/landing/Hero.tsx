import { Search } from "lucide-react";

function Hero() {
  return (
    <section className="z-10 flex min-h-dvh flex-1 flex-col items-center justify-center bg-gray-100 px-6 pb-32 text-center">
      <h1 className="text-center text-5xl font-bold">
        No More Last Minute PDFs
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-slate-600 md:text-xl">
        Find, share, and download course materials from your School.
      </p>

      {/* Search Bar */}
      <div className="group relative w-full max-w-3xl">
        <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for school, department, or course..."
          className="w-full rounded-2xl border border-slate-100 py-5 pr-6 pl-14 text-slate-800 shadow-xl ring-1 shadow-slate-200/50 ring-blue-500/10 transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <p className="mt-12 text-sm font-medium text-slate-400">
        Made for students, by students.
      </p>

      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full md:h-[45%]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Left Blue Gradient */}
            <linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9E9FF" />
              <stop offset="100%" stopColor="#A5C8F2" />
            </linearGradient>

            {/* Right Teal Gradient */}
            <linearGradient id="grad-right" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E0F7FB" />
              <stop offset="100%" stopColor="#A0DCEB" />
            </linearGradient>
          </defs>

          {/* Left Hill: Using the higher coordinates for that desktop drama */}
          <path
            d="M0 150C250 80 550 320 850 250C1150 180 1350 100 1440 140V400H0V150Z"
            fill="url(#grad-left)"
            opacity="0.8"
          />

          {/* Right Hill: Intersecting and smooth */}
          <path
            d="M1440 100C1150 40 850 320 550 260C250 200 100 100 0 140V400H1440V100Z"
            fill="url(#grad-right)"
            style={{ mixBlendMode: "multiply" }}
            opacity="0.6"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
