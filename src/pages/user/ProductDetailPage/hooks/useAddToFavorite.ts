import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;
const useAddToFavorite = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.put(`/product/${productId}/favorite-add`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteStatus", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["favoriteProducts"],
      });
    },
  });
};

export default useAddToFavorite;
