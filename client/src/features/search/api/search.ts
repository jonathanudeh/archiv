import API from "@/src/lib/axios";
import { SearchResponse } from "../types/search";

export async function search(query: string, page = 1) {
  const res = await API.get(
    `/search?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
  );

  return res.data as SearchResponse;
}
