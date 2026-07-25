import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forgotPassword";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useForgotPassword() {
  const { success, error } = useNotification();

  const {
    mutateAsync: forgotPasswordUser,
    isPending: isSendingResetEmail,
    error: forgotPasswordError,
  } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data: { message: string }) => {
      success(data.message);
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {
    forgotPasswordUser,
    isSendingResetEmail,
    forgotPasswordError,
  };
}
