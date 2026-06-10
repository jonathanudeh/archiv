"use client";

import LoginForm from "@/src/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pt-10">
      <h1 className="mb-2 text-3xl font-bold text-[#172033]">Welcome Back</h1>

      <p className="mb-8 text-slate-500">Sign in to continue to Archiv.</p>

      <LoginForm />
    </main>
  );
}
