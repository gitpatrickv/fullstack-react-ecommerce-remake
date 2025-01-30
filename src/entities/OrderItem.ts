export interface OrderItem {
  orderItemId: number;
  quantity: number;
  productName: string;
  productId: number;
  productImage: string;
  productPrice: number;
  color?: string;
  size?: string;
  reviewStatus: string;
}
