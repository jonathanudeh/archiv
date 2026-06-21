import API from "@/src/lib/axios";
import { School } from "../types/schools";

export async function getPopularSchools(limit = 4): Promise<School[]> {
  const res = await API.get(
    `/schools?sort=-stats.popularityScore&limit=${limit}`,
  );

  return res.data.data.schools;
}
