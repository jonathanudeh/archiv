import API from "@/src/lib/axios";
import { ResetPasswordData } from "../types/auth";

export async function resetPassword(token: string, data: ResetPasswordData) {
  const response = await API.patch(`/auth/resetPassword/${token}`, data);

  return response.data;
}
