import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Store } from "../entities/Store";
import { axiosInstance } from "../services/api-client";

const apiClient = axiosInstance;

interface Props {
  module: string;
  id: string;
}

type model = Store;

const useGetOne = ({ module, id }: Props) => {
  return useQuery<model>({
    queryKey: ["data", module, id],
    queryFn: async () => {
      const { data } = await apiClient.get<model>(`/${module}/${id}`);
      return data;
    },
    placeholderData: keepPreviousData,
    enabled: !!module && !!id,
  });
};

export default useGetOne;
