type LightBeamProps = {
  width?: number;
  height?: number;
  color?: string;
};

export default function LightBeam({
  width = 170,
  height = 700,
  color = "rgba(255,255,255,.45)",
}: LightBeamProps) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{
        width,
        height,
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        background: `linear-gradient(
          to bottom,
          ${color} 0%,
          rgba(36, 22, 27, 0.18) 30%,
          rgba(48, 46, 153, 0.06) 65%,
          transparent 100%
        )`,
        filter: "blur(16px)",
        opacity: 0.9,
      }}
    />
  );
}
