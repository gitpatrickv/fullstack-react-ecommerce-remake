import { create } from "zustand";

interface UserStore {
  userId: number | null;
  email: string | null;
  name: string | null;
  picture: string | null;
  gender: string | null;
  // storeId: number | null;
  storeName: string | null;
  setUserId: (id: number | null) => void;
  setName: (name: string | null) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setEmail: (e: string | null) => void;
  // setStoreId: (id: number | null) => void;
  setStoreName: (name: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  name: null,
  picture: null,
  gender: null,
  email: null,
  // storeId: null,
  storeName: null,
  setUserId: (id: number | null) => set({ userId: id }),
  setName: (name: string | null) => set({ name: name }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setGender: (g: string | null) => set({ gender: g }),
  setEmail: (e: string | null) => set({ email: e }),
  // setStoreId: (id: number | null) => set({ storeId: id }),
  setStoreName: (name: string | null) => set({ storeName: name }),
  resetUser: () =>
    set({
      userId: null,
      name: null,
      picture: null,
      gender: null,
      email: null,
      // storeId: null,
      storeName: null,
    }),
}));
