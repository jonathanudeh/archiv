"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/src/providers/NotificationProvider";
import { createSchool } from "../apis/createSchool";
import { AxiosError } from "axios";

export function useCreateSchool() {
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSchool,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
      success("School created successfully.");
    },

    onError(err: AxiosError<{ message: string }>) {
      error(err?.response?.data?.message ?? "Failed to create school.");
    },
  });

  return {
    createSchool: mutateAsync,
    isCreatingSchool: isPending,
  };
}
