import API from "@/src/lib/axios";

export async function logout() {
  const response = await API.get("/auth/logout");

  return response.data;
}
