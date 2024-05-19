import { IRestaurantList } from "@/interface";
import { create } from "zustand";

type TUseRestaurant = {
  loading: boolean;
  restaurants: IRestaurantList | null;
  setRestaurants: (data: IRestaurantList) => void;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useRestaurant = create<TUseRestaurant>((set) => ({
  loading: true,
  restaurants: null,
  setRestaurants: (data: IRestaurantList) => set({ restaurants: data }),
  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
}));
