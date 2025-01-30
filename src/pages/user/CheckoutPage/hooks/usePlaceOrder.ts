import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  ids: number[];
  paymentMethod: string;
}

const usePlaceOrder = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: async ({ ids, paymentMethod }: Props) => {
      const { data } = await apiClient.post(`/order`, { ids, paymentMethod });
      return data;
    },
    onSuccess: (response: any) => {
      window.location.href = response?.payment_url;
      toast({
        title: "Order Complete",
        description: "Your order has been placed successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Process Order",
        description: error.response?.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });
};

export default usePlaceOrder;
