import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { AddToCartProps } from "./useAddToCart";

const apiClient = axiosInstance;

interface Props {
  color: string;
  size: string;
}

const useAddToCartWithVariation = ({ color, size }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<string, Error, AddToCartProps>({
    mutationFn: (props: AddToCartProps) =>
      apiClient
        .post(`/cart/${color}/${size}/add`, props)
        .then((res) => res.data),
    onSuccess: (response: string) => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
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

export default useAddToCartWithVariation;
