export interface Store {
  storeId: number;
  storeName: string;
  contactNumber: string;
  picture?: string;
  averageRating: number;
  reviewsCount: number;
  status: string;
  createdDate: string;
}

export interface StoreInfo {
  storeId: number;
  storeName: string;
}
