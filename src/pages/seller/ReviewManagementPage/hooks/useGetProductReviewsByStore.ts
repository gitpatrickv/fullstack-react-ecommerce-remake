import { useInfiniteQuery } from "@tanstack/react-query";
import { GetReviewsResponse } from "../../../../entities/ProductReview";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  sortBy?: string;
  sortDirection?: string;
  pageSize: number;
}

const useGetProductReviewsByStore = ({
  sortBy,
  sortDirection,
  pageSize,
}: Props) => {
  return useInfiniteQuery<GetReviewsResponse, Error>({
    queryKey: ["reviews", sortBy, sortDirection, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetReviewsResponse>(
        `/product/reviews`,
        {
          params: {
            sortBy: sortBy,
            sortDirection: sortDirection,
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

export default useGetProductReviewsByStore;
