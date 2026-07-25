import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),

    passwordConfirm: z.string(),
  })
  .refine(
    (data: { password: string; passwordConfirm: string }) =>
      data.password === data.passwordConfirm,
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    },
  );

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
