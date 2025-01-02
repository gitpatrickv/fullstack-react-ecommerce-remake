import { useQuery } from "@tanstack/react-query";
import { Store } from "../../../../entities/Store";
import { axiosInstance } from "../../../../services/api-client";
import { useAuthQueryStore } from "../../../../store/auth-store";

const apiClient = axiosInstance;
const useGetUserStore = () => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  return useQuery<Store>({
    queryKey: ["store"],
    queryFn: async () => {
      const { data } = await apiClient.get<Store>(`/store`);
      return data;
    },
    enabled: role === "SELLER",
  });
};

export default useGetUserStore;
