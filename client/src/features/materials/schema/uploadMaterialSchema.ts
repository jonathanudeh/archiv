import { z } from "zod";

export const uploadMaterialSchema = z.object({
  title: z.string().min(3, "Title is required").max(120),
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
  file: z.any(),
});

export type UploadMaterialSchema = z.infer<typeof uploadMaterialSchema>;
