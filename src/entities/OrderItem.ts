export interface OrderItem {
  orderItemId: number;
  quantity: number;
  productName: string;
  productImage: string;
  productPrice: number;
  color?: string;
  size?: string;
}
