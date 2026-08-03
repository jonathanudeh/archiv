"use client";

import { Share2 } from "lucide-react";

import { useShare } from "@/src/hooks/useShare";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({
  title,
  text,
  url,
  className,
}: ShareButtonProps) {
  const { share } = useShare();

  return (
    <button
      onClick={() => {
        console.log("share btn clicked ");
        share({
          title,
          text,
          url,
        });
      }}
      className={`border-border hover:bg-muted flex h-11 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors hover:text-slate-100 ${className}`}
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}
