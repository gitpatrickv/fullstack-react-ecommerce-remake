import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
const apiClient = axiosInstance;

export interface RateProps {
  rating: number;
  customerReview?: string;
}

const useRateProduct = (productId: number) => {
  const toast = useToast();

  return useMutation({
    mutationFn: async (data: RateProps) => {
      await apiClient.post(`/product/${productId}/rate`, data);
    },
    onSuccess: () => {
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
