import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useAuthQueryStore } from "../../../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
  favorite: boolean;
}

const useGetFavoriteStatus = (productId: string) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["favoriteStatus", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/product/${productId}/favorite-status`
      );
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useGetFavoriteStatus;
