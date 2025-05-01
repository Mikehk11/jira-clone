import { useQuery } from "@tanstack/react-query";
import { getTasksByProject } from "../server/route";

export const useGetTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasksByProject(projectId),
  });
};