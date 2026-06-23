import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z.string().min(5, "School name must be at least 5 characters").max(50),

  acronym: z.string().optional(),
  aliases: z.string().optional(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  location: z.string().max(100).optional(),
  country: z.string().max(50).optional(),
  website: z.string().url("Enter a valid website").optional().or(z.literal("")),

  contactEmail: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),

  contactPhone: z.string().optional(),
  logo: z.instanceof(File).optional(),
});

export type CreateSchoolSchema = z.infer<typeof createSchoolSchema>;
