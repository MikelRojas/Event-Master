import { create } from 'zustand'
import {Supplier, SupplierStore, User} from "@/types/type.d";

export const useUserStore = create<User>((set) => ({
  email: "",
  name: "",
  password: "",
  setUser: ({ email, name, password }:{email:string, name:string, password:string}) => {
    set(() => ({
      email,
      name,
      password,
    }));
  },
}));

export const useSupplierStore = create<SupplierStore>((set, get) => ({
  suppliers: [],
  setSuppliers: (supplier) => set((state) => ({
    suppliers: [...state.suppliers, supplier],
  })),
  clearSuppliers: () => set(() => ({ suppliers: [] })),
  isSupplierInList: (supplier) => {
    const state = get();
    return state.suppliers.some(existingSupplier => existingSupplier.email === supplier.email);
  }
}));
