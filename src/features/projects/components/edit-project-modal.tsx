"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateProjectForm } from "./create-project-form";
import { useEditProjectModal } from "../hooks/use-edit-project-modal";

export const EditProjectModal = () => {
  const { isOpen, onClose, data } = useEditProjectModal();

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Project
          </DialogTitle>
        </DialogHeader>
        {/* TypeScript fix: explicitly cast `data` as any */}
        <CreateProjectForm initialData={data as any} />
      </DialogContent>
    </Dialog>
  );
};