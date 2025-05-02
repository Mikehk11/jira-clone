import { create } from "zustand";
import { Models } from "appwrite";

interface EditProjectModalState {
  isOpen: boolean;
  data: Models.Document | null;
  onOpen: (data: Models.Document) => void;
  onClose: () => void;
}

export const useEditProjectModal = create<EditProjectModalState>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));