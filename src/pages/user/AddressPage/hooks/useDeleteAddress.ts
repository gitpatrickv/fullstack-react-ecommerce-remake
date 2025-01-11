import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

const useDeleteAddress = (id: number) => {
  return useMutation({
    mutationFn: () => apiClient.delete(`/address/${id}/delete`),
  });
};

export default useDeleteAddress;
