import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/login";
import { useNotification } from "@/src/providers/NotificationProvider";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
// import { getMe } from "../api/getMe";

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

    onSuccess: async (data) => {
      // Populate the `me` cache immediately from login response to avoid
      // a timing race where the cookie isn't recognized by subsequent
      // requests until a hard reload. The server already returns the user
      // in `data.data.user`.
      const user = data?.data?.user ?? null;
      if (user) {
        queryClient.setQueryData(["me"], user);
      } else {
        // fallback to refetch if response doesn't include user
        await queryClient.invalidateQueries({ queryKey: ["me"] });
      }

      success(data.message ?? "Logged in successfully");
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
