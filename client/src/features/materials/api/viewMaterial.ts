import API from "@/src/lib/axios";

export async function viewMaterial(materialId: string) {
  await API.post(`/materials/${materialId}/view`);
}
