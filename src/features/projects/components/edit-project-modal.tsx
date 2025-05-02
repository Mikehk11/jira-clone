"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateProjectForm } from "./create-project-form";
import { useEditProjectModal } from "../hooks/use-edit-project-modal";
import { Models } from "appwrite";

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
        <CreateProjectForm initialData={data as Models.Document} />
      </DialogContent>
    </Dialog>
  );
};