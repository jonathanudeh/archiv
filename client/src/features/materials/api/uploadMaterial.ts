import API from "@/src/lib/axios";
import { UploadMaterialInput } from "../types/upload";

export async function uploadMaterial(data: UploadMaterialInput) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description ?? "");
  formData.append("category", data.category);
  formData.append("levelId", data.levelId);
  formData.append("semester", data.semester);
  formData.append("file", data.file);

  console.time("frontend-upload");

  const res = await API.post("/materials", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress: (event) => {
      if (!event.total) return;
      const progress = Math.round((event.loaded * 100) / event.total);
      data.onProgress?.(progress);
    },
  });

  console.timeEnd("frontend-upload");

  return res.data;
}
