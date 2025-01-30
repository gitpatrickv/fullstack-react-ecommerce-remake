import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;

export interface RateProps {
  rating: number;
  customerReview?: string;
}

const useRateProduct = (productId: number, orderId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RateProps) => {
      await apiClient.post(`/product/${productId}/${orderId}/rate`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["data", "product", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["allOrders"],
      });
      toast({
        title: "Product Rated Successfully",
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

export default useRateProduct;
