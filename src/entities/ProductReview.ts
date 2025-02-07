import PageResponse from "./PageResponse";

export interface ProductReview {
  productReviewId: number;
  productId: number;
  rating: number;
  customerReview?: string;
  sellerResponse?: string;
  createdDate: string;
  name: string;
  userImageUrl?: string;
  productName: string;
  productImageUrl: string;
}

export interface GetReviewsResponse {
  models: ProductReview[];
  pageResponse: PageResponse;
}
