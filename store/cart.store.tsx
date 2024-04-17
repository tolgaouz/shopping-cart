import { Draft } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Product } from "../components/product";

export const getItemsTotal = (items: ICartItem[] = []) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export interface ICartItem extends Product {
  quantity: number;
  price: number;
  id: string;
}

type CartState = {
  items: ICartItem[];
  addItem: (item: Omit<ICartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  changeQuantity: (id: string, quantity: number) => void;
};

const initialState: CartState = {
  items: [],
  addItem: () => null,
  removeItem: () => null,
  clearCart: () => null,
  changeQuantity: () => null,
};

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      ...initialState,
      addItem: ({ id, quantity = 1, ...rest }) =>
        set((state: Draft<CartState>) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.id === id
          );

          if (existingItem) {
            existingItem.quantity = (existingItem.quantity ?? 1) + quantity;
          } else {
            state.items.push({ ...rest, id, quantity });
          }
        }),

      removeItem: (id: string) =>
        set((state: Draft<CartState>) => {
          const index = state.items.findIndex((cartItem) => cartItem.id === id);

          if (index >= 0) {
            state.items.splice(index, 1);
          }
        }),

      changeQuantity: (id: string, quantity: number) =>
        set((state: Draft<CartState>) => {
          const item = state.items.find((cartItem) => cartItem.id === id);
          if (!item) return;
          item.quantity = quantity;
        }),

      clearCart: () =>
        set((state: Draft<CartState>) => {
          state.items = [];
        }),
    })),
    {
      name: "cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
