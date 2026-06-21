import API from "@/src/lib/axios";

export const getSchoolBySlug = async (slug: string) => {
  const res = await API.get(`/schools/slug/${slug}`);
  return res.data.data.school;
};
