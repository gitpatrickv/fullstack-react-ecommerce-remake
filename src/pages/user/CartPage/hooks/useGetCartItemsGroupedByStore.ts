import { useQuery } from "@tanstack/react-query";
import { CartItemsResponse } from "../../../../entities/CartItem";
import { axiosInstance } from "../../../../services/api-client";
import { useAuthQueryStore } from "../../../../store/auth-store";
import { useUserStore } from "../../../../store/user-store";

const apiClient = axiosInstance;

const useGetCartItemsGroupedByStore = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { cartId } = useUserStore();
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => {
      const { data } = await apiClient.get<CartItemsResponse>(
        `/cart/${cartId}/cart-items`
      );
      return data;
    },
    enabled: !!jwtToken && !!cartId,
  });
};

export default useGetCartItemsGroupedByStore;
