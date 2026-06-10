"use client";

import SignupForm from "@/src/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pt-10">
      <h1 className="mb-2 text-3xl font-bold text-[#172033]">Join Archiv</h1>

      <p className="mb-8 text-slate-500">
        Create your account and start contributing.
      </p>

      <SignupForm />
    </main>
  );
}
