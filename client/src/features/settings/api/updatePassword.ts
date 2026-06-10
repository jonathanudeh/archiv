import API from "@/src/lib/axios";
import { UpdatePasswordSchema } from "../schemas/updatePasswordSchema";

export async function updatePassword(data: UpdatePasswordSchema) {
  const res = await API.patch("/auth/updateMyPassword", data);

  return res.data;
}
