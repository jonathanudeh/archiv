import { useQuery } from "@tanstack/react-query";
import { getSchoolBySlug, getSchools } from "../services/schoolService";

export function useSchools() {
  const {
    data: schools,
    isLoading: isLoadingAllSchools,
    error: errorAllSchools,
  } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  return { schools, isLoadingAllSchools, errorAllSchools };
}

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
