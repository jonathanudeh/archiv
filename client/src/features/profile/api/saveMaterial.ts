import API from "@/src/lib/axios";

export async function saveMaterial(materialId: string) {
  const res = await API.post(`/savedMaterials/${materialId}`);

  return res.data;
}
