import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import GetAllProductResponse from "../entities/Product";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface PaginateProps {
  pageSize: number;
}

const useGetAllProducts = ({ pageSize }: PaginateProps) => {
  return useInfiniteQuery<GetAllProductResponse, Error>({
    queryKey: ["allProducts"],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetAllProductResponse>(`/product`, {
        params: {
          pageNo: pageParam,
          pageSize: pageSize,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { pageResponse } = lastPage;
      const { pageNo, totalPages } = pageResponse;
      return pageNo + 1 < totalPages ? pageNo + 1 : undefined;
    },
    placeholderData: keepPreviousData,
    initialPageParam: 0,
  });
};

export default useGetAllProducts;
