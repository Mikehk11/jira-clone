"use client";

import { Button } from "@/components/ui/button";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import Link from "next/link";
import { Models } from "appwrite";

export default function WorkspaceTestPage() {
  const { onOpen } = useCreateWorkspaceModal();
  const { data: workspaces, isLoading } = useGetWorkspaces();

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Workspaces</h1>
        <Button onClick={onOpen}>Create Workspace</Button>
      </div>

      <CreateWorkspaceModal />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <p>Loading...</p>}
        {workspaces?.map((workspace: Models.Document) => (
          <Link
            key={workspace.$id}
            href={`/dashboard/${workspace.$id}/projects`}
            className="border p-4 rounded shadow space-y-1 block hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">{workspace.name}</h2>
            <p className="text-xs text-muted-foreground">{workspace.imageUrl}</p>
            <p className="text-xs text-muted-foreground">
              Invite: {workspace.inviteCode}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}