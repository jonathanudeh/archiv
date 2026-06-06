import API from "@/src/lib/axios";

export async function forgotPassword(email: string) {
  const response = await API.post("/auth/forgotPassword", {
    email,
  });

  return response.data;
}
