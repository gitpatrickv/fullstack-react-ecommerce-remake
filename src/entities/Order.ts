import { OrderItem } from "./OrderItem";
import PageResponse from "./PageResponse";
import { StoreInfo } from "./Store";

export interface Order extends StoreInfo {
  orderId: number;
  itemQuantity: number;
  recipientName: string;
  contactNumber: string;
  deliveryAddress: string;
  totalAmount: number;
  deliveryCost: number;
  isStoreRated: boolean;
  paymentMethod: string;
  orderStatus: string;
  orderItems: OrderItem[];
}

export default interface OrderItemResponse {
  models: Order[];
  pageResponse: PageResponse;
}
