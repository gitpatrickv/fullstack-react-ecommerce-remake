import { useInfiniteQuery } from "@tanstack/react-query";
import GetAllProductResponse from "../../../../entities/Product";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;
interface SearchProps {
  pageSize: number;
  search: string;
  sortBy?: string;
  ratingFilter?: number | null;
}

const useSearchProduct = ({
  pageSize,
  search,
  sortBy,
  ratingFilter,
}: SearchProps) => {
  return useInfiniteQuery<GetAllProductResponse, Error>({
    queryKey: ["searchedProduct", search, sortBy, ratingFilter],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetAllProductResponse>(
        `/product/search`,
        {
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
            keyword: search,
            sortBy: sortBy,
            ratingFilter: ratingFilter,
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

export default useSearchProduct;
