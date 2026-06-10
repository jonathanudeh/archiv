import API from "@/src/lib/axios";

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function changePassword(payload: ChangePasswordPayload) {
  const { data } = await API.patch("/auth/updateMyPassword", payload);

  return data;
}
