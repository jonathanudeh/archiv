"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../schemas/forgotPassword";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { forgotPasswordUser, isSendingResetEmail } = useForgotPassword();

  async function onSubmit(values: ForgotPasswordSchema) {
    await forgotPasswordUser(values.email);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="text-primary mb-2 block text-sm font-medium"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="focus:border-primary focus:ring-primary/20 w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:ring-2"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSendingResetEmail}
        className="bg-primary hover:bg-primary/90 w-full rounded-full py-3 font-medium text-white transition disabled:opacity-50"
      >
        {isSendingResetEmail ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="text-center text-sm">
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
