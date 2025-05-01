import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../server/route";
import { z } from "zod";
import { createProjectSchema } from "../schemas";

type InputType = z.infer<typeof createProjectSchema>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: InputType) => createProject(values),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    createProject: mutation.mutate,
    isLoading: mutation.status === "pending",
    isSuccess: mutation.status === "success",
    error: mutation.error ?? null,
  };
};