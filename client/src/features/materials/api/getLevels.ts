import API from "@/src/lib/axios";
import { Level } from "../types/upload";

export async function getLevels(departmentId: string) {
  const res = await API.get(`/departments/${departmentId}/levels`);

  return res.data.data.levels as Level[];
}
