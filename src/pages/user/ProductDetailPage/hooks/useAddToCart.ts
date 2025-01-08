import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useToast } from "@chakra-ui/react";

const apiClient = axiosInstance;

interface Props {
  productId: string;
  quantity: number;
}

const useAddToCart = () => {
  const toast = useToast();
  const mutation = useMutation<string, Error, Props>({
    mutationFn: (props: Props) =>
      apiClient.post(`/cart`, props).then((res) => res.data),
    onSuccess: (response: string) => {
      toast({
        title: "Item added to cart.",
        description: response,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to add item to cart.",
        description: error.response?.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return mutation;
};

export default useAddToCart;
