import { create } from "zustand";

interface PriceStore {
  priceFrom: number | "";
  priceTo: number | "";
  setPriceFrom: (price: number | "") => void;
  setPriceTo: (price: number | "") => void;
}

export const usePriceStore = create<PriceStore>((set) => ({
  priceFrom: "",
  priceTo: "",
  setPriceFrom: (price) => set({ priceFrom: price }),
  setPriceTo: (price) => set({ priceTo: price }),
}));
