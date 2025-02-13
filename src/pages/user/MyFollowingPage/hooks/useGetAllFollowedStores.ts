import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;

export interface GetFollowedStoreProps {
  storeId: number;
  storeName: string;
  imageUrl: string;
}

const useGetAllFollowedStores = () => {
  return useQuery({
    queryKey: ["followedStores"],
    queryFn: async () => {
      const { data } = await apiClient.get<GetFollowedStoreProps[]>(
        `/store/followed-stores`
      );
      return data;
    },
  });
};

export default useGetAllFollowedStores;
