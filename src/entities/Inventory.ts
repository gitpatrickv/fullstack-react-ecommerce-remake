export interface Inventory {
  inventoryId: number;
  quantity: number;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  color?: string;
  size?: string;
}
