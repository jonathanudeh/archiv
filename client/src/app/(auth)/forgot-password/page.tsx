"use client";

import ForgotPasswordForm from "@/src/features/auth/components/ForgotePassword";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pt-10">
      <h1 className="mb-2 text-3xl font-bold text-[#172033]">
        Forgot Password?
      </h1>

      <p className="mb-8 text-slate-500">
        Enter your email address and we&apos;ll send you a password reset link.
      </p>

      <ForgotPasswordForm />
    </main>
  );
}
