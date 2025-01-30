import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductCardInfoResponse } from "../../../../entities/Product";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface PaginateProps {
  pageSize: number;
  storeId: string;
  category?: string;
  sortBy?: string;
  sortDirection?: string;
  ratingFilter?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

const useGetStoreProductsByStoreId = ({
  pageSize,
  storeId,
  category,
  sortBy,
  sortDirection,
  ratingFilter,
  minPrice,
  maxPrice,
}: PaginateProps) => {
  return useInfiniteQuery<ProductCardInfoResponse, Error>({
    queryKey: [
      "storeProducts",
      storeId,
      category,
      sortBy,
      sortDirection,
      ratingFilter,
      minPrice,
      maxPrice,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductCardInfoResponse>(
        `/product/${storeId}`,
        {
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
            category: category,
            sortBy: sortBy,
            sortDirection: sortDirection,
            ratingFilter: ratingFilter,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    initialPageParam: 0,
  });
};

export default useGetStoreProductsByStoreId;
