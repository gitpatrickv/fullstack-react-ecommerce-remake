import { Inventory } from "./Inventory";
import PageResponse from "./PageResponse";
import { ProductImage } from "./ProductImage";
import { Store } from "./Store";

export interface Product {
  productId: number;
  productName: string;
  slug: string;
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
