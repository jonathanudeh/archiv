import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { resetPassword } from "../api/resetPassword";
import { useNotification } from "@/src/providers/NotificationProvider";

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

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      success("Password reset successfully");
      router.push("/profile");
    },

    onError: (err: any) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    resetPasswordUser,
    isResettingPassword,
    resetPasswordError,
  };
}
