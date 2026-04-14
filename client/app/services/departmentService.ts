// api calls

import API from "../lib/axios";

export const getDepartmentsBySchool = async (schoolId: string) => {
  const res = await API.get(`/schools/${schoolId}/departments`);
  return res.data.data.departments;
};
