import API from "@/src/lib/axios";

export async function getMySavedMaterials() {
  const res = await API.get("/users/me/savedMaterials");

  return res.data.data.savedMaterials;
}
