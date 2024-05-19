import { removeToken } from "@/helpers/persistaneStorage";
import { IUser } from "@/interface";
import { create } from "zustand";

type TUser = {
  user: null | IUser;
  setUser: (data: IUser) => void;
  removeUser: () => void;
};

export const useUser = create<TUser>((set) => ({
  user: null,
  loading: true,
  setUser: (data: IUser) => {
    set({ user: data });
  },
  removeUser: () => {
    set({ user: null });
    removeToken();
  },
}));
