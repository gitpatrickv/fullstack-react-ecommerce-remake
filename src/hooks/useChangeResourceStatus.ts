import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  id: string | number;
  status: string;
}

const useChangeResourceStatus = () => {
  return useMutation({
    mutationFn: async ({ module, id, status }: Props) => {
      await apiClient.put(`/factory/${module}/${id}/${status}`);
      return { module, id, status };
    },
  });
};

export default useChangeResourceStatus;
