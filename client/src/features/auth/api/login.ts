import API from "@/src/lib/axios";

type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await API.post("/auth/login", payload);

  return response.data;
}
