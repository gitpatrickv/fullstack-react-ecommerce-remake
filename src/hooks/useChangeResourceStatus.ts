import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  id: string | number;
  status: string;
}

const useChangeResourceStatus = ({ module, id, status }: Props) => {
  return useMutation({
    mutationFn: () =>
      apiClient
        .put(`/factory/${module}/${id}/${status}`)
        .then((res) => res.data),
  });
};

export default useChangeResourceStatus;
