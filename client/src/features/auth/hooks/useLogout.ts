import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout as logoutApi } from "../api/logout";
import { useNotification } from "@/src/providers/NotificationProvider";

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
      // await queryClient.removeQueries({
      //   queryKey: ["me"],
      // });

      await queryClient.cancelQueries({ queryKey: ["me"] });

      queryClient.setQueryData(["me"], null);

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      success("Logged out successfully");
      router.push("/");
      router.replace("/");
      router.refresh();
    },

    onError: (err: any) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    logoutUser,
    isLoggingOut,
    logoutError,
  };
}
