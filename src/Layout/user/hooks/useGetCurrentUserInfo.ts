import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import { axiosInstance } from "../../../services/api-client";
import { useAuthQueryStore } from "../../../store/auth-store";

const apiClient = axiosInstance;

const useGetCurrentUserInfo = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/user`);
      return data;
    },
    // placeholderData: keepPreviousData,
    enabled: !!jwtToken,
  });
};

export default useGetCurrentUserInfo;
