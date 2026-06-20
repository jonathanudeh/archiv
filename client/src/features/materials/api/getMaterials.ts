import API from "@/src/lib/axios";
import { Material } from "../types/material";

type Params = {
  departmentId: string;
  levelId: string;
  semesterId: string;
  page?: number;
  search?: string;
  category?: string;
};

export async function getMaterials({
  departmentId,
  levelId,
  semesterId,
  page = 1,
  search,
  category,
}: Params) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", "6");

  if (levelId) {
    params.set("level", levelId);
  }
  if (semesterId) {
    params.set("semester", semesterId);
  }
  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }

  const res = await API.get(`departments/${departmentId}/materials?${params}`);

  return res.data as {
    data: {
      materials: Material[];
    };
    totalPages: number;
    page: number;
    total: number;
  };
}
