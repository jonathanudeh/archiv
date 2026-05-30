// api calls

import API from "../lib/axios";

export const getSchools = async () => {
  const res = await API.get("/schools");

  console.log(res.data.data.schools);

  return res.data.data.schools;
};

export const getSchoolBySlug = async (slug: string) => {
  const res = await API.get(`/schools/slug/${slug}`);
  return res.data.data.school;
};

export const getSchoolById = async (id: string) => {
  const res = await API.get(`/schools/${id}`);
  return res.data.data.school;
};
