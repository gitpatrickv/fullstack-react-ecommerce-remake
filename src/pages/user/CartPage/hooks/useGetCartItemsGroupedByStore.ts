import { useQuery } from "@tanstack/react-query";
import { CartItemsResponse } from "../../../../entities/CartItem";
import { axiosInstance } from "../../../../services/api-client";
import { useAuthQueryStore } from "../../../../store/auth-store";

const apiClient = axiosInstance;

const useGetCartItemsGroupedByStore = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => {
      const { data } = await apiClient.get<CartItemsResponse>(
        `/cart/cart-items`
      );
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useGetCartItemsGroupedByStore;
