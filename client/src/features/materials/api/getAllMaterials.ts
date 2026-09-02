import API from "@/src/lib/axios";
import { Material } from "../types/material";

type Params = {
  page?: number;
  search?: string;
  category?: string;
  level?: string;
  semester?: string;
  sort?: string;
};

export async function getAllMaterials({
  page = 1,
  search,
  category,
  level,
  semester,
  sort,
}: Params) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", "12");

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (level) {
    params.set("level", level);
  }

  if (semester) {
    params.set("semester", semester);
  }

  if (sort) {
    params.set("sort", sort);
  }

  const res = await API.get(`/materials?${params.toString()}`);

  return res.data as {
    data: {
      materials: Material[];
    };
    totalPages: number;
    page: number;
    total: number;
  };
}
