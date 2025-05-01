import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../server/route";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    updateTask: mutation.mutate,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    error: mutation.error ?? null,
  };
};