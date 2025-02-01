import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

const useBuyAgain = (orderId: number, cartId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => apiClient.post(`/order/${orderId}/${cartId}/add`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItem"],
      });
      setTimeout(() => {
        navigate("/cart");
      }, 200);
    },
  });
};

export default useBuyAgain;
