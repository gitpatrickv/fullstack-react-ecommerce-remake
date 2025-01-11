import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

interface Props {
  cartItemId: number;
  newQuantity: number;
}

const useUpdateQuantity = () => {
  return useMutation({
    mutationFn: ({ cartItemId, newQuantity }: Props) =>
      apiClient.put(`/cart/${cartItemId}/${newQuantity}/quantity`),
  });
};

export default useUpdateQuantity;
