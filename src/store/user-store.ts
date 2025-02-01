import { create } from "zustand";

interface UserStore {
  userId: number | null;
  cartId: number | null;
  email: string | null;
  name: string | null;
  picture: string | null;
  gender: string | null;
  setUserId: (id: number | null) => void;
  setCartId: (id: number | null) => void;
  setName: (name: string | null) => void;
  setPicture: (picture: string | null) => void;
  setGender: (g: string | null) => void;
  setEmail: (e: string | null) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  cartId: null,
  name: null,
  picture: null,
  gender: null,
  email: null,
  setUserId: (id: number | null) => set({ userId: id }),
  setCartId: (id: number | null) => set({ cartId: id }),
  setName: (name: string | null) => set({ name: name }),
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
    }),
}));
