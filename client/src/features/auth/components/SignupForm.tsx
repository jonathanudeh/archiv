"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "../schemas/signupSchema";
import { useSignup } from "../hooks/useSignup";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signupUser, isSigningUp } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupSchema) {
    await signupUser(values);
    router.push(`/check-email?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label
          htmlFor="name"
          className="text-primary mb-2 block text-sm font-medium"
        >
          Full Name
        </label>

        <input
          id="name"
          {...register("name")}
          placeholder="John Doe"
          className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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
          placeholder="john@example.com"
          className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-primary mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Create a password"
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
          className="text-primary mb-2 block text-sm font-medium"
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
        disabled={isSigningUp}
        className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 font-medium text-white transition disabled:opacity-50"
      >
        {isSigningUp ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center text-sm">
        <span className="text-slate-500">Already have an account?</span>{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
}
