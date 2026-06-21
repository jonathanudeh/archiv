import { useQuery } from "@tanstack/react-query";
import { getSchoolBySlug } from "../apis/getSchoolBySlug";

export function useSchool(slug: string) {
  const {
    data: school,
    isLoading: isLoadingSchool,
    error: errorSchool,
  } = useQuery({
    queryKey: ["school", slug],
    queryFn: () => getSchoolBySlug(slug),
  });

  return { school, isLoadingSchool, errorSchool };
}
