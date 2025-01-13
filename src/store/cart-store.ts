import { create } from "zustand";

interface CartStore {
  itemIds: Set<number>;
  setItemIds: (updateFn: (prevIds: Set<number>) => Set<number>) => void;
  resetItemIds: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  itemIds: new Set(),
  setItemIds: (updateFn) =>
    set((state) => ({
      itemIds: updateFn(new Set(state.itemIds)),
    })),
  resetItemIds: () => set({ itemIds: new Set() }),
}));

export default useCartStore;
