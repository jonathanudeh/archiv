"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginSchema) {
    await loginUser(values);
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#172033]"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            placeholder="Enter your email"
            className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:ring-2"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#172033]"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password")}
              placeholder="Enter your password"
              className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 transition outline-none focus:ring-2"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-primary text-sm font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingIn ? "Signing In..." : "Sign In"}
        </button>

        {/* Signup Link */}
        <div className="pt-2 text-center text-sm">
          <span className="text-slate-500">Don&apos;t have an account?</span>{" "}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
