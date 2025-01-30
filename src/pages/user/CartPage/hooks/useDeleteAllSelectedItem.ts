import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";
import { useToast } from "@chakra-ui/react";

const apiClient = axiosInstance;

export interface IdSetProps {
  ids: number[];
}

const useDeleteAllSelectedItem = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<string, Error, IdSetProps>({
    mutationFn: (props: IdSetProps) =>
      apiClient.delete(`/cart/delete`, { data: props }).then((res) => res.data),
    onSuccess: (response: string) => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
      toast({
        title: "Cart Items Deleted",
        description: response,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Delete Cart Items",
        description: error.response?.data,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });
  return mutation;
};

export default useDeleteAllSelectedItem;
