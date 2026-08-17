import API from "@/src/lib/axios";

type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await API.post("/auth/login", payload);

  console.log("LOGIN RESPONSE:", response);
  console.log("LOGIN SET-COOKIE:", response.headers["set-cookie"]);

  return response.data;
}
