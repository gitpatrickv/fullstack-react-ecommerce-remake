import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  id: string;
}

const useGetOne = <T>({ module, id }: Props) => {
  return useQuery<T>({
    queryKey: ["data", module, id],
    queryFn: async () => {
      const { data } = await apiClient.get<T>(`/factory/${module}/${id}`);
      return data;
    },
    placeholderData: keepPreviousData,
    enabled: !!module && !!id,
  });
};

export default useGetOne;
