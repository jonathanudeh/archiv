import API from "@/src/lib/axios";

export async function verifyEmail(token: string) {
  const response = await API.get(`/auth/verify-email/${token}`);

  return response.data;
}
