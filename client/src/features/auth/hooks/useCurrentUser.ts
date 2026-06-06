import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/getMe";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false,
  });

  return { currentUser, isLoadingCurrentUser, refetchCurrentUser };
}
