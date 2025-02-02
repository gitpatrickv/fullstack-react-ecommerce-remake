import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export interface CountProps {
  followerCount: number;
  productCount: number;
}

const useGetStoreMetrics = (storeId: number) => {
  return useQuery({
    queryKey: ["metrics", storeId],
    queryFn: async () => {
      const { data } = await apiClient.get<CountProps>(
        `/store/${storeId}/store-metrics`
      );
      return data;
    },
    enabled: !!storeId,
  });
};

export default useGetStoreMetrics;
