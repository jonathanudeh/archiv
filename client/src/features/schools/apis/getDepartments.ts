import API from "@/src/lib/axios";
import { Department } from "../types/department";

export async function getDepartments(schoolId: string): Promise<Department[]> {
  const res = await API.get(`/departments?school=${schoolId}`);

  return res.data.data.departments;
}
