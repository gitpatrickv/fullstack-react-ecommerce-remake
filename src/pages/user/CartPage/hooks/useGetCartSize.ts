import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;
const useGetCartSize = () => {
  return useQuery({
    queryKey: ["cartSize"],
    queryFn: async () => {
      const { data } = await apiClient.get<number>(`/cart/size`);
      return data;
    },
  });
};

export default useGetCartSize;
