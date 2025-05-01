import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../server/route";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    deleteProject: mutation.mutate,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    error: mutation.error ?? null,
  };
};