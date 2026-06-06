import API from "@/src/lib/axios";

export async function resendVerification(email: string) {
  const res = await API.post("/auth/resend-verification", {
    email,
  });

  return res.data;
}
