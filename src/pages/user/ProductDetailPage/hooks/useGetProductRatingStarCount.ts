import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export interface RatingStarCountProps {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

const useGetProductRatingStarCount = (productId: string) => {
  return useQuery({
    queryKey: ["ratingCount", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<RatingStarCountProps>(
        `/product/${productId}/rating-count`
      );
      return data;
    },
    enabled: !!productId,
  });
};

export default useGetProductRatingStarCount;
