import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout as logoutApi } from "../api/logout";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { success, error } = useNotification();

  const {
    mutateAsync: logoutUser,
    isPending: isLoggingOut,
    error: logoutError,
  } = useMutation({
    mutationFn: logoutApi,

    onSuccess: async () => {
      await queryClient.cancelQueries({
        queryKey: ["me"],
      });

      queryClient.setQueryData(["me"], null);

      queryClient.removeQueries({
        queryKey: ["me"],
      });

      success("Logged out successfully");

      router.refresh();
      router.replace("/");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    logoutUser,
    isLoggingOut,
    logoutError,
  };
}
