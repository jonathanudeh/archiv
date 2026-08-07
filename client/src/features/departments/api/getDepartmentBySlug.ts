import API from "@/src/lib/axios";

export async function getDepartment(schoolId: string, slug: string) {
  const res = await API.get(`/schools/${schoolId}/departments/slug/${slug}`);

  return res.data.data.department;
}
