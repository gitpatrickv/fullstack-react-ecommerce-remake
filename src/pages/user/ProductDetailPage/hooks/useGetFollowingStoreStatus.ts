import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  following: boolean;
}

const useGetFollowingStoreStatus = (storeId: number) => {
  return useQuery({
    queryKey: ["followedStoreStatus", storeId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/store/${storeId}/follow-status`
      );
      return data;
    },
    enabled: !!storeId,
  });
};

export default useGetFollowingStoreStatus;
