import { create } from "zustand";

interface UserStore {
  email: string | null;
  name: string | null;
  picture: string | null;
  gender: string | null;
  setName: (name: string | null) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setEmail: (e: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: null,
  picture: null,
  gender: null,
  email: null,
  setName: (name: string | null) => set({ name: name }),
  setPicture: (picture: string | null) => set({ picture: picture }),
  setGender: (g: string | null) => set({ gender: g }),
  setEmail: (e: string | null) => set({ email: e }),
  resetUser: () =>
    set({
      name: null,
      picture: null,
      gender: null,
      email: null,
    }),
}));
