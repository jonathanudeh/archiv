import API from "@/src/lib/axios";
import { Material } from "../types/material";

export async function getPopularMaterials(limit = 5) {
  const res = await API.get(`/materials/popular?limit=${limit}`);

  return res.data as {
    status: string;
    result: number;
    data: {
      materials: Material[];
    };
  };
}
