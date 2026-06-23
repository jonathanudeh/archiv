import API from "@/src/lib/axios";
import { CreateDepartmentInput } from "../types/createDepartment";

export async function createDepartment(data: CreateDepartmentInput) {
  const res = await API.post("/departments", data);

  return res.data.data.department;
}
