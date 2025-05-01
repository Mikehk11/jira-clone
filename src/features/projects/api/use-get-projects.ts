import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../server/route";

export const useGetProjects = (workspaceId: string) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => getProjects(workspaceId),
  });
};