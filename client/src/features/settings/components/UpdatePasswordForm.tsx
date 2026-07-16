"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "../schemas/updatePasswordSchema";

import { useUpdatePassword } from "../hooks/useUpdatePassword";

export default function UpdatePasswordForm() {
  const { updateUserPassword, isUpdatingPassword } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  async function onSubmit(data: UpdatePasswordSchema) {
    await updateUserPassword(data);

    reset();
  }

  return (
    <section className="rounded-2xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Password
          </label>

          <input
            type="password"
            {...register("passwordCurrent")}
            className="focus:border-primary w-full rounded-full border border-slate-200 px-4 py-3 transition outline-none"
          />

          {errors.passwordCurrent && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passwordCurrent.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">New Password</label>

          <input
            type="password"
            {...register("password")}
            className="focus:border-primary w-full rounded-full border border-slate-200 px-4 py-3 transition outline-none"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            {...register("passwordConfirm")}
            className="focus:border-primary w-full rounded-full border border-slate-200 px-4 py-3 transition outline-none"
          />

          {errors.passwordConfirm && (
            <p className="mt-1 text-sm text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isUpdatingPassword}
          className="bg-primary hover:bg-primary/90 w-full rounded-full py-3 font-medium text-white transition disabled:opacity-50"
        >
          {isUpdatingPassword ? "Updating..." : "Update Password"}
        </button>
      </form>
    </section>
  );
}
