import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

const useFollowStore = (storeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.put(`/store/${storeId}/follow`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedStoreStatus", storeId],
      });
      //    queryClient.invalidateQueries({
      //      queryKey: ["favoriteProducts"],
      //    });
    },
  });
};

export default useFollowStore;
