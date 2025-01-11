import { useQuery } from "@tanstack/react-query";
import { CartItemsResponse } from "../../../../entities/CartItem";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

const useGetCartItemsGroupedByStore = () => {
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: async () => {
      const { data } = await apiClient.get<CartItemsResponse>(`/cart`);
      return data;
    },
  });
};

export default useGetCartItemsGroupedByStore;
