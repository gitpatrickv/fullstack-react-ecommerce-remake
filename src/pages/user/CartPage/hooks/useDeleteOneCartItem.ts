import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;

const useDeleteOneCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartItemId: number) =>
      apiClient.delete(`/cart/item/${cartItemId}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cartSize"],
      });
    },
  });
};

export default useDeleteOneCartItem;
