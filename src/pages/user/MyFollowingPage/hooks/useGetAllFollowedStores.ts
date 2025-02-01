import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useUserStore } from "../../../../store/user-store";
const apiClient = axiosInstance;

export interface GetFollowedStoreProps {
  storeId: number;
  storeName: string;
  imageUrl: string;
}

const useGetAllFollowedStores = () => {
  const { userId } = useUserStore();
  return useQuery({
    queryKey: ["followedStores"],
    queryFn: async () => {
      const { data } = await apiClient.get<GetFollowedStoreProps[]>(
        `/store/${userId}/followed-stores`
      );
      return data;
    },
    enabled: !!userId,
  });
};

export default useGetAllFollowedStores;
