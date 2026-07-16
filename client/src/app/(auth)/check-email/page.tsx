"use client";

import { useResendVerification } from "@/src/features/auth/hooks/useResendVerification";
import { useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const { resendEmail, isResendingEmail } = useResendVerification();

  const email = searchParams.get("email");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Check your email</h1>

        <p className="text-muted-foreground">We sent a verification link to</p>

        <p className="mt-2 font-semibold">{email}</p>

        <p className="mt-6 text-sm">
          Click the link in the email to verify your account.
        </p>

        <button
          className="bg-primary hover:bg-primary/90 mt-5 w-full rounded-full py-3 font-medium text-white transition disabled:opacity-50"
          onClick={() => resendEmail(email!)}
        >
          {isResendingEmail ? "Resending Email" : "Resend Verification Email"}
        </button>
      </div>
    </main>
  );
}
