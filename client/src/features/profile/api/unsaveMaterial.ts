import API from "@/src/lib/axios";

export async function unsaveMaterial(materialId: string) {
  await API.delete(`/savedMaterials/${materialId}`);
}
