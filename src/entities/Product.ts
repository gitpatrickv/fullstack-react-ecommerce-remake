import { Inventory } from "./Inventory";
import PageResponse from "./PageResponse";
import { ProductImage } from "./ProductImage";
import { Store } from "./Store";

export interface Product {
  productId: number;
  productName: string;
  description: string;
  totalSold: number;
  averageRating: number;
  reviewsCount: number;
  status: string;
  category: string;
  createdDate: string;
}

export interface ProductModels extends Product {
  inventories: Inventory[];
  productImages: ProductImage[];
  store: Store;
}

export default interface GetAllProductResponse {
  models: ProductModels[];
  pageResponse: PageResponse;
}

export interface ProductInfoResponse extends Product {
  price: number;
  productImage: string;
}

export interface ProductCardInfoResponse {
  models: ProductInfoResponse[];
  pageResponse: PageResponse;
}
