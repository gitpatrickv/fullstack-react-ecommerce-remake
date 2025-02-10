import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductCardInfoResponse } from "../../../../entities/Product";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;
interface SearchProps {
  pageSize: number;
  search: string;
  sortBy?: string;
  sortDirection?: string;
  ratingFilter?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

const useSearchProduct = ({
  pageSize,
  search,
  sortBy,
  sortDirection,
  ratingFilter,
  minPrice,
  maxPrice,
}: SearchProps) => {
  return useInfiniteQuery<ProductCardInfoResponse, Error>({
    queryKey: [
      "searchedProduct",
      pageSize,
      search,
      sortBy,
      sortDirection,
      ratingFilter,
      minPrice,
      maxPrice,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductCardInfoResponse>(
        `/product/search`,
        {
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
            keyword: search,
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
    enabled: !!search,
  });
};

export default useSearchProduct;
