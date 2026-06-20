// features/profile/api/getMyMaterials.ts

import API from "@/src/lib/axios";
import { Material } from "@/src/features/materials/types/material";

export async function getMyMaterials() {
  const res = await API.get("/users/me/materials");

  return res.data.data.materials as Material[];
}
