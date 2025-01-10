import { Inventory } from "./Inventory";

export interface CartItem {
  cartItemId: number;
  quantity: number;
  inventory: Inventory;
  productName: string;
  productImage: string;
}

export interface CartItemModels {
  storeName: string;
  cartItems: CartItem[];
}

export type CartItemsResponse = CartItemModels[];
