import { useQuery } from "@tanstack/react-query";
import { getSchools } from "../apis/getSchools";

export function useSchools() {
  const {
    data: schools,
    isPending,
    error,
  } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  return {
    schools,
    isPending,
    error,
  };
}
