import { create } from "zustand";

interface EditProjectModalState {
  isOpen: boolean;
  data: any | null;
  onOpen: (data: any) => void;
  onClose: () => void;
}

export const useEditProjectModal = create<EditProjectModalState>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));