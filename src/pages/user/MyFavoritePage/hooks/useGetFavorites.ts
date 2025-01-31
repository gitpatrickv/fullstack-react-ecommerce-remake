import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductCardInfoResponse } from "../../../../entities/Product";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface PaginateProps {
  pageSize: number;
  userId: number;
}

const useGetFavorites = ({ pageSize, userId }: PaginateProps) => {
  return useInfiniteQuery<ProductCardInfoResponse, Error>({
    queryKey: ["favoriteProducts", userId, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ProductCardInfoResponse>(
        `/product/${userId}/favorites`,
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
    enabled: !!userId,
  });
};

export default useGetFavorites;
