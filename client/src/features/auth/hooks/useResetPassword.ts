import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resetPassword } from "../api/resetPassword";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useResetPassword(token: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const {
    mutateAsync: resetPasswordUser,
    isPending: isResettingPassword,
    error: resetPasswordError,
  } = useMutation({
    mutationFn: (data: { password: string; passwordConfirm: string }) =>
      resetPassword(token, data),

    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      success("Password reset successfully");
      router.push("/profile");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    resetPasswordUser,
    isResettingPassword,
    resetPasswordError,
  };
}
