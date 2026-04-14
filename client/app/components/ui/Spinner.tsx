const Spinner = ({ color = "#3b82f6" }: { color?: string }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="relative h-12 w-12">
        {/* Main Morphing Square */}
        <div
          className="animate-spin-slow h-full w-full rounded-xl shadow-lg"
          style={{
            backgroundColor: color,
            animation: "morph 3s ease-in-out infinite, spin 2s linear infinite",
          }}
        />

        {/* Inner Glass Layer */}
        <div className="absolute inset-2 animate-pulse rounded-lg bg-white/30 backdrop-blur-[2px]" />

        {/* Small "Floating" Accent Dot */}
        <div
          className="absolute -top-1 -right-1 h-3 w-3 animate-bounce rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: color }}
        />
      </div>

      <span className="animate-pulse text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
        just a sec
      </span>

      <style jsx>{`
        @keyframes morph {
          0%,
          100% {
            border-radius: 12px;
            transform: scale(1);
          }
          50% {
            border-radius: 50%;
            transform: scale(0.8);
          }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
