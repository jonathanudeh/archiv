import { useMutation } from "@tanstack/react-query";

import { signup } from "../api/signup";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useSignup() {
  const { success, error } = useNotification();

  const {
    mutateAsync: signupUser,
    isPending: isSigningUp,
    error: signupError,
    isSuccess: signupSuccess,
  } = useMutation({
    mutationFn: signup,
    onSuccess: (data: { message: string }) => {
      success(data.message);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      error(err.response?.data?.message || "Something went wrong");
    },
  });

  return {
    signupUser,
    isSigningUp,
    signupError,
    signupSuccess,
  };
}
