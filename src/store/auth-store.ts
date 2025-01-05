import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  jwtToken: string;
  role: string;
}

interface AuthQueryStore {
  authStore: AuthStore;
  setJwtToken: (jwtToken: string) => void;
  setRole: (role: string) => void;
  logout: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAuthQueryStore = create<AuthQueryStore>()(
  persist(
    (set) => ({
      authStore: {
        jwtToken: localStorage.getItem("jwtToken") || "",
        role: localStorage.getItem("role") || "",
      },
      setJwtToken: (jwtToken) => {
        localStorage.setItem("jwtToken", jwtToken);
        set((state) => ({ authStore: { ...state.authStore, jwtToken } }));
      },
      setRole: (role) => {
        localStorage.setItem("role", role);
        set((state) => ({ authStore: { ...state.authStore, role } }));
      },

      logout: () => {
        localStorage.removeItem("jwtToken");
        set((state) => ({ authStore: { ...state.authStore, jwtToken: "" } }));
        localStorage.removeItem("role");
        set((state) => ({ authStore: { ...state.authStore, role: "" } }));
      },
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
