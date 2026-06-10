import API from "@/src/lib/axios";
import { School } from "../types/schools";

export async function getSchools(): Promise<School[]> {
  const res = await API.get("/schools");

  return res.data.data.schools;
}
