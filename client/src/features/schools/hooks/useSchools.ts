import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../apis/getSchools";

export function useSchools(page = 1, limit = 20, search = "") {
  const {
    data,
    isPending: isLoadingAllSchools,
    error: errorAllSchools,
  } = useQuery({
    queryKey: ["schools", page, limit, search],
    queryFn: () => getSchools(page, limit, search),
  });

  return {
    schools: data?.data?.schools ?? [],
    totalPages: data?.totalPages ?? 1,
    page: data?.page ?? 1,
    total: data?.total ?? 0,
    isLoadingAllSchools,
    errorAllSchools,
  };
}
