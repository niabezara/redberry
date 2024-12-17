import { create } from "zustand";

type VisibilityState = {
  visibleSection: string | null; // Tracks which section is currently open
  openSection: (section: string) => void;
  closeSection: () => void;
};

export const useVisibilityStore = create<VisibilityState>((set) => ({
  visibleSection: null,
  openSection: (section) =>
    set((state) => ({
      visibleSection: state.visibleSection === section ? null : section,
    })),
  closeSection: () => set({ visibleSection: null }),
}));
