import { create } from "zustand";

interface AddressStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
