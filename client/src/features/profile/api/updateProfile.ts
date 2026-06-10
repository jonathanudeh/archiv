import API from "@/src/lib/axios";

export async function updateProfile(formData: FormData) {
  const res = await API.patch("/users/updateMe", formData);

  return res.data.data.user;
}
