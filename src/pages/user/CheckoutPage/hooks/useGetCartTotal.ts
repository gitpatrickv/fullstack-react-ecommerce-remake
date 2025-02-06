import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export interface CartTotalProps {
  totalAmount: number;
  totalItems: number;
}

export interface Props {
  ids: number[];
}

const useGetCartTotal = ({ ids }: Props) => {
  return useQuery({
    queryKey: ["cartTotal", ids],
    queryFn: async () => {
      const { data } = await apiClient.get<CartTotalProps>(
        `/cart/${ids}/total`
      );
      return data;
    },
    enabled: ids.length > 0,
  });
};

export default useGetCartTotal;
