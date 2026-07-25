import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { useNotification } from "@/src/providers/NotificationProvider";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const {
    mutateAsync: loginUser,
    isPending: isLoggingIn,
    error: loginError,
    isSuccess: loginSuccess,
  } = useMutation({
    mutationFn: login,

    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      success(data.message);
      router.replace("/profile");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err.response?.data?.message || "Something went wrong");
    },
  });

  return {
    loginUser,
    isLoggingIn,
    loginError,
    loginSuccess,
  };
}
