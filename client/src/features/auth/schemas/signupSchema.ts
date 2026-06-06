import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Please provide a valid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
