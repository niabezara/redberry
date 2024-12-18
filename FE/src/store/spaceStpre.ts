import { create } from "zustand";

interface SpaceStore {
  From: string | "";
  To: string | "";
  setSpaceFrom: (space: string | "") => void;
  setSpaceTo: (space: string | "") => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  From: "",
  To: "",
  setSpaceFrom: (space) => set({ From: space }),
  setSpaceTo: (space) => set({ To: space }),
}));
