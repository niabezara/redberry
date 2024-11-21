// stores/regionStore.ts
import { create } from "zustand";

interface RegionStore {
  selectedRegions: string[];
  toggleRegion: (regionId: string) => void;
}

export const useRegionStore = create<RegionStore>((set) => ({
  selectedRegions: [],
  toggleRegion: (regionId) =>
    set((state) => {
      if (state.selectedRegions.includes(regionId)) {
        return {
          selectedRegions: state.selectedRegions.filter(
            (id) => id !== regionId
          ),
        };
      } else {
        return { selectedRegions: [...state.selectedRegions, regionId] };
      }
    }),
}));
