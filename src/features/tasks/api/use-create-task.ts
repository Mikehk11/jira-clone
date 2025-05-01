import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../server/route";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    createTask: mutation.mutate,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    error: mutation.error ?? null,
  };
};