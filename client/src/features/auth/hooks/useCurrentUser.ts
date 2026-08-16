import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/getMe";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isError: isCurrentUserError,
    error: currentUserError,
    refetch: refetchCurrentUser,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 0,
  });

  return {
    currentUser: currentUser ?? null,
    isLoadingCurrentUser,
    isCurrentUserError,
    currentUserError,
    refetchCurrentUser,
  };
}
