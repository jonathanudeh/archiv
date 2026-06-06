"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  href?: string;
  className?: string;
};

export default function BackButton({ href, className = "" }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    if (href) {
      router.push(href);
      return;
    }

    router.back();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:bg-slate-50 ${className} `}
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
