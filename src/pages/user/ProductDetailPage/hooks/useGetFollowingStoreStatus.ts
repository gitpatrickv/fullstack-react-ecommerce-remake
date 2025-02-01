import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useUserStore } from "../../../../store/user-store";

const apiClient = axiosInstance;

interface Props {
  following: boolean;
}

const useGetFollowingStoreStatus = (storeId: number) => {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["followedStoreStatus", storeId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/store/${userId}/${storeId}/follow-status`
      );
      return data;
    },
    enabled: !!storeId && !!userId,
  });
};

export default useGetFollowingStoreStatus;
