import API from "@/src/lib/axios";

export async function getMe() {
  const response = await API.get("/users/me");

  return response.data.data.user;
}
