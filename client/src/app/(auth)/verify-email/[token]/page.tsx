"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useVerifyEmail } from "@/src/features/auth/hooks/useVerifyEmail";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const { verifyEmail, isVerifyingEmail } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    if (!isVerifyingEmail) {
      const timer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [router, isVerifyingEmail]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border p-8 text-center">
        {isVerifyingEmail && (
          <>
            <h1 className="text-2xl font-bold">Verifying Email...</h1>

            <p className="mt-3 text-sm text-gray-500">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {!isVerifyingEmail && (
          <>
            <h1 className="text-2xl font-bold">Email Verified 🎉</h1>

            <p className="mt-3 text-sm text-gray-500">
              Redirecting you into Archiv...
            </p>
          </>
        )}

        {!isVerifyingEmail && (
          <>
            <h1 className="text-2xl font-bold">Verification Failed</h1>

            <p className="mt-3 text-sm text-gray-500">
              This verification link is invalid or has expired.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
