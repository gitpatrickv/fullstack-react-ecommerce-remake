import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useAuthQueryStore } from "../../../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
  following: boolean;
}

const useGetFollowingStoreStatus = (storeId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["followedStoreStatus", storeId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/store/${storeId}/follow-status`
      );
      return data;
    },
    enabled: !!storeId && !!jwtToken,
  });
};

export default useGetFollowingStoreStatus;
