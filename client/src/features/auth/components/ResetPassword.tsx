"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/resetPassword";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { resetPasswordUser, isResettingPassword } = useResetPassword(token);

  async function onSubmit(values: ResetPasswordSchema) {
    await resetPasswordUser(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[#172033]"
        >
          New Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter new password"
            className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:ring-2"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="passwordConfirm"
          className="mb-2 block text-sm font-medium text-[#172033]"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            id="passwordConfirm"
            type={showConfirmPassword ? "text" : "password"}
            {...register("passwordConfirm")}
            placeholder="Confirm password"
            className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:ring-2"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isResettingPassword}
        className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 font-medium text-white transition disabled:opacity-50"
      >
        {isResettingPassword ? "Resetting..." : "Reset Password"}
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
