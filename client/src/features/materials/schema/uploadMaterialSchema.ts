import { z } from "zod";

export const uploadMaterialSchema = z.object({
  school: z.string().min(1, "Please select a school."),
  department: z.string().min(1, "Please select a department."),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(150, "Title cannot exceed 150 characters."),
  description: z.string().max(500).optional(),
  category: z.enum([
    "material",
    "lecture note",
    "past question",
    "assignment",
    "project",
    "textbook",
    "lab report",
    "other",
  ]),

  levelId: z.string().min(1, "Select a level"),
  semester: z.string().min(1, "Select a semester"),
  file: z
    .instanceof(File, {
      message: "Please select a file.",
    })
    .refine((file) => file.size > 0, {
      message: "Please select a file.",
    }),
});

export type UploadMaterialSchema = z.infer<typeof uploadMaterialSchema>;
