import API from "@/src/lib/axios";

export async function getSchools(page = 1, limit = 20, search = "") {
  const res = await API.get("/schools", {
    params: {
      page,
      limit,
      search,
      sort: "-stats.popularityScore",
    },
  });

  return res.data;
}
