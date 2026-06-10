import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),

  bio: z.string().max(300).optional(),

  school: z.string().optional(),

  department: z.string().optional(),

  photo: z.any().optional(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
