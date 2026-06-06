import API from "@/src/lib/axios";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export async function signup(payload: SignupPayload) {
  const response = await API.post("/auth/signup", payload);

  return response.data;
}
