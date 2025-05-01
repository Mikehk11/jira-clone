import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../server/route";

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
};