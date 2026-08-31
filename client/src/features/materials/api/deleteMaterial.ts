import API from "@/src/lib/axios";

export async function deleteMaterial(materialId: string) {
  await API.delete(`/materials/${materialId}`);
}
