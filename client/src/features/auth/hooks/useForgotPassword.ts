import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forgotPassword";
import { useNotification } from "@/src/providers/NotificationProvider";

export function useForgotPassword() {
  const { success, error } = useNotification();

  const {
    mutateAsync: forgotPasswordUser,
    isPending: isSendingResetEmail,
    error: forgotPasswordError,
  } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      success(data.message);
    },

    onError: (err: any) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    forgotPasswordUser,
    isSendingResetEmail,
    forgotPasswordError,
  };
}
