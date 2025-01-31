import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { IdSetProps } from "./useDeleteAllSelectedItem";

const apiClient = axiosInstance;

const useAddProductsToFavorite = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: async (props: IdSetProps) => {
      await apiClient.post(`/product/favorite-add`, props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
      toast({
        description: "Added to favorites.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

export default useAddProductsToFavorite;
