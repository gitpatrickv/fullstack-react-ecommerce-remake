import { useInfiniteQuery } from "@tanstack/react-query";
import GetAllProductResponse from "../../../../entities/Product";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface PaginateProps {
  pageSize: number;
  category: string;
}

const useGetAllProductsByCategory = ({ pageSize, category }: PaginateProps) => {
  return useInfiniteQuery<GetAllProductResponse, Error>({
    queryKey: ["categoryProducts", category],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetAllProductResponse>(
        `/product/category/${category}`,
        {
          params: {
            pageNo: pageParam,
            pageSize: pageSize,
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

export default useGetAllProductsByCategory;
