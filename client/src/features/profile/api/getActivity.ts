import API from "@/src/lib/axios";
import { ActivityResponse } from "../types/activity";

export async function getActivity(): Promise<ActivityResponse> {
  const res = await API.get("/users/me/activity");

  return res.data.data;
}
