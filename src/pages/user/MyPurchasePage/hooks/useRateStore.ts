import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
export interface StoreRateProps {
  rating: number;
}

const apiClient = axiosInstance;

const useRateStore = (storeId: number, orderId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: StoreRateProps) => {
      await apiClient.post(`/store/${storeId}/${orderId}/rate`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allOrders", "COMPLETED", 4],
      });
      toast({
        title: "Store Rated Successfully",
        description: "Thank You for Your Feedback!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Rating Failed",
        description: error.response?.data.errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });
};

export default useRateStore;
