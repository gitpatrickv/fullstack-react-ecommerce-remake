import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItemsResponse } from "../../../../entities/CartItem";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;
interface Props {
  cartItemId: number;
  newQuantity: number;
}
//Note: im just practicing optimistic update here based on the Tanstack Query docs
const useUpdateQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, newQuantity }: Props) => {
      await apiClient.put(`/cart/${cartItemId}/${newQuantity}/quantity`);
      return { cartItemId, newQuantity };
    },

    onMutate: async ({ cartItemId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cartItem"] });

      const previousData = queryClient.getQueryData<CartItemsResponse>([
        "cartItem",
      ]);

      queryClient.setQueryData<CartItemsResponse>(["cartItem"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((store) => ({
          ...store,
          cartItems: store.cartItems.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }));
      });

      return { previousData };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["cartItem"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
      queryClient.invalidateQueries({
        queryKey: ["checkout"],
      });
    },
  });
};

export default useUpdateQuantity;
