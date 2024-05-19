import { create } from "zustand";

type TUseDrawer = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDrawer = create<TUseDrawer>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
