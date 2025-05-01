import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../server/route";
import { z } from "zod";
import { updateProjectSchema } from "../schemas";

type InputType = z.infer<typeof updateProjectSchema>;

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: InputType) => updateProject(values),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    updateProject: mutation.mutate,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    error: mutation.error ?? null,
  };
};