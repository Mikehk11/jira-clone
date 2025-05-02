"use client";

import Link from "next/link";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useParams } from "next/navigation";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { Button } from "@/components/ui/button";
import { Models } from "appwrite";

export const Sidebar = () => {
  const { data: workspaces } = useGetWorkspaces();
  const params = useParams();
  const activeWorkspaceId = params.workspaceId;
  const { onOpen } = useCreateWorkspaceModal();

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Workspaces</h2>
        <Button
          variant="outline"
          size="icon"
          className="text-xl font-bold leading-none"
          onClick={onOpen}
        >
          +
        </Button>
      </div>

      <ul className="space-y-2">
        {workspaces?.map((workspace: Models.Document) => (
          <li key={workspace.$id}>
            <Link
              href={`/dashboard/${workspace.$id}/projects`}
              className={`block px-3 py-2 rounded ${
                workspace.$id === activeWorkspaceId
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {workspace.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};