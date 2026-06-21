import { useQuery } from "@tanstack/react-query";
import { getPopularSchools } from "../apis/getPopularSchools";

export function usePopularSchools() {
  const {
    data: popularSchools,
    isPending: isLoadingPopularSchools,
    error: errorPopularSchools,
  } = useQuery({
    queryKey: ["popular-schools"],
    queryFn: () => getPopularSchools(4),
  });

  return {
    popularSchools,
    isLoadingPopularSchools,
    errorPopularSchools,
  };
}
