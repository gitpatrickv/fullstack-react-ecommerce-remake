import { Inventory } from "./Inventory";

export interface CartItem {
  cartItemId: number;
  quantity: number;
  inventory: Inventory;
  productId: number;
  productName: string;
  slug: string;
  productImage: string;
}

export interface CartItemModels {
  storeId: number;
  storeName: string;
  cartItems: CartItem[];
}

export type CartItemsResponse = CartItemModels[];
