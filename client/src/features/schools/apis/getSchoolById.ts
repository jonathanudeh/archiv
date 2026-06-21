import API from "@/src/lib/axios";

export const getSchoolById = async (id: string) => {
  const res = await API.get(`/schools/${id}`);
  return res.data.data.school;
};
