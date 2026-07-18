"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="text-muted-foreground mt-6">
          Sorry, we could not find the page you are looking for. It may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-5 py-3 transition hover:opacity-90"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => history.back()}
            className="hover:bg-muted inline-flex items-center gap-2 rounded-full border px-5 py-3 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
