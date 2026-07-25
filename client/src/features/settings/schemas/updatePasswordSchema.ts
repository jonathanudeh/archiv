import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    passwordCurrent: z.string().min(8),

    password: z.string().min(8),

    passwordConfirm: z.string().min(8),
  })
  .refine(
    (data: { password: string; passwordConfirm: string }) =>
      data.password === data.passwordConfirm,
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    },
  );

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
