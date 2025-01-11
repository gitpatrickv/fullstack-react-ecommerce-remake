import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import { useAuthQueryStore } from "../store/auth-store";

const apiClient = axiosInstance;
const useGetCartSize = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["cartSize"],
    queryFn: async () => {
      const { data } = await apiClient.get<number>(`/cart/size`);
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useGetCartSize;
