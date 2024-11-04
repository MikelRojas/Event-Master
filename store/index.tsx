// @ts-ignore
// @ts-ignore

import { create } from 'zustand'
import {User} from "@/types/type.d";

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

