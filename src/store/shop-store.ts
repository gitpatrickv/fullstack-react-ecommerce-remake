import { create } from "zustand";

interface ShopStore {
  storeId: number | null;
  storeName: string | null;
  storeContactNumber: string | null;
  status: string | null;
  picture: string | null;

  setStoreId: (id: number | null) => void;
  setStoreName: (name: string | null) => void;
  setStoreContactNumber: (contact: string | null) => void;
  setPicture: (picture: string | null) => void;
  setStatus: (status: string | null) => void;
  resetStore: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  storeId: null,
  storeName: null,
  storeContactNumber: null,
  picture: null,
  status: null,
  setStoreId: (id: number | null) => set({ storeId: id }),
  setStoreName: (name: string | null) => set({ storeName: name }),
  setStoreContactNumber: (contact: string | null) =>
    set({ storeContactNumber: contact }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setStatus: (status: string | null) => set({ status: status }),
  resetStore: () =>
    set({
      storeId: null,
      storeName: null,
      storeContactNumber: null,
      picture: null,
      status: null,
    }),
}));
