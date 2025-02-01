import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../services/api-client";

const apiClient = axiosInstance;

export interface CartTotalProps {
  totalAmount: number;
  totalItems: number;
}

export interface Props {
  ids: number[];
  cartId: number;
}

const useGetCartTotal = ({ ids, cartId }: Props) => {
  return useQuery({
    queryKey: ["cartTotal", ids, cartId],
    queryFn: async () => {
      const { data } = await apiClient.get<CartTotalProps>(
        `/cart/${ids}/${cartId}/total`
      );
      return data;
    },
    enabled: ids.length > 0 && !!cartId,
  });
};

export default useGetCartTotal;
