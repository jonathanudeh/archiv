import API from "@/src/lib/axios";

export async function getDepartmentsBySchool(
  schoolId: string,
  page = 1,
  limit = 12,
  search = "",
) {
  const res = await API.get(`/schools/${schoolId}/departments`, {
    params: {
      page,
      limit,
      search,
      sort: "-stats.popularityScore",
    },
  });

  return res.data;
}
