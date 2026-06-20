import API from "@/src/lib/axios";
import { Semester } from "../types/upload";

export async function getSemesters(departmentId: string, levelId: string) {
  const res = await API.get(
    `/departments/${departmentId}/levels/${levelId}/semesters`,
  );

  return res.data.data.semesters as Semester[];
}
