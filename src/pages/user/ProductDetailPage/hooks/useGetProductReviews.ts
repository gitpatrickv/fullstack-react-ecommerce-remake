import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { GetReviewsResponse } from "../../../../entities/ProductReview";

const apiClient = axiosInstance;

interface Props {
  productId: string;
  rating?: number | null;
  pageSize: number;
}

const useGetProductReviews = ({ productId, rating, pageSize }: Props) => {
  return useInfiniteQuery<GetReviewsResponse, Error>({
    queryKey: ["productReviews", productId, rating],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<GetReviewsResponse>(
        `/product/${productId}/reviews`,
        {
          params: {
            rating: rating,
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

export default useGetProductReviews;
