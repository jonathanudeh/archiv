export default function HeroBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Large white glow */}
        <radialGradient id="centerGlow">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="35%" stopColor="white" stopOpacity=".7" />
          <stop offset="70%" stopColor="white" stopOpacity=".15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Blur */}
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1600" height="900" fill="#fbfcf8" />

      {/* Center glow */}
      <circle cx="800" cy="420" r="320" fill="url(#centerGlow)" />

      {/* ---------- LEFT RAYS ---------- */}

      <path
        d="M800 420 L0 0 L0 900 Z"
        fill="#93C5FD"
        opacity=".12"
        filter="url(#blur)"
      />

      <path
        d="M800 420 L200 0 L420 900 Z"
        fill="#FDBA74"
        opacity=".10"
        filter="url(#blur)"
      />

      <path
        d="M800 420 L430 0 L620 900 Z"
        fill="#BFDBFE"
        opacity=".08"
        filter="url(#blur)"
      />

      {/* ---------- RIGHT RAYS ---------- */}

      <path
        d="M800 420 L980 0 L1170 900 Z"
        fill="#BFDBFE"
        opacity=".08"
        filter="url(#blur)"
      />

      <path
        d="M800 420 L1180 0 L1400 900 Z"
        fill="#FED7AA"
        opacity=".10"
        filter="url(#blur)"
      />

      <path
        d="M800 420 L1600 0 L1600 900 Z"
        fill="#A5B4FC"
        opacity=".12"
        filter="url(#blur)"
      />
    </svg>
  );
}
