"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
  const { isOpen, onClose } = useCreateWorkspaceModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Create Workspace
          </DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </Dialog>
  );
};