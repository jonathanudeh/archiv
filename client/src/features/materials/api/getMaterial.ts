import API from "@/src/lib/axios";

export async function getMaterial(materialId: string) {
  const res = await API.get(`/materials/${materialId}`);

  return res.data.data.material;
}
