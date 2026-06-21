import API from "@/src/lib/axios";

export async function getDepartment(slug: string) {
  const res = await API.get(`/departments/slug/${slug}`);

  return res.data.data.department;
}
