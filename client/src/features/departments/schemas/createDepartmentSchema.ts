import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name cannot exceed 100 characters"),

  school: z.string().min(1, "Please select a school"),

  numberOfLevels: z
    .number()
    .min(1, "Minimum is 1 level")
    .max(8, "Maximum is 8 levels"),
});

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;
