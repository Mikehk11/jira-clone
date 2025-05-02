"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export default function HomeRedirect() {
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();

  useEffect(() => {
    if (workspaces && workspaces.length > 0) {
      router.replace(`/dashboard/${workspaces[0].$id}/projects`);
    }
  }, [router, workspaces]);

  return null;
}