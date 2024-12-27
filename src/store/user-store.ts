import { create } from "zustand";

interface UserStore {
  userId: number | null;
  email: string | null;
  name: string | null;
  seller: boolean;
  picture: string | null;
  gender: string | null;
  setUserId: (id: number | null) => void;
  setName: (name: string | null) => void;
  setSeller: (value: boolean) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setEmail: (e: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  name: null,
  seller: false,
  picture: null,
  gender: null,
  email: null,
  setUserId: (id: number | null) => set({ userId: id }),
  setName: (name: string | null) => set({ name: name }),
  setSeller: (value: boolean) => set({ seller: value }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setGender: (g: string | null) => set({ gender: g }),
  setEmail: (e: string | null) => set({ email: e }),
  resetUser: () =>
    set({
      userId: null,
      name: null,
      picture: null,
      gender: null,
      email: null,
      seller: false,
    }),
}));
